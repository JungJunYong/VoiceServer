import {Controller} from "@tsed/di";
import {Delete, Get, Post} from "@tsed/schema";
import {mariadbSql} from "../database/connect/mariadb";
import {QueryParams} from "@tsed/common";

export interface test {
    data: {test: string,testb: number}
}

@Controller("/chat")
export class ChattingControl {

    /**
     * 아래와 같이 return 받을 타입에대한 선언을 generic(제네릭) 하게 선언하여 사용할수 있도록 하였다.
     */
    @Get("/")
    async get() {
        return await mariadbSql<{ data: string }>('show databases;');
    }

    @Get("/user",["/user/:id"])
    async getUser(@QueryParams("id") id: string) {
        return await mariadbSql<USER>(`SELECT * FROM USER WHERE ID='${id}'`);
    }

    @Get("/login",["/user/:id:pw"])
    async loginUser(@QueryParams("id") id: string,@QueryParams("pw") pw: string) {
        const user = await mariadbSql<USER>(`SELECT * FROM USER WHERE ID='${id}' AND PASSWORD='${pw}'`);
        return user;
    }

    @Post("/post")
    post() {
        return {test: '54321'};
    }

    @Delete('/delete')
    delete() {
        return {delete: 'test!!'};
    }

    @Get()
    findAll() {
        console.log('findAll')
        // This endpoint will never get called
        // because the "/calendars" request is going
        // to be captured by the "/calendars/:id" route handler
    }
}

type USER = {
    NO: number,
    ID: string,
    EMAIL: string,
    PASSWORD: string,
    NICNAME: string
}


