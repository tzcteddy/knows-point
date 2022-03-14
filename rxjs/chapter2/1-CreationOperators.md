### 创建操作符

**interval**

看名字不难理解，当被订阅时，会按照参数设定的时间(毫秒)间隔持续推送数据流,数据流从0开始。

```
import { interval } from 'rxjs';
interval(1000).subscribe(data => console.log(`interval 示例: ${data}`));
```

在取消订阅前，事件都会持续发生，弹珠图：

```
----0----1----2----3----.......
```

**timer**

`timer`与`interval`很类似，`interval`内部就是调用`timer`实现的。`interval`有个小缺点，就是一开始会先等待一个指定时间，才会发生第一个事件，有时候我们可能会希望一开始就发生事件，这个问题可通过`timer`解决。只要等待时间高为`0`即可

```
import { timer } from 'rxjs';
timer(0, 10000).subscribe(data => console.log(`timer 示例: ${data}`));
```

弹珠图：

```
0----1----2----3----......
```

还有一个重点，`timer`如果没有设定第二个参数，代表在指定的时间发生一次事后，就会结束

```
timer(3000).subscribe(data => {
  console.log(`timer 一个参数示例: ${data}`);
});
```

弹珠图：

```
--------------------0|
```

> PS: `interval`是直接调用`timer`实现的，我们看一下源码片段

```typescript
// interval code fragment
export function interval(period = 0, scheduler: SchedulerLike = asyncScheduler): Observable<number> {
  if (period < 0) {
    // We cannot schedule an interval in the past.
    period = 0;
  }
	// interval 调用timer时，第二个参数有个默认值
  return timer(period, period, scheduler);
}

// timer code fragment
export function timer(
  dueTime: number | Date = 0,
  intervalOrScheduler?: number | SchedulerLike,
  scheduler: SchedulerLike = asyncScheduler
): Observable<number> {
  // Since negative intervalDuration is treated as though no
  // interval was specified at all, we start with a negative number.
  let intervalDuration = -1;

  if (intervalOrScheduler != null) {
    // If we have a second argument, and it's a scheduler,
    // override the scheduler we had defaulted. Otherwise,
    // it must be an interval.
    if (isScheduler(intervalOrScheduler)) {
      scheduler = intervalOrScheduler;
    } else {
      // Note that this *could* be negative, in which case
      // it's like not passing an intervalDuration at all.
      intervalDuration = intervalOrScheduler;
    }
  }

  return new Observable((subscriber) => {
    // If a valid date is passed, calculate how long to wait before
    // executing the first value... otherwise, if it's a number just schedule
    // that many milliseconds (or scheduler-specified unit size) in the future.
    let due = isValidDate(dueTime) ? +dueTime - scheduler!.now() : dueTime;

    if (due < 0) {
      // Ensure we don't schedule in the future.
      due = 0;
    }

    // The incrementing value we emit.
    let n = 0;

    // Start the timer.
    return scheduler.schedule(function () {
      if (!subscriber.closed) {
        // Emit the next value and increment.
        subscriber.next(n++);
				// intervalDuration 是第二个参数，没有传入的话 直接next()以后执行complete()
        if (0 <= intervalDuration) {
          // If we have a interval after the initial timer,
          // reschedule with the period.
          this.schedule(undefined, intervalDuration);
        } else {
          // We didn't have an interval. So just complete.
          subscriber.complete();
        }
      }
    }, due);
  });
}



```



**of**

将传进去的数据当作一条`Observable`，当数据都推送完后结束。

```
import { of } from 'rxjs';
of(1).subsctibe(data => console.log(`of 示例: ${data}`));
```

生成的弹珠图:

```
(1|)
```

也就是说立刻推送`1`的数据，然后立即结束`complete()`

`of `也可以传入多个值，当订阅发生是这些值会各自触发`next()`，然后结束

```
of(1, 2, 3, 4).subscribe(data => console.log(`of 示例: ${data}`));
```

弹珠图：

```
(1234|)
```

**EMPTY**

顾名思义，就是一个空的`Observable`，没有任何事件就直接结束了

```
mport { EMPTY } from 'rxjs';

EMPTY.subscribe(data => data => console.log(`empty 示例: ${data}`));
// 不会有任何打印
```



**range**

顾名思义就是按照一个范围内的数列数据创建`Observable`，有两个参数

- start: 从哪个数值开始
- count: 建立多少个数值的数列

```
import { range } from 'rxjs';

range(3, 4).subscribe(data => console.log(`range 示例: ${data}`));
// 3 4 5 6
```

弹珠图：

```
(3456|)
```

**iif**

会通过条件来决定产生怎样的`Observable`，有三个参数

- condition:传一个`function`，这个`function`会返回`boolean`值
- trueResult:当调用`condition`函数返回`true`时，使用`trueResult`的`Observable`
- falseResult:当调用`condition`函数返回`false`时，使用`falseResult`的`Observable`

```
import { iif, of, EMPTY } from 'rxjs';

const iifHandle = (data) => {
	return iif(() => data % 2 === 0, of("Hello"), EMPTY)
};

iifHandle(1).subscribe((data) =>
	console.log(`iif 示例 (1): ${data}`)
);
// (不会打印任何东西)
iifHandle(2).subscribe((data) =>
console.log(`iif 示例 (2): ${data}`)
);
// iif 示例 (2): Hello
```

上边代码的关键在于：

```
iif(() => data % 2 === 0, of("Hello"), EMPTY)
```

