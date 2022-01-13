import {Controller} from "@tsed/di";
import {Delete, Get, Post} from "@tsed/schema";

@Controller("/test")
export class HelloWorldController {
    @Get("/")
    get() {
        return {test: '1234'};
    }

    @Post("/post")
    post() {
        return {test: '54321'};
    }

    @Delete('/delete')
    delete() {
        return {delete: 'test!!'};
    }
}


