## Voice Chat Api Server

``Decorator를 이용해 각 컨트롤을 정의하고 사용 할수있는 Ts.ED 프레임워크를 이용합니다.``

아래와 같이 spring boot 와 유사한 방식으로 해당 컨트롤을 정의하고 사용할수 있습니다.

```typescript
import {Controller} from "@tsed/di";

@Controller('/TEST') 
class TestController {
    @Get("/path/:id") 
     getID (@PathParams("id") id: string){
        return 'value'+ id;
    } 
}

```