当传入的`data`是偶数时，返回`of('Hello')`这个`Observable`，若不是则不做任何事情，也就是返回`EMPTY`这个`Observable`

**throwError**

看名字应该不难理解，用来让整个`Observable`发生错误用的。因此订阅时要记得使用`error`来处理，同时当有错误发生时，就不会有`complete`发生

```
const source = throwError("这是一个错误消息");
  source.subscribe({
  next: (data) => console.log(`throwError 示例 (next): ${data}`),
  error: (error) => console.log(`throwError 示例 (error): ${error}`),
  complete: () => console.log("throwError 示例 (complete)"),
});
// throwError 示例 (error): 这是一个错误消息      
```

`throwError`一般不会单独使用，而是在使用`pipe`设计整个`Observable`时，用来处理错误的

**from**

可以接受的参数类型包含`Array,Promise,Iterable,Observable对象`,与上面的`of`非常的像

- 传入Array

```
import { from } from 'rxjs';

from([1, 2, 3, 4]).subscribe(data => {
  console.log(`from 示例 (1): ${data}`);
});
```

弹珠图：

```
(1234|)
```

- 传入Iterable

```
// 使用generator
function* range(start, end) {
  for (let i = start; i <= end; ++i) {
  	yield i;
  }
}

from(range(1, 4)).subscribe((data) => {
	console.log(`from 示例 (2): ${data}`);
});
```

- 传入Promise

```
from(Promise.resolve(1)).subscribe(data => {
  console.log(`from 示例 (3): ${data}`);
});
```

- 传入 Observable

```
// 会重新组成一个新的Observable
from(of(1, 2, 3, 4)).subscribe(data => {
  console.log(`from 示例 (4): ${data}`)
});
```

**fromEvent**

将浏览器事件包装成`Observable`，有两个参数

- target 需要监听的DOM元素
- eventName 事件名称

使用非常简单

```
import { fromEvent } from 'rxjs';
fromEvent(document, "click").subscribe((data) => {
	console.log("fromEvent 示例: document事件触发了");
});
```

**fromEventPattern**

可以根据需要自定义逻辑决定事件发生，只要我们装将逻辑写好就好，有两个参数

- addHandler：当我们订阅时`subscribe`时，调用此方法决定如何处理事件逻辑
- removeHandler：当我们取消订阅时`unsubscribe`时，调用些方法将原来的事件逻辑取消

```
import { fromEventPattern } from 'rxjs';
const addClickHandler = (handler) => {
  console.log("fromEventPattern 示例: 自定义注册click事件");
  document.addEventListener("click", (event) => handler(event));
};

const removeClickHandler = (handler) => {
  console.log("fromEventPattern 示例: 取消自定义注册click事件");
  document.removeEventListener("click", handler);
};

const source = fromEventPattern(addClickHandler, removeClickHandler);

  const subscription = source.subscribe((event) =>
  console.log("fromEventPattern 示例: 触发document click 事件", event)
);

setTimeout(() => {
	subscription.unsubscribe();
}, 3000);
```

上面代码中， 我们声明了两个`function`，并接收`hanler`参数，这两个`function`可以通过这个`handler`（callback）来决定事件的发生或取消。之后使用`fromEventPattern`传入这两个`function`， 来完成一个`Observable`，当订阅`Subscribe`产生时，会产生`handler`并调用`addClickHandler`,并在事件发生时执行`handler`callback function。然后三秒后调用`unsubscribe`来取消订阅，

> 看到这里，`fromEvent`与`fromEventPattern`有什么区别？

**defer**

`defer`会将建立的`Observable`的逻辑包装起来，提供更一致的使用感觉，使用`defer`时需要传一个`factory function`当作参数，这个`function`里面需要返回一个`Observable或Promise`，当`defer`创建的`Observable`被订阅时，会调用这个`factroy function`，并以返回的`Observable`当作数据流。

源码片断

```typescript
export function defer<R extends ObservableInput<any>>(observableFactory: () => R): Observable<ObservedValueOf<R>> {
  return new Observable<ObservedValueOf<R>>((subscriber) => {
    // 被订阅才会执行observableFactory
  innerFrom(observableFactory()).subscribe(subscriber);
});
```

示例

```
import { defer } from 'rxjs';
const factory = () => of(1, 2, 3);
const source = defer(factory);
source.subscribe((data) => console.log(`defer 示例: ${data}`));
```

上面这段代码不用`defer`也没问题

```
const factory = () => of(1, 2, 3);
factory().subscribe(data => console.log(`defer 示例: ${data}`));
```

那么问题来了，为什么还要用`defer`呢？我们先看一段代码

```
const p = new Promise((resolve) => {
  console.log('Promise 执行了');
  setTimeout(() => {
    resolve(100);
  }, 1000);
});

p.then(result => {
  console.log(`Promise 处理结果: ${result}`);
});
// Promise 执行了
// Promise 处理结果: 100
```

可以看到`Promise excute立即执行了`如果此时我们不想让`Promise excuete`立即执行，做一个延迟`lazy` 执行那么就该`defer`上场了

```
 	const promiseFactory = () =>
   new Promise((resolve) => {
     console.log("Promise 执行了");
     setTimeout(() => {
     resolve(100);
     }, 1000);
   });
   const deferSource = defer(promiseFactory);
   // 此時 Promise 内 excute 不会立马执行
   console.log("示范用 defer 解決 Promise 的问题:");
   // 直到被订阅了才会执行 promise excute
   deferSource.subscribe((result) => {
   console.log(`Promise 结果: ${result}`);
   });
```

