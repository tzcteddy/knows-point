## 事件循环(EventLoop)和事件队列(EventQueue)

### javascript单线程还是多线程

> Javascript是单线程的，但是他的运行环境不是单线程

Javascript运行环境比如浏览器的多线程说起,浏览器通常包含以下线程：

**GUI渲染线程**

+ 主要负责页面的渲染，解析HTML、CSS，构建DOM树，布局和绘制等。
+ 当界面需要重绘或者由于某种操作引发回流时，将执行该线程。
+ 该线程与JS引擎线程互斥，当执行JS引擎线程时，GUI渲染会被挂起。

**JS引擎线程**

+ 该线程负责处理Javascript脚本，执行代码。
+ 负责执行待执行的事件，比如定时器计数结束，或者异步请求成功并正确返回时，将依次进入任务队列，等待JS引擎线程执行。
+ 该线程与GUI线程互斥，当JS线程执行Javascript脚本事件过长，将导致页面渲染的阻塞。

**定时器触发线程**

+ 负责执行异步定时器一类函数的线程，如：setTimeout，setInterval。
+ 主线程依次执行代码时，遇到定时器会将定时器交给该线程处理，当计数完毕后，事件触发线程会将计数完毕的事件回调加入到任务队列，等待JS引擎线程执行。

**事件触发线程**

+ 主要负责将等待执行的事件回调交给JS引擎线程执行。

**异步http请求线程**

+ 负责执行异步请求一类函数的线程，如：Promise，axios，ajax等。
+ 主线程依次执行代码时，遇到异步请求，会将函数交给该线程处理，当监听到状态码变更，如果有回调函数，事件触发线程会将回调函数加入到任务队列，等待JS引擎线程执行。

Web Worker是浏览器为Javascript提供的一个可以在浏览器后台开启一个新的线程的API（类似上面说到浏览器的多个线程），使Javascript可以在浏览器环境中多线程运行，但这个多线程是指浏览器本身，是它在负责调度管理Javascript代码，让他们在恰当时机执行。所以Javascript本身是不支持多线程的。

### 异步

javascript的异步过程通常是这样的：

+ 主线程发起一个异步请求，异步任务接受请求并告知主线程已收到（异步函数返回）；
+ 主线程继续执行后续代码，同时异步操作开始执行；
+ 异步操作执行完成后通知主线程；
+ 主线程收到通知后，执行异步回调函数。

这个过程有个问题，异步任务各任务的执行时间过程长短不同，执行完成的时间点也不同，主线程如何调控异步任务呢？这就引入了消息队列。

### 栈、堆、消息队列

`栈`：函数调用形成的一个由若干帧组成的栈。

`堆`：对象被分配在堆中，堆是一个用来表示一大块（通常是非结构化的）内存区域。

`消息队列`：一个Javascript运行时包含了一个待处理消息的消息队列。每一个消息都关联着一个用来处理这个消息的回调函数。在事件循环期间，运行时会从最先进入队列的消息开始处理，被处理的消息会被移出队列，并作为输入参数来调用与之关联的函数。然后事件循环在处理队列中的下一个消息

### 事件循环Event loop

> Event loop是一个执行模型，在不同的地方有不同的实现。浏览器和NodeJS基于不同的技术实现了各自的Event loop。

#### 浏览器中的 Event Loop

1. Micro-Task 与 Macro-Task
事件循环中的异步队列有两种：macro（宏任务）队列和 micro（微任务）队列。`宏任务队列可以有多个，微任务队列只有一个`。

  常见的 macro-task 比如：setTimeout、setInterval、 setImmediate、script（整体代码）、 I/O 操作、UI 渲染等。

  常见的 micro-task 比如: process.nextTick、new Promise().then(回调)、MutationObserver(html5 新特性) 等。

2. Event Loop 过程解析

+ 一开始执行栈空,我们可以把执行栈认为是一个存储函数调用的栈结构，遵循先进后出的原则。micro 队列空，macro 队列里有且只有一个 script 脚本（整体代码）。
+ 全局上下文（script 标签）被推入执行栈，同步代码执行。在执行的过程中，会判断是同步任务还是异步任务，通过对一些接口的调用，可以产生新的 macro-task 与 micro-task，它们会分别被推入各自的任务队列里。同步代码执行完了，script 脚本会被移出 macro 队列，这个过程本质上是队列的 macro-task 的执行和出队的过程。
+ 上一步我们出队的是一个 macro-task，这一步我们处理的是 micro-task。但需要注意的是：当 macro-task 出队时，任务是一个一个执行的；而 micro-task 出队时，任务是一队一队执行的。因此，我们处理 micro 队列这一步，会逐个执行队列中的任务并把它出队，直到队列被清空。
+ 执行渲染操作，更新界面
+ 检查是否存在 Web worker 任务，如果有，则对其进行处理
+ 上述过程循环往复，直到两个队列都清空

#### Node 中的 Event Loop

Node 中的 Event Loop 和浏览器中的是完全不相同的东西。Node.js 采用 V8 作为 js 的解析引擎，而 I/O 处理方面使用了自己设计的 libuv，libuv 是一个基于事件驱动的跨平台抽象层，封装了不同操作系统一些底层特性，对外提供统一的 API，事件循环机制也是它里面的实现

Node.js 的运行机制如下:

+ V8 引擎解析 JavaScript 脚本。
+ 解析后的代码，调用 Node API。
+ libuv 库负责 Node API 的执行。它将不同的任务分配给不同的线程，形成一个 Event Loop（事件循环），以异步的方式将任务的执行结果返回给 V8 引擎。
+ V8 引擎再将结果返回给用户。

