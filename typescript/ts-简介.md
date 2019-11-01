# 什么是 TypeScript

首先，我对 TypeScript 的理解如下：

[TypeScript][] 是 JavaScript 的一个超集，主要提供了**类型系统**和**对 ES6 的支持**，它由 Microsoft 开发，代码[开源于 GitHub](https://github.com/Microsoft/TypeScript) 上。

其次引用[官网][TypeScript]的定义：

> TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. Any browser. Any host. Any OS. Open source.

翻译成中文即是：

> TypeScript 是 JavaScript 的类型的超集，它可以编译成纯 JavaScript。编译出来的 JavaScript 可以运行在任何浏览器上。TypeScript 编译工具可以运行在任何服务器和任何系统上。TypeScript 是开源的。

## 为什么选择 TypeScript

[TypeScript 官网][TypeScript]列举了一些优势，不过我更愿意自己总结一下：

### TypeScript 增加了代码的可读性和可维护性

- 类型系统实际上是最好的文档，大部分的函数看看类型的定义就可以知道如何使用了
- 可以在编译阶段就发现大部分错误，这总比在运行时候出错好
- 增强了编辑器和 IDE 的功能，包括代码补全、接口提示、跳转到定义、重构等

### TypeScript 非常包容

- TypeScript 是 JavaScript 的超集，`.js` 文件可以直接重命名为 `.ts` 即可
- 即使不显式的定义类型，也能够自动做出[类型推论](../basics/type-inference.md)
- 可以定义从简单到复杂的几乎一切类型
- 即使 TypeScript 编译报错，也可以生成 JavaScript 文件
- 兼容第三方库，即使第三方库不是用 TypeScript 写的，也可以编写单独的类型文件供 TypeScript 读取

### TypeScript 拥有活跃的社区

- 大部分第三方库都有提供给 TypeScript 的类型定义文件
- Google 开发的 Angular2 就是使用 TypeScript 编写的
- TypeScript 拥抱了 ES6 规范，也支持部分 ESNext 草案的规范

### TypeScript 的缺点

任何事物都是有两面性的，我认为 TypeScript 的弊端在于：

- 有一定的学习成本，需要理解接口（Interfaces）、泛型（Generics）、类（Classes）、枚举类型（Enums）等前端工程师可能不是很熟悉的概念
- 短期可能会增加一些开发成本，毕竟要多写一些类型的定义，不过对于一个需要长期维护的项目，TypeScript 能够减少其维护成本
- 集成到构建流程需要一些工作量
- 可能和一些库结合的不是很完美

大家可以根据自己团队和项目的情况判断是否需要使用 TypeScript。

[TypeScript]: http://www.typescriptlang.org/

# 安装 TypeScript

TypeScript 的命令行工具安装方法如下：

```bash
npm install -g typescript
```

以上命令会在全局环境下安装 `tsc` 命令，安装完成之后，我们就可以在任何地方执行 `tsc` 命令了。

编译一个 TypeScript 文件很简单：

```bash
tsc hello.ts
```

我们约定使用 TypeScript 编写的文件以 `.ts` 为后缀，用 TypeScript 编写 React 时，以 `.tsx` 为后缀。

## 编辑器

TypeScript 最大的优势便是增强了编辑器和 IDE 的功能，包括代码补全、接口提示、跳转到定义、重构等。

主流的编辑器都支持 TypeScript，这里我推荐使用 [Visual Studio Code](https://code.visualstudio.com/)。

它是一款开源，跨终端的轻量级编辑器，内置了 TypeScript 支持。

另外它本身也是[用 TypeScript 编写的](https://github.com/Microsoft/vscode/)。

下载安装：https://code.visualstudio.com/

获取其他编辑器或 IDE 对 TypeScript 的支持：

- [Sublime Text](https://github.com/Microsoft/TypeScript-Sublime-Plugin)
- [Atom](https://atom.io/packages/atom-typescript)
- [WebStorm](https://www.jetbrains.com/webstorm/)
- [Vim](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support#vim)
- [Emacs](https://github.com/ananthakumaran/tide)
- [Eclipse](https://github.com/palantir/eclipse-typescript)
- [Visual Studio 2015](https://www.microsoft.com/en-us/download/details.aspx?id=48593)
- [Visual Studio 2013](https://www.microsoft.com/en-us/download/details.aspx?id=48739)

# Hello TypeScript

我们从一个简单的例子开始。

将以下代码复制到 `hello.ts` 中：

```ts
function sayHello(person: string) {
    return 'Hello, ' + person;
}

let user = 'Tom';
console.log(sayHello(user));
```

然后执行

```bash
tsc hello.ts
```

这时候会生成一个编译好的文件 `hello.js`：

```js
function sayHello(person) {
    return 'Hello, ' + person;
}
var user = 'Tom';
console.log(sayHello(user));
```

TypeScript 中，使用 `:` 指定变量的类型，`:` 的前后有没有空格都可以。

上述例子中，我们用 `:` 指定 `person` 参数类型为 `string`。但是编译为 js 之后，并没有什么检查的代码被插入进来。

**TypeScript 只会进行静态检查，如果发现有错误，编译的时候就会报错。**

> `let` 是 ES6 中的关键字，和 `var` 类似，用于定义一个局部变量，可以参阅 [let 和 const 命令](http://es6.ruanyifeng.com/#docs/let)。

下面尝试把这段代码编译一下：

```ts
function sayHello(person: string) {
    return 'Hello, ' + person;
}

let user = [0, 1, 2];
console.log(sayHello(user));
```

编辑器中会提示错误，编译的时候也会出错：

```bash
index.ts(6,22): error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'string'.
```

但是还是生成了 js 文件：

```js
function sayHello(person) {
    return 'Hello, ' + person;
}
var user = [0, 1, 2];
console.log(sayHello(user));
```

**TypeScript 编译的时候即使报错了，还是会生成编译结果**，我们仍然可以使用这个编译之后的文件。

如果要在报错的时候终止 js 文件的生成，可以在 `tsconfig.json` 中配置 `noEmitOnError` 即可。关于 `tsconfig.json`，请参阅[官方手册](http://www.typescriptlang.org/docs/handbook/tsconfig-json.html)（[中文版](https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/tsconfig.json.html)）。




