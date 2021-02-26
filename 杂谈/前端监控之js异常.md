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