## module

### module.noParse `regex` | `[regex]` | `function`(3.0.0)
防止 webpack 解析那些任何与给定正则表达式相匹配的文件。忽略的文件中不应该含有 import, require, define 的调用，或任何其他导入机制。忽略大型的 library 可以提高构建性能。
```js
noParse: /jquery|lodash/

// 从 webpack 3.0.0 开始
noParse: function(content) {
  return /jquery|lodash/.test(content);
}
```

### module.rules `array`
>创建模块时，匹配请求的规则数组。这些规则能够修改模块的创建方式。这些规则能够对模块(module)应用 loader，或者修改解析器(parser)。

#### Rule
每个规则可以分为三部分 - 条件(condition)，结果(result)和嵌套规则(nested rule)。

##### Rule条件

条件有两种输入值：<br>
  1、resource：请求文件的绝对路径。它已经根据 resolve 规则解析。<br>
  2、issuer: 被请求资源(requested the resource)的模块文件的绝对路径。是导入时的位置

**例如**: 从 app.js 导入 './style.css'，resource 是 /path/to/style.css. issuer 是 /path/to/app.js。

在规则中，属性 test, include, exclude 和 resource 对 resource 匹配，并且属性 issuer 对 issuer 匹配。<br>
resource 是文件的_解析路径，这意味着符号链接的资源是真正的路径，而不是_符号链接位置。在使用工具来符号链接包的时候（如 npm link）比较好记，像 /node_modules/ 等常见条件可能会不小心错过符号链接的文件。注意，可以通过 resolve.symlinks 关闭符号链接解析（以便将资源解析为符号链接路径）。

##### Rule结果
规则结果只有在规则条件匹配时使用


规则有两种输入值：<br>
  1、应用的 loader：应用在 resource 上的 loader 数组。<br>
  2、Parser 选项：用于为模块创建解析器的选项对象。

这些属性会影响 loader：loader, options, use。

也兼容这些属性：query, loaders。

enforce 属性会影响 loader 种类。不论是普通的，前置的，后置的 loader。

parser 属性会影响 parser 选项。

##### [Rule嵌套](https://tzcteddy.github.io/knows-point/#/webpack/预处理器) 
