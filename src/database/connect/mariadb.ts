import mariadb from 'mariadb';

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT)?? 3306,
    password: process.env.DB_PASSWORD,
    connectionLimit: 5
});

/**
 * 마리아 디비 의경우 database를 연결하는 방식이 2가지가있다
 * 그중 하나는 connect->sql->응답->종료 이러한 사이클을 항상 시도하는 방식과
 * 하나의 connection 을 유지하며 내부에서 pool 을 관리해 처리하는 방식이 있다.
 * createConnection 과,  createPool 이렇게 구분되어져있는대 상황에따라 선택하여 사용할수있다..
 * 고로 우리는 createPool 을 사용한다.
 */

export async  function mariadbSql<T>(sql: string) {
    let conn;
    let response: T;
    try {
        conn = await pool.getConnection();
        response = await conn.query(sql)
        return response;
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release();
    }

}