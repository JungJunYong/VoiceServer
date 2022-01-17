import mariadb from 'mariadb';

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: Number(process.env.DB_PORT)?? 3306,
    password: process.env.DB_PASSWORD,
    connectionLimit: 5
});

export async function mariadbConnect() {
    let conn;
    try {
        conn = await pool.getConnection();
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release(); //release to pool
    }
    return conn;
}