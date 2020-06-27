## output
>output 位于对象最顶级键(key)，包括了一组选项，指示 webpack 如何去输出、以及在哪里输出你的「bundle、asset 和其他你所打包或使用 webpack 载入的任何内容」

### 配置属性

#### filename `string | function`
决定了每个输出bundle的名称，单个入口起点,它是一个静态名称：<br>
`filename:'bundle.js'`
当通过多个入口起点(entry point)、代码拆分(code splitting)或各种插件(plugin)创建多个 bundle，应该使用以下一种替换方式，来赋予每个 bundle 一个唯一的名称……
+ 使用入口名：
    `filename:"[name].bundle.js"`

+ 使用内部chunk id
    `filename:"[id].bundle.js"`

+ 使用每次构建过程唯一的hash
    `filename:"[name].[hash].bundle.js"`

+ 使用基于每个chunk内容的hash
    `filename:"[chunkhash].bundle.js"`


#### path `string`
**绝对路径**
`path:path.resolve(__dirname,'dist/assets')`

#### publicPath `string | function`
对于按需加载(on-demand-load)或加载外部资源(external resources)（如图片、文件等）来说，output.publicPath 是很重要的选项。如果指定了一个错误的值，则在加载这些资源时会收到 404 错误。

此选项指定在浏览器中所引用的「此输出目录对应的公开 URL」。<br>
相对 URL(relative URL) 会被相对于 HTML 页面（或 <base> 标签）解析。<br>
相对于服务的 URL(Server-relative URL)，<br>
相对于协议的 URL(protocol-relative URL) <br>
或绝对 URL(absolute URL) 也可是可能用到的，或者有时必须用到，例如：当将资源托管到 CDN 时。<br>

该选项的值是以 runtime(运行时) 或 loader(载入时) 所创建的每个 URL 为前缀。因此，在多数情况下，此选项的值都会以/结束。

+ CDN(总是https协议):`publicPath:"https://xxxx.com/assets/"`
+ CDN（协议相同）:`publicPath:"//xxxx.com/assets/"`
+ 相对于服务:`publicPath:"/assets/"`
+ 相对于HTML页面:`publicPath:"assets/"`
+ 相对于HTML页面:`publicPath:"../assets/"`
+ 相对于HTML页面(目录相同):`publicPath:""`

默认值是一个空字符串 ""。

#### chunkFileName `string | function`
决定非入口文件的名称<br>
注意，这些文件名需要在 runtime 根据 chunk 发送的请求去生成。因此，需要在 webpack runtime 输出 bundle 值时，将 chunk id 的值对应映射到占位符(如 [name] 和 [chunkhash])。这会增加文件大小，并且在任何 chunk 的占位符值修改后，都会使 bundle 失效。

**默认使用 [id].js** 或从 output.filename 中推断出的值（[name] 会被预先替换为 [id] 或 [id].）。
#### chunkLoadTimeout

#### library `string | object(3.1.0,用于libraryTarget:"umd")`
output.library 的值的作用，取决于output.libraryTarget 选项的值；完整的详细信息请查阅该章节。注意，output.libraryTarget 的默认选项是 var，所以如果使用以下配置选项：
```js
output: {
  library: "MyLibrary"
}
```
如果生成的输出文件，是在 HTML 页面中作为一个 script 标签引入，则变量 MyLibrary 将与入口文件的返回值绑定。

**注意**，如果将数组作为 entry，那么只会暴露数组中的最后一个模块。如果将对象作为 entry，还可以使用数组语法暴露:
```js
var path = require("path");
module.exports = {
	// mode: "development || "production",
	entry: {
		alpha: "./alpha",
		beta: "./beta"
	},
	output: {
		path: path.join(__dirname, "dist"),
		filename: "MyLibrary.[name].js",
		library: ["MyLibrary", "[name]"],
		libraryTarget: "umd"
	}
};
```

#### libraryTarget `string`
> 默认值："val"

配置如何暴露 library。可以使用下面的选项中的任意一个。注意，此选项与分配给 output.library 的值一同使用。对于下面的所有示例，都假定将 output.library 的值配置为 MyLibrary。<br>
注意，下面的示例代码中的 _entry_return_ 是入口起点返回的值。在 bundle 本身中，它是从入口起点、由 webpack 生成的函数的输出结果。
##### 暴露为一个变量
这些选项将入口起点的返回值（例如，入口起点的任何导出值），在 bundle 包所引入的位置，赋值给 output.library 提供的变量名
`libraryTarget: "var" `（默认值）当 library 加载完成，入口起点的返回值将分配给一个变量：
```js
var MyLibrary = _entry_return_;

// 在一个单独的 script……
MyLibrary.doSomething();
```
*当使用此选项时，将 output.library 设置为空，会因为没有变量导致无法赋值。*

