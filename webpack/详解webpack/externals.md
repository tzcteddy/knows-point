## externals 

>  `string` | `array` | `object` | `function` | `regex`

**外部扩展**：externals 配置选项提供了「从输出的 bundle 中排除依赖」的方法。相反，所创建的 bundle 依赖于那些存在于用户环境(consumer's environment)中的依赖。此功能通常对 library 开发人员来说是最有用的，然而也会有各种各样的应用程序用到它。

防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖，例如，从 CDN 引入 jQuery，而不是把它打包：

index.html
```js
<script
  src="https://code.jquery.com/jquery-3.1.0.js"
  integrity="sha256-slogkvB1K3VOkzAI8QITxV3VzpOnkeNVsKvtkYLMjfk="
  crossorigin="anonymous">
</script>
```
webpack.config.js
```js
externals: {
  jquery: 'jQuery'
}
```
这样就剥离了那些不需要改动的依赖模块，换句话，下面展示的代码还可以正常运行：
```js
import $ from 'jquery';

$('.my-element').animate(...);
```

具有外部依赖(external dependency)的 bundle 可以在各种模块上下文(module context)中使用，例如 CommonJS, AMD, 全局变量和 ES2015 模块。外部 library 可能是以下任何一种形式：

+ root：可以通过一个全局变量访问 library（例如，通过 script 标签）。
+ commonjs：可以将 library 作为一个 CommonJS 模块访问。
+ commonjs2：和上面的类似，但导出的是 module.exports.default.
+ amd：类似于 commonjs，但使用 AMD 模块系统。

#### string
请查看上面的例子。属性名称是 jquery，表示应该排除 import $ from 'jquery' 中的 jquery 模块。为了替换这个模块，jQuery 的值将被用来检索一个全局的 jQuery 变量。换句话说，当设置为一个字符串时，它将被视为全局的（定义在上面和下面）。

#### array
```js
externals: {
  subtract: ['./math', 'subtract']
}
```
`subtract: ['./math', 'subtract']` 转换为父子结构，其中 ./math 是父模块，而 bundle 只引用 subtract 变量下的子集。

#### object
```js
externals : {
  react: 'react'
}

// 或者

externals : {
  lodash : {
    commonjs: "lodash",
    amd: "lodash",
    root: "_" // 指向全局变量
  }
}

// 或者

externals : {
  subtract : {
    root: ["math", "subtract"]
  }
}
```
此语法用于描述外部 library 所有可用的访问方式。这里 `lodash` 这个外部 library 可以在 `AMD` 和 `CommonJS` 模块系统中通过 `lodash` 访问，但在全局变量形式下用` _ `访问。`subtract` 可以通过全局 `math` 对象下的属性 `subtract` 访问（例如 `window['math']['subtract']`）。

#### function
```js
externals: [
  function(context, request, callback) {
    if (/^yourregex$/.test(request)){
      return callback(null, 'commonjs ' + request);
    }
    callback();
  }
]
```

#### regex
```js
externals: /^(jquery|\$)$/i
```
