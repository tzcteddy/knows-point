### Know Subject

`Subject`系列继承了`Observable`这个类，并给予了更多不同的特性，因此我们会说`Subject`也是一种特殊的`Observalbe`。`Subject`与`Observalbe`有两个明显不同的地方：

**Subject VS Observable**

- `Observable`在建立对象时就决定好数据流向了，而`Subject`是在产生事件后才决定数据的流向
- `Observable`每个订阅者都会得到独立的数据流`unicast`，`Subject`则是每次事件发生时就会同步传递给所有订阅者`Observer``multicast`

**Subject**

```js
	const { Subject, Observable } = rxjs;
      const subject$ = new Subject();
      // 先订阅
      subject$.subscribe((data) => console.log(`Subject 第一次订阅: ${data}`));
      // 触发next方法，推送数据流
      subject$.next(1);
      subject$.next(2);
      subject$.subscribe((data) => console.log(`Subject 第二次订阅: ${data}`));
      // 这里第一次订阅也会收到消息，multicast
      subject$.next(3);
      subject$.next(4);
      subject$.subscribe((data) => console.log(`Subject 第三次订阅: ${data}`));
      
      subject$.complete();
      
      const observable$ = new Observable((subscriber) => {
        console.log("stream 开始");
        // 建立对象时，决定好数据流向，等待外部订阅
        subscriber.next(1);
        subscriber.next(2);
        subscriber.next(3);
        subscriber.next(4);
        console.log("steam 结束");
        subscriber.complete();
      });

      observable$.subscribe((data) =>
        console.log(`Observable 第一次订阅: ${data}`)
      );
      // 每次订阅都独立的，一对一，unicast Cold Observalbe 参考1.4
      observable$.subscribe((data) =>
        console.log(`Observable 第二次订阅: ${data}`)
      );
```



> Rxjs7源码片断，继承`Observalbe`

```typescript
export class Subject<T> extends Observable<T> implements SubscriptionLike {
  closed = false;
  /** @deprecated Internal implementation detail, do not use directly. Will be made internal in v8. */
  observers: Observer<T>[] = [];
  /** @deprecated Internal implementation detail, do not use directly. Will be made internal in v8. */
  isStopped = false;
  /** @deprecated Internal implementation detail, do not use directly. Will be made internal in v8. */
  hasError = false;
  /** @deprecated Internal implementation detail, do not use directly. Will be made internal in v8. */
  thrownError: any = null;
```

**BehaviorSubject**

`Subject`在建立订阅后若一直没有事件发生，则不会执行订阅`subscribe`。如果希望一开始订阅时会先收到一个预设`preset value`值，且有事件发生后才订阅的行为也可以收到最近一次发生过的事件推送(可能看起来有点绕，看代码...)则可以使用`BehaviorSubject.`

```javascript
const { BehaviorSubject } = rxjs;
const source$ = new BehaviorSubject(0);
 source$.subscribe((data) =>
 		console.log(`BehaviorSubject 第一次订阅: ${data}`)
 );
 // BehaviorSubject 第一次订阅: 0
 source$.next(1);
 source$.next(2);
 //BehaviorSubject 第一次订阅: 1
// BehaviorSubject 第一次订阅: 2
```

`此时如果有新的订阅进来呢？这时会立刻收到最近一次事件的推送`

```
 source$.subscribe((data) =>
 console.log(`BehaviorSubject 第二次订阅: ${data}`)
 );
 //BehaviorSubject 第二次订阅: 2
```

`BehaviorSubject`产生的对象，有一个`value`属性，可以获取前面提到的`最近一次事件的推送数据`

```js
source$.next(3);
source$.next(4);

console.log(`目前 BehaviorSubject 的内容为: ${source$.value}`);

//整段代码输出
 /*
 BehaviorSubject 第一次订阅: 0
 BehaviorSubject 第一次订阅: 1
 BehaviorSubject 第一次订阅: 2
 BehaviorSubject 第二次订阅: 2
 BehaviorSubject 第一次订阅: 3
 BehaviorSubject 第二次订阅: 3
 BehaviorSubject 第一次订阅: 4
 BehaviorSubject 第二次订阅: 4
 目前 BehaviorSubject 的内容为: 4
 */
```



**ReplaySubject**

