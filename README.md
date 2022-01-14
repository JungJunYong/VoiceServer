# Voice Chat Api Server

Spring Boot와 유사하게 각 컨트롤을 정의하고 사용할수 있는 방법을 찾아보던중 Ts.ED 프레임워크를 찾게 되었습니다.

해당 프레임워크에는 다양한 기능이 있지만 그중  Decorator를 이용해 각 컨트롤을 정의하고 사용 할수있는 기능이 일반적으로 컨트롤을 정의하고 사용할때에 

Spring Boot 와 가장 흡사 하다고 생각되어 해당 프레임워크를 이용해 개발을 진행하게 되었습니다.


### 아래와 같이 spring boot 와 유사한 방식으로 해당 컨트롤을 정의하고 사용할수 있습니다.

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

