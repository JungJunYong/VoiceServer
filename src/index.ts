import {$log} from "@tsed/common";
import { PlatformExpress } from "@tsed/platform-express";
import {Server} from "./Server";
import {mariadbConnect} from "./database/connect/mariadb"
import mariadb from "mariadb";

type database = {
  mariadb: mariadb.PoolConnection;
}

declare module globalThis {
  let db: database
}

async function bootstrap() {
  try {
    $log.debug("Start server...");
    const platform = await PlatformExpress.bootstrap(Server);
    let mariaDB: mariadb.PoolConnection;
    try {
      mariaDB = await mariadbConnect();
    }catch (e) {
      console.log('mariaDB 연결 실패');
    }finally {
      console.log('mariaDB 연결 성공');
      globalThis.db = {
        mariadb: mariaDB!
      }
    }





    await platform.listen();
    $log.debug("Server initialized");
  } catch (er) {
    $log.error(er);
  }
}

bootstrap();
