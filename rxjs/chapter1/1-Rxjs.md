![avatar](https://rxjs.dev/generated/images/marketing/home/Rx_Logo-512-512.png)



### RX的发展

源自微软，火于NetFlix(奈飞)公司。2011年微软开发出RX框架(开发的LinQ扩展出来的开源方案)，由于当时的netFlix公司发展太快，旧有的一些架构问题加上新增长的一些问题，导致架构特别复杂，一直在寻找一套能够梳理清楚这种复杂架构的框架或模式。NetFlix公司借鉴了RX的设计理念，基于JAVA语言开发出了RxJava。从此RX这种理念迎来了爆发。发展至今，RX已经形成了一个开源集合，支持多种语言。

> LinQ 读作Link，全名是 Language-Integrated Quey，其功能很多元、强大，学习Rxjs可以不用会，当然如果你感兴趣，可以去探索！
>
> 支持的语言：http://reactivex.io/languages.html
>
> RX 是 Reactive Extension缩写

### RX的优势？

- 三大统一，异步与同步，获取与订阅，现在与未来
- 可组合的数据变更过程

在实际应用中，很多问题可以抽象成数据流，网页的DOM事件、Ajax获取数据资源等操作都可以看成(抽象)是一个数据流。

RxJS擅长处理异步操作，因为它对数据是采用`推`的处理方式。当一个数据产生的时候，会被推送给对应的处理函数，这个处理函数不用关心数据是同步产生的还是异步产生的，异步与同步做到了有机统一，实现了同一套API处理异步、同步数据流。

Rxjs中的数据流可能包含复杂的功能，但是可以分解成一个个单体来实现，实现某个小功能就是操作符，学习RxJS就是学习如何组合操作符来解决复杂问题。

### 认识 Rxjs

Rxjs是一套由Observable sequences (可观察的对象序列)来组合异步行为和事件流的library

> 简单的说，可以把Rxjs看成是异步的lodash或Underscore

同时这也被为`Functional Reactive Programming`,更确切的说是指`Function Programming`和`Reactive Programming`两个编思想的结合

> Rxjs 确实是Functional Programming 跟Reactive Programming的结合，但能不能称为Functional Reactive Programming(FRP)一直存在争议

> Rx在[官网](http://reactivex.io/intro.html)上特别指出，有时被称为FRP其实是个误称

> 简单的说FRP是操作随着时间<strong>连续性改变的数值</strong>而Rx则比较像操作随者时间发出的<strong>离散数值</strong>(这个部分不用分得太细，因为社区对FRP的定义及解释一直存在争议....)

### RxJS 核心概念与内容概览

- **Observable (可观察对象):** 表示一个概念，这个概念是一个可调用的未来值或事件的集合。
- **Observer (观察者):** 一个回调函数的集合，它知道如何去监听由 Observable 提供的值。
- **Subscription (订阅):** 表示 Observable 的执行，主要用于取消 Observable 的执行。
- **Operators (操作符):** 采用函数式编程风格的纯函数 (pure function)，使用像 `map`、`filter`、`concat`、`flatMap` 等这样的操作符来处理集合。
- **Subject (主体):** 相当于 EventEmitter，并且是将值或事件多路推送给多个 Observer 的唯一方式。
- **Schedulers (调度器):** 用来控制并发并且是中央集权的调度员，允许我们在发生计算时进行协调，例如 `setTimeout` 或 `requestAnimationFrame` 或其他。

### Async FAQ 异步常见问题

+ Race Condition 竟态条件
+ Memory Leak 内存泄露
+ Complex State 复杂的状态
+ Exception Handling 异常处理



![](https://bbsmax.ikafan.com/static/L3Byb3h5L2h0dHBzL2ltYWdlczIwMTUuY25ibG9ncy5jb20vYmxvZy8xMDAzOTU2LzIwMTcwNy8xMDAzOTU2LTIwMTcwNzI0MDg0NzM5MDI0LTE2OTY5NDM1NDQucG5n.jpg)

> Race Condition

每当我们对同一个资源同时做多次的非同步存取时，就可能发生 Race Condition 的问题。比如说我们有一个文章列表，让我们从第一个选中的文章标题开始。然后选中第二个文章标题。该应用发送一个请求去加载文章，由于网络原因，文章内容加载需要一小会儿。数秒之后，用户厌烦又选择了第一篇文章。由于这篇文章已经加载过，它的内容几乎立即显示，应该仿佛回到最开始的状态。但接着发生了奇怪的事情，终于收到了第二篇文章的内容，这个问题很严重，更糟糕的是在开发环境中未必能发现。

```
const userData = [
  { id: 1, name: "Martin", type: "Manager" },
  { id: 2, name: "Alex", type: "developer" },
  { id: 3, name: "Bob", type: "client" },
];


const getMockUserData = (id) => {
  return new Promise((resolve, reject) => {
    let user = userData.find((u) => u.id === id)
    if (user) {
        // 模拟接口请求
        setTimeout(() => resolve(user), Math.random() * 3000);
    } else {
        setTimeout(() => reject('user not found'), Math.random() * 3000);
    }
  });
};
const User = () => {
  const [user, setUser] = useState(1);
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getMockUserData(user).then(
      (data) => {
        setData(data);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );
  }, [user]);

  return (
    <>
      <button onClick​={() => setUser(1)}>Bob</button>&nbsp;&nbsp;
      <button onClick​={() => setUser(2)}>Alex</button>&nbsp;&nbsp;
      <button onClick​={() => setUser(3)}>Martin</button>&nbsp;&nbsp;
      <div>{`Active User id ${user}`}</div>
      <div>{loading ? "Loading...." : JSON.stringify(data, null, 4)}</div>
    </>
  );
```

![Click quickly on buttons](https://media.licdn.cn/dms/image/C5612AQFdZv0pmMgPVQ/article-inline_image-shrink_1000_1488/0/1588508602720?e=1633564800&v=beta&t=JOcPV3tNuHOkz5ldLc3opSsrfCUKHcujUSdsmzaEGUo)

> 如果快速点击另一个按钮来获取用户数据，可以看到用户有不同的输出，我们稍加改造一下

```

useEffect(() => {
		// 用于忽略前一个API请求的响应
    let canceled = true;
    setLoading(true);
    getMockUserData(user).then((data) => {
      if (canceled) {
        setData(data);
        setLoading(false);
      }
    });
    return () => (canceled = false);
}, [user]);
```

> 现在我们是同步的方式来渲染呈现UI
>
> PS: React 中还可以使用Suspense来处理 https://reactjs.org/docs/concurrent-mode-suspense.html

参考 ：https://en.wikipedia.org/wiki/Race_condition

​		https://stackoverflow.com/questions/34510/what-is-a-race-condition



> Memory Leak

Memory Leak 是最常被忽略的一点。原因是在传统网站的行为， 我们每次切换页面都是整页面重刷，并重新执行javascript,所以不太需要关心内存溢出的问题！但是当我们开发SPA(Single Page Application)网站时，我们是通过javascript来达到切换页面的内容，这时如果有对DOM注册监听事件，而没有在适当的时候把监听事件移除，就有可能选成Memory Leak。比如说在A页面监听body的scroll事件，但页面切换时，没有把scroll的监听事件移除。

```
useEffect(() => {
		const [list, setData] = useState([])
    const fetchData = async() => {
       const response = await fetch('yourdomain')
       const data = await response.json()
     	 setData(data);
    };
    fetchData();

  }, []);
```

> 这段代码看起来是很正常的一段代码，但在部分场景下会引发`memory leak`。如果API服务器花了一些时间来响应，并且在收到响应之前卸载了组件，那么就会发生`memory leak`，尽管组件已卸载，但在完成时仍然会收到请求的响应。然后将解析响应并调用setData。React会发警告:
>
> `Can’t perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.`
>
> 下面我们对代码稍微改动一下

```
useEffect(() => {
	  let componentMounted = true
		const [list, setData] = useState([])
    const fetchData = async() => {
       const response = await fetch('yourdomain')
       const data = await response.json()
     	 componentMounted && setData(data);
    };
    fetchData();
		return () => {
     componentMounted = false;
    }
  }, []);
```

> 上面代码中，创建了一个`componentMounted`的布尔变量，初始值为true。然后更新了我的状态并且在返回设置`componentMounted=false`

参考：https://zh.wikipedia.org/wiki/%E5%86%85%E5%AD%98%E6%B3%84%E6%BC%8F

> Complex State

当有非同步行为时，应用的状态就会变得非常复杂！比如说我们有一支VIP用户才能播放的影片，首先可能要先抓取这部影片的信息，接着我们要在播放时支验证用户是否有权限播放，而用户也有可能再按下播放按钮后又立即按了取消。类似这种都是非同步执行，这时就会有各种复杂的状态需要处理。

> Exception Handling

在Javascript中 try/catch 可以捕获同步的异常，但异步的程序就没这么容易，尤其当我们的异步行为很复杂时，这个问题就越加明显。虽然try/catch可以对async/await进行捕获，但中断了链式操作

### Different kinds of API 各种不同的API

+ DOM Events
+ XMLHttpRequest
+ Timer
+ Fetch
+ WebSockets
+ ......

上面列的API都是异步的，但他们都有各自的API及写法！如果我们使用RxJS,上面所有的API都可以通过RxJS来处理，就能用同样的API操作。

PS：同样的API是指RxJS的API.

> 让我们来看个小例子，假设我们想要监听点击事件，但点击一次之后不再监听

+ Javascript

```javascript
const handler = e => document.body.removeEventListener('click', handler)
document.body.addEventListener('click',handler)
```

+ Instead of Rxjs

```javascript
const {fromEvent} = rxjs
const {take} = rxjs.operators
fromEvent(document.body, 'click') // 注册事件
	.take(1) // 只取一次，取完就会移除事件
	.subscribe(console.log)

```

大致上能看得出来我们在使用Rxjs后，不管是针对DOM EVENT 还是上面列的各种API 我们都可以通过Rxjs的API来操作，像示例中用`take(n)`来设定只取一次，之后就释放内存



### Functional Reactive Programming函数响应式编程

FRP是一种编程范式，其实就是一种coding的方法论！例如OOP面向对象就是一种编程范式。FRP 其实涵盖了Reactive Programming 及 Functional Programming两种编程思想

### Functional Programming函数式编程

FP 大部分同学应该多少都有接触过，这也是Rx学习过程中的重点之一，后面预计会花1个篇幅来细讲FP，如果要用一句话来总结FP，那就是用<strong>Function来思考我们的问题，以及coding！</strong>

### Reactive Programming响应式编程

如果你使用过Vue开发网站，那应该对这个RP再熟悉不过。RP简单的来说就是<strong>当变量或资源发生变动时，由变量或资源自动告诉我们发生变动了</strong>

>  发生变动=> 异步 不确定什么时候会发生变动，反正变动时要通知我