`libraryTarget: "assign"` - 这将产生一个隐含的全局变量，可能会潜在地重新分配到全局中已存在的值（谨慎使用）。

```js
MyLibrary = _entry_return_;
```
**注意**，如果 MyLibrary 在作用域中未在前面代码进行定义，则你的 library 将被设置在全局作用域内。

*当使用此选项时，将 output.library 设置为空，将产生一个破损的输出 bundle。*

##### 通过在对象上赋值暴露
这些选项将入口起点的返回值（例如，入口起点的任何导出值）赋值给一个特定对象的属性（此名称由 `output.library` 定义）下。<br>

如果 `output.library` 未赋值为一个非空字符串，则默认行为是，将入口起点返回的所有属性都赋值给一个对象（此对象由 `output.libraryTarget` 特定）通过如下代码片段：`(function(e, a) { for(var i in a) e[i] = a[i]; }(${output.libraryTarget}, _entry_return_)`
*注意，不设置 output.library 将导致由入口起点返回的所有属性，都会被赋值给给定的对象；这里并不会检查现有的属性名是否存在。*

`libraryTarget:"this"`-**入口起点的返回值**将分配给this的一个属性(此名由output.library定义)下，this取决于
```js
this["MyLibrary"] = _entry_return_;

// 在一个单独的 script……
this.MyLibrary.doSomething();
MyLibrary.doSomething(); // 如果 this 是 window
```

`libraryTarget:"window"`-**入口起点的返回值**将使用output.library定义的值，分配给window对象的这个属性下

```js
window["MyLibrary"] = _entry_return_;

window.MyLibrary.doSomething();
```

`libraryTarget:"global"`-**入口起点的返回值**将使用output.library定义的值，分配给global对象的这个属性下

```js
global["MyLibrary"] = _entry_return_;

global.MyLibrary.doSomething();
```

`libraryTarget: "commonjs"` - **入口起点的返回值**将使用 output.library 中定义的值，分配给 exports 对象。这个名称也意味着，模块用于 CommonJS 环境：

```js
exports["MyLibrary"] = _entry_return_;

require("MyLibrary").doSomething();
```


##### 模块定义系统

这些选项将导致 bundle 带有更完整的模块头部，以确保与各种模块系统的兼容性。根据 output.libraryTarget 选项不同，output.library 选项将具有不同的含义。

`libraryTarget: "commonjs2"` - **入口起点的返回值**将分配给 module.exports 对象。这个名称也意味着模块用于 CommonJS 环境：

```js
module.exports = _entry_return_;

require("MyLibrary").doSomething();
```
**注意**，output.library 会被省略，因此对于此特定的 output.libraryTarget，**无需再设置 output.library** 。

`ibraryTarget: "amd"` - 将你的 library 暴露为 AMD 模块。
AMD 模块要求入口 chunk（例如使用 `<script>`标签加载的第一个脚本）通过特定的属性定义，例如 define 和 require，它们通常由 RequireJS 或任何兼容的模块加载器提供（例如 almond）。否则，直接加载生成的 AMD bundle 将导致报错，如 define is not defined。

所以，使用以下配置……
```js
output: {
  library: "MyLibrary",
  libraryTarget: "amd"
}
```
生成的 output 将会使用 "MyLibrary" 作为模块名定义，即
```js
define("MyLibrary", [], function() {
  return _entry_return_; // 此模块返回值，是入口 chunk 返回的值
});
```
可以在 script 标签中，将 bundle 作为一个模块整体引入，并且可以像这样调用 bundle：
```js
require(['MyLibrary'], function(MyLibrary) {
  // 使用 library 做一些事……
});
```

`libraryTarget: "umd"` - 将你的 library 暴露为所有的模块定义下都可运行的方式。它将在 CommonJS, AMD 环境下运行，或将模块导出到 global 下的变量。

在这个例子中，你需要 library 属性来命名你的模块：
```js
output: {
  library: "MyLibrary",
  libraryTarget: "umd"
}
```
输出：
```js
(function webpackUniversalModuleDefinition(root, factory) {
  if(typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  else if(typeof define === 'function' && define.amd)
    define([], factory);
  else if(typeof exports === 'object')
    exports["MyLibrary"] = factory();
  else
    root["MyLibrary"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
  return _entry_return_; // 此模块返回值，是入口 chunk 返回的值
});
```