其中 libuv 引擎中的事件循环分为 6 个阶段，它们会按照顺序反复运行。每当进入某一个阶段的时候，都会从对应的回调队列中取出函数去执行。当队列为空或者执行的回调函数数量到达系统设定的阈值，就会进入下一阶段。

外部输入数据–>轮询阶段(poll)–>检查阶段(check)–>关闭事件回调阶段(close callback)–>定时器检测阶段(timer)–>I/O 事件回调阶段(I/O callbacks)–>闲置阶段(idle, prepare)–>轮询阶段（按照该顺序反复运行）…

+ timers 阶段：这个阶段执行 timer（setTimeout、setInterval）的回调

      timers 阶段会执行 setTimeout 和 setInterval 回调，并且是由 poll 阶段控制的。
      同样，**在 Node 中定时器指定的时间也不是准确时间，只能是尽快执行**。
+ I/O callbacks 阶段：处理一些上一轮循环中的少数未执行的 I/O 回调
+ idle, prepare 阶段：仅 node 内部使用
+ poll 阶段：获取新的 I/O 事件, 适当的条件下 node 将阻塞在这里

      poll 是一个至关重要的阶段，这一阶段中，系统会做两件事情

      回到 timer 阶段执行回调
      执行 I/O 回调
      并且在进入该阶段时如果没有设定了 timer 的话，会发生以下两件事情

      如果 poll 队列不为空，会遍历回调队列并同步执行，直到队列为空或者达到系统限制
      如果 poll 队列为空时，会有两件事发生
      如果有 setImmediate 回调需要执行，poll 阶段会停止并且进入到 check 阶段执行回调
      如果没有 setImmediate 回调需要执行，会等待回调被加入到队列中并立即执行回调，这里同样会有个超时时间设置防止一直等待下去


      当然设定了 timer 的话且 poll 队列为空，则会判断是否有 timer 超时，如果有的话会回到 timer 阶段执行回调。
+ check 阶段：执行 setImmediate() 的回调

      setImmediate()的回调会被加入 check 队列中，从 event loop 的阶段图可以知道，check 阶段的执行顺序在 poll 阶段之后。

      1. 一开始执行栈的同步任务（这属于宏任务）执行完毕后（依次打印出 start end，并将 2 个 timer 依次放入 timer 队列）,
         会先去执行微任务（这点跟浏览器端的一样），所以打印出 promise3
      2. 然后进入 timers 阶段，执行 timer1 的回调函数，打印 timer1，并将 promise.then 回调放入 microtask 队列，同样的步骤执行 timer2，打印 timer2；
         这点跟浏览器端相差比较大，timers 阶段有几个 setTimeout/setInterval 都会依次执行，并不像浏览器端，每执行一个宏任务后就去执行一个微任务
+ close callbacks 阶段：执行 socket 的 close 事件回调

注意：**上面六个阶段都不包括 process.nextTick()**

**setTimeout 和 setImmediate**

+ setImmediate 设计在 poll 阶段完成时执行，即 check 阶段；
+ setTimeout 设计在 poll 阶段为空闲时，且设定时间到达后执行，但它在 timer 阶段执行

```js
setTimeout(function timeout () {
  console.log('timeout');
},0);
setImmediate(function immediate () {
  console.log('immediate');
});
```

+ 对于以上代码来说，setTimeout 可能执行在前，也可能执行在后。
+ 首先 setTimeout(fn, 0) === setTimeout(fn, 1)，这是由源码决定的
进入事件循环也是需要成本的，如果在准备时候花费了大于 1ms 的时间，那么在 timer 阶段就会直接执行 setTimeout 回调
+ 如果准备时间花费小于 1ms，那么就是 setImmediate 回调先执行了
+ 但当二者在异步 i/o callback 内部调用时，总是先执行 setImmediate，再执行 setTimeout

```js
const fs = require('fs')
fs.readFile(__filename, () => {
    setTimeout(() => {
        console.log('timeout');
    }, 0)
    setImmediate(() => {
        console.log('immediate')
    })
})
// immediate
// timeout
```
在上述代码中，setImmediate 永远先执行。因为两个代码写在 IO 回调中，IO 回调是在 poll 阶段执行，当回调执行完毕后队列为空，发现存在 setImmediate 回调，所以就直接跳转到 check 阶段去执行回调了。

**process.nextTick**

这个函数其实是独立于 Event Loop 之外的，它有一个自己的队列，当每个阶段完成后，如果存在 nextTick 队列，就会清空队列中的所有回调函数，并且优先于其他 microtask 执行。

```js
setTimeout(() => {
 console.log('timer1')
 Promise.resolve().then(function() {
   console.log('promise1')
 })
}, 0)
process.nextTick(() => {
 console.log('nextTick')
 process.nextTick(() => {
   console.log('nextTick')
   process.nextTick(() => {
     console.log('nextTick')
     process.nextTick(() => {
       console.log('nextTick')
     })
   })
 })
})
// nextTick=>nextTick=>nextTick=>nextTick=>timer1=>promise1
```

### Node 与浏览器的 Event Loop 差异

浏览器环境下，microtask 的任务队列是每个 macrotask 执行完之后执行。而在 Node.js 中，microtask 会在事件循环的各个阶段之间执行，也就是一个阶段执行完毕，就会去执行 microtask 队列的任务。

https://zhuanlan.zhihu.com/p/54882306?utm_source=wechat_session&utm_medium=social&utm_oi=1157422776066502656

http://www.likecs.com/show-124803.html
