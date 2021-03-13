## 前端监控

### js异常监控
前端异常包含很多种情况：1. js编译时异常（开发阶段就能排）2. js运行时异常；3. 加载静态资源异常（路径写错、资源服务器异常、CDN异常、跨域）4. 接口请求异常等

try,catch的方案有如下特点：

无法捕捉到语法错误，只能捕捉运行时错误；
可以拿到出错的信息，堆栈，出错的文件、行号、列号；
需要借助工具把所有的function块以及文件块加入try,catch，可以在这个阶段打入更多的静态信息。

window.onerror的方案有如下特点：

可以捕捉语法错误，也可以捕捉运行时错误；
可以拿到出错的信息，堆栈，出错的文件、行号、列号；
只要在当前页面执行的js脚本出错都会捕捉到，例如：浏览器插件的javascript、或者flash抛出的异常等。
跨域的资源需要特殊头部支持。

?> 对于跨域的JS资源，window.onerror拿不到详细的信息，需要往资源的请求添加额外的头部。静态资源请求需要加多一个Access-Control-Allow-Origin头部，同时script引入外链的标签需要加多一个crossorigin的属性。经过这样折腾后一样能获取到准确的出错信息。

1）重写window.onerror 方法， 大家熟知，监控JS错误必然离不开它，有人对他进行了测试测试介绍感觉也是比较用心了

2）重写console.error方法，为什么要重写这个方法，我不能够给出明确的答案，如果App首次向浏览器注入的Js代码报错了，window.onerror是无法监控到的，所以只能重写console.error的方式来进行捕获，也许会有更好的办法。待window.onerror成功后，此方法便不再需要用了

3）重写window.onunhandledrejection方法。 当你用到Promise的时候，而你又忘记写reject的捕获方法的时候，系统总是会抛出一个叫 Unhandled Promise rejection. 没有堆栈，没有其他信息，特别是在写fetch请求的时候很容易发生。 所以我们需要重写这个方法，以帮助我们监控此类错误

```js
performance && performance.mark && performance.mark("start-js-render");
      var MaxErrorReportLimit = 100;
      // 简单的将错误采集上报到 /api/logs/error
      window.onerror = function(message, source, lineno, colno, error) {
        // 同一个页面最多上报100次错误，防止某个循环错误页面一直打开，不断的报错
        if (MaxErrorReportLimit-- < 0) return;
        try {
          var msg = {
            message: message,
            source: source,
            lineno: lineno,
            colno: colno,
            stack: error && error.stack,
            traceId: window.appData && window.appData.traceId,
            href: window.location.href,
          };
          msg = JSON.stringify(msg);
          // var req = new XMLHttpRequest();
          // req.open('post', '/api/logs/error', true);
          // req.setRequestHeader('Content-Type', 'application/json');
          // req.send(msg);         
        } catch (err) {
          console.log('report error', err);
        }
      };
```

### 前端异常类型(Execption)
当脚本代码运行时发生的错误，会创建Error对象，并将其抛出，除了通用的Error构造函数外，以下是另外几个ECMAScript 2015中定义的错误构造函数
+ EvalError eval错误
+ RangeError 范围错误
+ ReferenceError 引用错误
+ TypeError 类型错误
+ URIError URI错误
+ SyntaxError 语法错误 (这个错误WebIDL中故意省略，保留给ES解析器使用)
+ Error 通用错误 （这个错误WebIDL中故意省略，保留给开发者使用使用）

DOMException 最新的DOM规范定义的错误类型集，兼容旧浏览的DOMError接口, 完善和规范化DOM错误类型。

+ IndexSizeError 索引不在允许的范围内
+ HierarchyRequestError 节点树层次结构是不正确的。
+ WrongDocumentError 对象是错误的
+ InvalidCharacterError 字符串包含无效字符。
+ NoModificationAllowedError 对象不能被修改。
+ NotFoundError 对象不能在这里被找到。
+ NotSupportedError 不支持的操作
+ InvalidStateError 对象是一个无效的状态。
+ SyntaxError 字符串不匹配预期的模式
+ InvalidModificationError 对象不能以这种方式被修改
+ NamespaceError 操作在XML命名空间内是不被允许的
+ InvalidAccessError 对象不支持这种操作或参数。
+ TypeMismatchError 对象的类型不匹配预期的类型。
+ SecurityError 此操作是不安全的。
+ NetworkError 发生网络错误
+ AbortError 操作被中止
+ URLMismatchError 给定的URL不匹配另一个URL。
+ QuotaExceededError 已经超过给定配额。
+ TimeoutError 操作超时。
+ InvalidNodeTypeError 这个操作的 节点或节点祖先 是不正确的
+ DataCloneError 对象不能克隆。

### 前端错误异常捕获分类

1. 运行时异常

语法错误

2. 资源加载异常

img、script、link、audio、video、iframe、其他外链资源的DOM元素

3. 异步请求异常

XMLHttpRequest、fetch

4. Promise异常

### 前端错误异常捕获方式

##### try-catch
只能捕获同步代码的异常
```js
 try {
    // 模拟一段可能有错误的代码
    throw new Error("会有错误的代码块")
  } catch(e){
    // 捕获到try中代码块的错误得到一个错误对象e，进行处理分析
    report(e)
  } finally {
    console.log("finally")
  }
```
##### onerror事件
+ `window.onerror = cb`