`ReplaySubject`有`重播`的意思，`ReplaySubject`会帮我们保留最近N次事件数据，并在订阅时重播这些发生过的事件给订阅者，跟`BehaviorSubject`类似，都有`cache`的概念，只是更有弹性

```js
const source$ = new ReplaySubject(3);

source$.subscribe((data) =>
console.log(`ReplaySubject 第一次订阅: ${data}`)
);

source$.next(1);
source$.next(2);

source$.subscribe((data) =>
console.log(`ReplaySubject 第二次订阅: ${data}`)
);
 /*
ReplaySubject 第一次订阅: 1
ReplaySubject 第一次订阅: 2
ReplaySubject 第二次订阅: 1
ReplaySubject 第二次订阅: 2
*/
```

第二次订阅后还没有任何事件发生，此时单纯是靠`ReplaySubject`把最近三次的资料重播，但目前只有两次事件，所以只会收到两件事件数据，当事件连续发生超过三次时，这时再订阅就会收到完整`cache`缓存的最近三次数据

```js
source$.next(3);
source$.next(4);

source$.subscribe((data) =>
console.log(`ReplaySubject 第三次订阅: ${data}`)
);
```

`输出结果`

![image-20210817221806194](https://gitee.com/zhufengpeixun/zhufeng_-rxjs_202108/raw/master/assets/image-replaySubject.png)

**AsyncSubject**

`AsyncSubject`比较特殊一点，当`AsyncSubject`对象被建立时，过程中发生任何事件都不会收到数据，直到`complete()` 被 `call`调用，才会收到最后一次的事件流

```js
const source$ = new AsyncSubject();
source$.subscribe((data) =>
console.log(`AsyncSubject 第一次订阅: ${data}`)
);

source$.next(1);
source$.next(2);

source$.subscribe((data) =>
console.log(`AsyncSubject 第二次订阅: ${data}`)
);

source$.next(3);
source$.next(4);

source$.subscribe((data) =>
console.log(`AsyncSubject 第三次订阅: ${data}`)
);
/*
AsyncSubject 第一次订阅: 4
AsyncSubject 第二次订阅: 4
AsyncSubject 第三次订阅: 4
*/
```

如果用弹珠图来解释的话，通过`next()`推送的过程可能是这样

```
----1----2----3----4----|
```

而实际订阅时，收到的数据变成这样子

```
--------------------(4|)
```

> 从实际源码上看，`AsyncSubject`对象在未调用`complete`方法，仅仅对事件的数据做了cache，并未调用`Subject next`

```typescript
// AsyncSubject 源码片段
next(value: T): void {
    if (!this.isStopped) {
      this._value = value;
      this._hasValue = true;
    }
  }

 complete(): void {
    const { _hasValue, _value, _isComplete } = this;
    if (!_isComplete) {
      this._isComplete = true;
      _hasValue && super.next(_value!);
      super.complete();
    }
  }
// Subject 源码片段
next(value: T) {
    errorContext(() => {
      this._throwIfClosed();
      if (!this.isStopped) {
        const copy = this.observers.slice();
        for (const observer of copy) {
          observer.next(value);
        }
      }
    });
  }
complete() {
    errorContext(() => {
      this._throwIfClosed();
      if (!this.isStopped) {
        this.isStopped = true;
        const { observers } = this;
        while (observers.length) {
          observers.shift()!.complete();
        }
      }
    });
  }


```



**共用API-asObservalbe**

所有的`Subject`系列都有一个共用且常用到的API:`asObservalbe`，它的用途是将`Subject`当作`Observalbe`返回。这样有什么好处呢？由于`Observable`并没有`next/complete/error`这样的API，因此可以让得到这个`Observable`对象的程序专注在数据流的订阅相关的处理就好，不被允许发送新的事件。

```js
class Student {
constructor() {
this._score$ = new Subject();
}

get score() {
return this._score$.asObservable();
}

updateScore(score) {
// 大于 70才允许推送
if (score > 70) {
this._score$.next(score);
}
}
}

const Jonny = new Student();

Jonny.score.subscribe((score) => {
console.log(`当前成绩：${score}`);
});

      Jonny.updateScore(70);
      Jonny.updateScore(50);
      Jonny.updateScore(80); // 当前成绩: 80
```

