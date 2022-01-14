import {Controller} from "@tsed/di";
import {Delete, Get, Post} from "@tsed/schema";
import {ChattingService} from "../services/ChattingService";

@Controller("/chat")
export class ChattingControl {
    constructor(private chattingService: ChattingService){

    }

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