当JavaScript运行时错误（包括语法错误）发生时，window会触发一个ErrorEvent接口的事件，并执行window.onerror()
```js
/**
 * @description 运行时错误处理器
 * @param {string} message 错误信息
 * @param {string} source 发生错误的脚本URL
 * @param {number} lineno 发生错误的行号
 * @param {number} colno 发生错误的列号
 * @param {object} error Error对象
 */
function err(message,source,lineno,colno,error) {...}
window.onerror = err
```
+ `element.onerror=cb`

当一项资源（如`<img>`或`<script>`）加载失败，加载资源的元素会触发一个Event接口的error事件，并执行该元素上的onerror()处理函数。

```js
element.onerror = function(event) { ... } //注意和window.onerror的参数不同
```
注意：这些error事件不会向上冒泡到window，不过能被单一的window.addEventListener捕获。
+ `window.addEventListener(‘error‘, cb, true)`: (DOM2)

资源加载失败，不会冒泡，但是会被`addEventListener`捕获，所以我们可以指定在加载失败事件的捕获阶段捕获该错误。

```js
window.addEventListener("error", function(e) {
    var eventType = [].toString.call(e, e);
    if (eventType === "[object Event]") { // 过滤掉运行时错误
      // 上报加载错误
      report(e)
    }
  },
  true
);
```
+ `window.addEventListener("unhandledrejection", cb)`: (DOM4)事件捕获Promise异常

最新的规范中定义了 unhandledrejection事件用于全局捕获promise对象没有rejection处理器时异常情况

```js
window.addEventListener("unhandledrejection", function (event) {
    // ...your code here to handle the unhandled rejection...

    // Prevent the default handling (error in console)
    event.preventDefault();
});
```

##### Promise.then().catch(cb).finally()

Promise中的错误会被Promise.prototype.catch捕获，所以我们通过这种方式捕获错误，这包括一些不支持unhandledrejection事件的环境中promisede polyfill实现。

```js
new Promise(function(resolve, reject) {
  throw ‘Uncaught Exception!‘;
}).catch(function(e) {
  console.log(e); // Uncaught Exception!
});
```
##### 封装XMLHttpRequest&fetch | 覆写请求接口对象

```js
// 覆写XMLHttpRequest API
if(!window.XMLHttpRequest) return;
  var xmlhttp = window.XMLHttpRequest;
  var _oldSend = xmlhttp.prototype.send;
  var _handleEvent = function (event) {
      if (event && event.currentTarget && event.currentTarget.status !== 200) {
        report(event)
      }
  }
  xmlhttp.prototype.send = function () {
      if (this[‘addEventListener‘]) {
          this[‘addEventListener‘](‘error‘, _handleEvent);
          this[‘addEventListener‘](‘load‘, _handleEvent);
          this[‘addEventListener‘](‘abort‘, _handleEvent);
          this[‘addEventListener‘](‘close‘, _handleEvent);
      } else {
          var _oldStateChange = this[‘onreadystatechange‘];
          this[‘onreadystatechange‘] = function (event) {
              if (this.readyState === 4) {
                  _handleEvent(event);
              }
              _oldStateChange && _oldStateChange.apply(this, arguments);
          };
      }
      return _oldSend.apply(this, arguments);
  }

// 覆写fetch API
if (!window.fetch) return;
var _oldFetch = window.fetch;
window.fetch = function() {
  return _oldFetch
    .apply(this, arguments)
    .then(function(res){
      if (!res.ok) {
        // True if status is HTTP 2xx
        report(res)
      }
      return res;
    })
    .catch(function(error){
      report(res)
    });
}
```

### 业界已经有的监控平台
+ Sentry开源
+ 阿里的ARMS
+ fundebug
+ FrontJS

### 几个异常监控的问题

如何保证大家提交的代码是符合预期的？ 如何了解前端项目的运行是否正常，是否存在错误？
代码质量体系控制和错误监控以及性能分析

如果用户使用网页，发现白屏，现在联系上了你们，你们会向他询问什么信息呢？先想一下为什么会白屏？

我们以用户访问页面的过程为顺序，大致排查一下

1. 用户没打开网络
2. DNS域名劫持
3. http劫持
4. cdn或是其他资源文件访问出错
5. 服务器错误
6. 前端代码错误
7. 前端兼容性问题
8. 用户操作出错

通过以上可能发生错误的环节，我们需要向用户手机一下以下的用户信息

1. 当前的网络状态
2. 运营商
3. 地理位置
4. 访问时间
5. 客户端的版本(如果是通过客户端访问)
6. 系统版本
7. 浏览器信息
8. 设备分辨率
9. 页面的来源
10. 用户的账号信息
11. 通过performance API收集用户各个页面访问流程所消耗的时间
12. 收集用户js代码报错的信息

如果我们使用了脚本代码压缩，然而我们又不想将sourcemap文件发布到线上，我们怎么捕获到错误的具体信息？
CSS文件中也存在引用资源，@font-face, background-image ...等这些请求错误该如何进行错误捕获？