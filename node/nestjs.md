## nestjs
?> Nest（NestJS）是用于构建高效，可扩展的Node.js服务器端应用程序的框架。它使用渐进式JavaScript，内置并完全支持TypeScript（但仍使开发人员能够使用纯JavaScript进行编码），并结合了OOP（面向对象编程），FP（功能编程）和FRP（功能性反应式编程）的元素。

Express / Fastify 之上的抽象

[`SOLID原则`](https://en.wikipedia.org/wiki/SOLID)
+ Single-responsibility principle(单一职责原则)
+ Open–closed principle(开放闭合原则)
+ Liskov substitution principle(里氏代换原则)
+ Interface segregation principle(接口分离原则)
+ Dependency inversion principle(依赖倒置原则)

### 创建一个项目

<!-- tabs:start -->

#### ** npm **

```
$ npm i -g @nestjs/cli
$ nest new project-name
```

#### ** yarn **

```
$ yarn global add @nestjs/cli
$ nest new project-name
```

<!-- tabs:end -->

生成的文件中的`src`目录包含几个核心文件

      src
      ├── app.controller.ts
      ├── app.service.ts
      ├── app.module.ts
      └── main.ts

`main.ts`是应用的引导入口，包含一个异步函数

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

### 控制器

?> 控制器负责处理传入的 请求 和向客户端返回 响应 

+ 可选前缀设置为 cats
+ 路由地址将匹配 abcd 、 ab_cd 、 abecd 等。字符 ? 、 + 、 * 以及 () 是它们的正则表达式对应项的子集。连字符 (-) 和点 (.) 按字符串路径解析。
+ 动态路由参数
+ 读取数据王往往是异步的，每个异步函数都必须返回 Promise。这意味着您可以返回延迟值, 而 Nest 将自行解析它
```ts
import { Controller, Get, Post, Param, Body, Header, HttpCode } from '@nestjs/common';
import {CreateCatDto} from './cat.dto.ts'
@Controller('cats')
export class CatsController {
  @Get('ab*cd/:id')
  async findAll(@Param('id') id: string): string {
    return 'This action returns all cats';
  }

  @Post()
  @Header('Cache-Control', 'none')
  @HttpCode(201)
  async create(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }
}
```
更多装饰器
`@Query、@Request、@Response、@Req、@Res、@Headers，@Redirect ...`

### 提供者
?> Provider 只是一个用 @Injectable() 装饰器注释的类

### 模块
?> 模块是具有 @Module() 装饰器的类

`@module()` 装饰器接受一个描述模块属性的对象

|属性|描述|
|:-----:|:-----:|
|providers| 由 Nest 注入器实例化的提供者，并且可以至少在整个模块中共享|
|controllers|必须创建的一组控制器|
|imports|导入模块的列表，这些模块导出了此模块中所需提供者|
|exports|由本模块提供并应在其他模块中可用的提供者的子集。|

cat/cat.module.ts
```ts
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService]
})
export class CatsModule {}
```
app/app.module.ts
```ts
import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
})
export class ApplicationModule {}
```


## [TypeORM](https://typeorm.biunav.com/zh/#%E5%AE%89%E8%A3%85)
> 一个ORM (对象关系映射：Object Relational Mapping)框架

## [Prisma](https://prisma.yoga/)

## [Rxjs](https://cn.rx.js.org/)

## class-validator

