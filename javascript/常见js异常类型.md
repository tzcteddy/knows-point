## 常见js异常类型

无论是浏览器控制台还是 Node.js 的服务端，我们会在各种地方看到 JavaScript 异常，异常处理是编写程序必备的基础能力，在学习异常处理之前，了解 JavaScript 中的几种异常类型是非常有必要的。

### Error

`Error`是组基本的错误类型，其他的错误类型都是继承自该类型，`Error`主要有两个重要的属性`message`和`name`分别标识错误信息和错误名称

>程序运行过程中抛出的异常一般都有具体类型，`Error`类型一般都是开发人员自己抛出的异常

```js
try{
    throw new Error('抛出个异常')
}catch(err){
    console.log(err)
}
//Error: 抛出个异常
//   at <anonymous>:2:11
//undefined
```

### SyntaxError-语法错误

语法错误也称为解析错误。语法错误在任何编程语言中都是最常见的错误类型，表示不符合编程语言的语法规范。

JavaScript 是一门解释性语言，执行一段代码时需要经历 `词法分析 -> 语法分析 -> 语法树` 就可以开始解释执行了：<br>
词法分析是将字符流(`char stream`)转换为记号流(`token stream`)、语法分析阶段会将记号流(`token stream`)生成抽象语法树（`AST`）

在这两个阶段，如果 Javascript引擎发现了预期之外/无法抓换的 token，或者 token 顺序和预期不一致时，就会抛出 `SyntaxError`。

```js
var a= a !
//VM981:1 Uncaught SyntaxError: Unexpected token '!'
```

### TypeError类型

运行时最常见的异常，表示变量或参数不是预期类型，比如 new 关键字后面必须为构造函数、()前必须为函数。

```js
var getName=null;
getName();
//VM1076:1 Uncaught TypeError: getName is not a function
//    at <anonymous>:1:1
```

### ReferenceError - 引用错误

引用一个不存在的变量时发生的错误，每当我们创建或定义一个变量时，变量名称都会写入一个变量存储中心中。这个变量存储中心就像键值存储一样，每当我们引用变量时，它都去存储中找到 Key 并提取并返回 Value，如果我们要找的变量不在存储中，就会抛出 ReferenceError。

```js
test();
//VM1109:1 Uncaught ReferenceError: test is not defined
//    at <anonymous>:1:1
```

**注意**：如果我们调用的是一个已经存在的变量的一个不存在的属性，则不会抛出 ReferenceError，因为变量本身已经在存储中了，调用它不存在的属性只会是未定义状态，也就是 undefined:

### RangeError - 边界错误

表示超出有效范围时发生的异常，主要的有以下几种情况：

+ 数组长度为负数或超长
+ 数字类型的方法参数超出预定义范围
+ 函数堆栈调用超过最大值

### URIError - URL 错误
在调用 URI 相关的方法中 URL 无效时抛出的异常，主要包括 `encodeURI、decodeURI()`、`encodeURIComponent()`、`decodeURIComponent()`、`escape()`和`unescape()`几个函数：

### 自定义异常

除了 JavaScript 已经给定的异常类型，我们还可以自定义一些异常类型，比如我们要根据不同的异常类型给用户不同的错误提示：
```js
class UnAuthError extends Error { }

class ParamError extends Error { }

function controller() {
  throw new UnAuthError();
}

try {
  controller();
} catch (error) {
  if (error instanceof UnAuthError) {
    return '无权限';
  } 
  if (error instanceof ParamError) {
  return '参数错误';
  } 
}
```