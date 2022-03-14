### 多播操作符

第一章节我们介绍过`Cold Observable`与`Hot observable`。Cold Observable与Observer是一对一的关系，也就是每次产生订阅时，者会是一全新的数据流。而Hot Observer和Observer是一对多的关系，也就是每次产生的订阅时，都会使用同一份数据流，本节介绍的操作符就是将Cold Observable 转成Hot Observable，让原来的数据可以共用。

**multicast**

将来源Observable 单播 `unicast`变成 `multicast` 多播。在`multicast`内必须指定一个产生Hot Observable的工厂方法

```
const source = interval(1000).pipe(
  take(5),
  multicast(() => new Subject())
);
```

当使用`multicast`时，新的Observable类型会是一个[ConnectableObservable](https://rxjs-dev.firebaseapp.com/api/index/class/ConnectableObservable),和一般的Observable的差别就在于ConnectableObservable是多播的，且必须执行它的`connect`方法，才会开始进行多播的动作：

```
 const source = interval(1000).pipe(
  take(5),
  multicast(() => new Subject())
);
 source.subscribe((data) => {
 console.log(`multicast 第一次订阅: ${data}`);
 });

setTimeout(() => {
source.subscribe((data) => {
console.log(`multicast 第二次订阅 ${data}`);
});
}, 5000);
setTimeout(() => {
	source.connect();
}, 3000);
 // multicast 第一次订阅: 0
 // multicast 第一次订阅: 1
 // multicast 第二次订阅: 1
 // multicast 第一次订阅: 2
 // multicast 第二次订阅: 2
 // multicast 第一次订阅: 3
 // multicast 第二次订阅: 3
 // multicast 第一次订阅: 4
 // multicast 第二次订阅: 4
```

弹珠图：

```
--0--1--2--3--4--5--6...
take(5)
--0--1--2--3--4| -> 此时还是 Cold Observable
source = multicast(() => new Subject())
--0--1--2--3--4| -> 此时已是 Hot Observable

第一次訂阅：          ----------0--1--2--3--4|
                    ^ 第一次订阅时间
第二次訂閱：                       1--2--3--4|
                                 ^ 第二次订阅时间点
source.connect():          --0--1--2--3--4|
                            ^ connect 时间
```

**publish**

`publish` 将 `multicast` 內封裝了 。`multicast` 內创建Subject 的方法，直接使用 `new Subject()`，因此以下面两段代码完全一样：

```
interval(1000).pipe(
  multicast(() => new Subject())
);

interval(1000).pipe(
  publish()
);
```



**refCount**

当Observable是ConnectableObservable时，我们必须主动调用`connect`，才可以让数据流开始流动，如果不需要自行控制`connect`时机，可以使用`refCount`来帮我们执行`conect`

```
const source1 = interval(1000).pipe(
  take(5),
  publish()
);

const source2 = interval(1000).pipe(
  take(5),
  publish(),
  refCount(),
);

source1.subscribe((data) => {
  console.log(`source1>>>${data}`);
});

source2.subscribe((data) => {
  console.log(`source2>>>${data}`);
});
source2>>>0
source2>>>1
source2>>>2
source2>>>3
source2>>>4
```

从执行结果可以看出，`source1`因为没有主动去执行`connect`的关系，虽然有订阅，但没有开始；`source2`则使用`refCount`帮我们执行`connect`，因些当订阅发生时，整个数据流就会直接开始

**share**

`share` 基本上就是 `multicast(new Subject())` 与 `refCount()` 的组合，也可以看成是`publish()`与`refCount()`的组合。

**shareReplay**

`shareReplay`可以直接当作是`multicast(new ReplaySubject())`与`refCount()`的组合，与`share`不同的是，`shareReplay`有重播的概念，也就是每次订阅时，会重播过去N次发生的数据

在1.6中详细介绍过`ReplaySubject`， 这里不再做过多介绍。