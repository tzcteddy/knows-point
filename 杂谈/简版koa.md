## 简版koa

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

## 中间件改造

现实中会有多个中间件，错误处理、权限校验、路由、日志、限流等等