## 了解Babel基础
![Alt 什么是babel](../static/images/zatan/babel/babel.png)
### 什么是babel
> Babel 是一个 JavaScript 编译器。

为JS编译器，Babel接收输入的JS代码，经过内部处理流程，最终输出修改后的JS代码

在Babel内部，会执行如下步骤：

+ 将Input Code解析为AST（抽象语法树）,这一步称为parsing 对应`@babel/parser`
+ 编辑AST，这一步称为transforming 对应`@babel/traverse`
+ 将编辑后的AST输出为Output Code，这一步称为printing 对应`@babel/generator`


### 底层 @babel/core

@babel/core（由@babel/parser、@babel/traverse、@babel/types、@babel/generator等组成）`他们提供了Babel编译JS的能力`。

#### parse(@babel/parser)

这一步是babel将code转化为ast。ast是Abstract syntax tree的缩写，即抽象语法树，单说抽象语法树可能不太好理解，我们可以先来看一下一个具体的例子，你可以使用[astexplorer](https://astexplorer.net/)来帮你运行@babel/parser

ast js中的常见的节点名称详解https://babeljs.io/docs/en/babel-types

#### generate(@babel/generator)

generate本来应该是第三步，为什么将第三步放到这里呢？因为他比较简单，而且当我们使用traverse时，需要用到它。在这里我们简单的把一段code转换为ast，再转换为code：

```js
yarn add @babel/parser @babel/generator
const parser = require('@babel/parser')
const generate = require('@babel/generator').default

const code = `function mirror(something) {
  return something
}`
const ast = parser.parse(code, {
  sourceType: 'module',
})
const transformedCode = generate(ast).code
console.log(transformedCode)
```
输出
```js
function mirror(something) {
  return something;
}
```
更多用法：https://babeljs.io/docs/en/babel-generator

#### transform(@babel/traverse,@babel/types,@babel/template)

##### @babel/types

Babel Types模块是一个用于 AST 节点的 Lodash 式工具库（译注：Lodash 是一个 JavaScript 函数工具库，提供了基于函数式编程风格的众多工具函数）， 它包含了构造、验证以及变换 AST 节点的方法。 该工具库包含考虑周到的工具方法，对编写处理AST逻辑非常有用。（依然是handbook原话）

##### @babel/template
使用@babel/type创建一些简单节点会很容易，但是如果是大段代码的话就会变得困难了，这个时候我们可以使用@babel/template。

### 中层 @babel/plugin-*
Babel对外暴露的API，使开发者可以介入其编译JS的能力

### 上层 @babel/preset-*
日常开发会使用的插件集合。

基于Babel对JS代码的编译处理能力，Babel最常见的上层能力为：
+ polyfill
+ DSL转换（比如解析JSX）
+ 语法转换（比如将高级语法解析为当前可用的实现）

      @babel/polyfill可以看作是：core-js加regenerator-runtime。
      regenerator-runtime是generator以及async/await的运行时依赖
      单独使用@babel/polyfill会将core-js全量导入，造成项目打包体积过大。
      从`Babel v7.4.0`[5]开始，@babel/polyfill被废弃了，可以直接引用core-js与regenerator-runtime替代
      为了解决全量引入core-js造成打包体积过大的问题，我们需要配合使用@babel/preset-env。



参考：

https://zhuanlan.zhihu.com/p/72995336?utm_source=wechat_session&utm_medium=social&utm_oi=1157422776066502656&from=singlemessage&s_r=0

https://zhuanlan.zhihu.com/p/352878760?utm_source=wechat_session&utm_medium=social&utm_oi=1157422776066502656
