## 简单实现koa洋葱模型

三大部分

+ Application  基本服务框架
+ Context   服务器框架 基本数据结构的封装 对http请求解析响应
+ Middleware 中间件


### 构建Application

```js
const http=require('http');

class Application{
    constructor(){
        this.middleware=null;
    }
    listen(...args){
        const server=http.createServer(this.middleware);
        server.listen(...args)
    }
    use(middleware){
        this.middleware=middleware;
    }
}
```
**调用Application**
```js
const app=new Application();
app.use((req,res)=>{
    res.end('对点');
})
app.listen(3000);
```

### 构建Context

核心
```js
const http=require('http');

class Application{
    constructor(){
        this.middleware=null;
    }
    listen(...args){
        const server=http.createServer((req,res)=>{
            const ctx=new Context(req,res);
            this.middleware(ctx);
            ctx.res.end(ctx.body);
        });
        server.listen(...args)
    }
    use(){}
}

class Context{
    constructor(req,res){
        this.req=req;
        this.res=res;
    }
}
```
app.use正常工作

```js
const app=new Application();
app.use((ctx)=>{
    ctx.body='对点'
})
app.listen(3000);
```

### 中间件改造

现实中会有多个中间件，错误处理、权限校验、路由、日志、限流等等

app.middlewares收集中间件回调函数数组，并用compose(洋葱)串联起来

对所有中间件函数通过compose函数来达到抽象效果，它将Context对象作为参数，来接收请求及处理响应

```js
const fn=compose(this.middlewares);
await fn(ctx);

//或
await compose(this.middlewares,ctx);
```

完整版
```js
const http = require('http');

class Application{
    constructor(){
        this.middlewares=[];
    }
    listen(...args){
        const server=http.createServer(async (req,res)=>{
            const ctx=new Context(req,res);

            const fn=compose(this.middlewares);
            await fn(ctx)

            ctx.res.end(ctx.body);
        })
        server.listen(...args);
    }
    use(middleware){
        this.middlewares.push(middlware);
    }
}
```

### 洋葱模型（compose）
koa的洋葱模型指出每一个中间件都像是洋葱的每一层，每层都会一进一出穿过两次，且最先穿入的一层最后穿出。

+ middleware:第一个中间件将会执行
+ next:每个中间件将会通过next来执行下一个中间件

#### 中间件的使用
```js
middleware(ctx,next)
```

每个中间件中的next是指执行下一个中间件，但是next函数中还有next；
```js
const next=()=>nextMiddleware(ctx,next);
middleware(ctx,next(0));
```

使用递归使中间件连接起来

```js
const dispatch=(i)=>{
    return middlewares[i](ctx,()=>dispatch(i+1));
}
dispatch(0);
```
给递归加上终止条件
```js
const dispatch=(i)=>{
    const middleware=middlewares[i];
    if(i===middlewares.length)return;
    return middleware(ctx,()=>dispatch(i+1));
}
dispatch(0);

```
**compose函数**
```js
function compose(middlewares){
    return ctx=>{
        const dispatch=(i)=>{
            const middleware=middlewares[i];
            if(i===middlewares.length)return;
            return middleware(ctx,()=>dispatch(i+1));
        }
        return dispatch(0);
    }
}
```


### 异常处理

后端服务因为某一处错误导致整个服务挂掉，我们只需对中间件执行函数进行一次异常处理

```js
try{
    const fn=compose(this.middlwares);
    await fn(ctx)
}catch(e){
    console.error(e);
    ctx.res.statusCode=500;
    ctx.res.write('Internel Server Error');
}
```


