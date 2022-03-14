### 过滤操作符

**first**

顾名思义，就是取第一个。当Observable订阅后，数据流的第一次事件发生时，会得到这个事件值，然后结束。

```
const source = timer(0, 1000).pipe(take(10));

source.pipe(
  first()
)
.subscribe(data => {
  console.log(`${data}`);
});
```

弹珠图：

```
0---1---2---3---4---5---6---7---8---9|
first()
0|
```

`first`也可以传一个callback function，一样是设定过滤条件，与`filter`一样

> PS ：`filter` operator 与原生JS一样，不再单独介绍 

```
const source = timer(0, 1000).pipe(take(10));

source.pipe(
  first(data => data > 3)
)
.subscribe(data => {
  console.log(`${data}`);
});
```

弹珠图：

```
0---1---2---3---4---5---6---7---8---9|
first(data => data > 3)
----------------4|
```

**last**

`last`跟`first`相反，其它都一样。取最后一次发生的事件值，因此原来的Observable流中要有`copmlete`发生

```
const source = timer(0, 1000).pipe(take(10));

source.pipe(
  last()
)
.subscribe(data => {
  console.log(`${data}`);
});
```

弹珠图：

```
0---1---2---3---4---5---6---7---8---9|
last()
------------------------------------9|
```

**single**

`single`可以帮助我们限制整个数据流只会有一次事件发生，当发生第二次事件时，就会发生错误

```
timer(0, 1000).pipe(
  take(10),
  single()
)
.subscribe({
  next: data => {
    console.log(data);
  },
  error: (err) => {
    console.log(err)
  }
});
// Sequence contains more than one element
```

弹珠图：

```
0---1---2---3---4---5---6---7---8---9|
single
----#
```

如果整个数据流只有一次事件发生，就不会发生错误，要确定是否只有一次事件，当然要等数据流结束才会确认是否会发生错误！

> PS：如果整体数据流没有事件结束呢？会发生错误吗？

`single`一样也可以传入callback function，条件会变成`符合条件时，如果整个数据流只发生过一次事件且发生该事件的值相符合，否则undefined`

```
timer(1000).pipe(
  take(5),
  single(data => data === 0)
).subscribe({
  next: data => {
    console.log(`${data}`);
  },
  error: (err) => {
    console.log(`${err}`)
  },
  complete: () => {
    console.log('single complete');
  }
});
```

```
---0---1---2---3---4|
single(data => data === 0)
---0|
```

```
timer(1000).pipe(
  take(5),
  single(data => data === 1)
).subscribe({
  next: data => {
    console.log(`single 範例 (5): ${data}`);
  },
  error: (err) => {
    console.log(`single 發生錯誤範例 (5): ${err}`)
  },
  complete: () => {
    console.log('single 範例結束 (5)');
  }
});
```

如果在符合条件前就发生超过2次事件；或符合条件时已经是第二次事件，就会得`undefined`

```
timer(1000).pipe(
  take(5),
  single(data => data === 1)
).subscribe({
  next: data => {
    console.log(` ${data}`);
  },
  error: (err) => {
    console.log(`${err}`)
  },
  complete: () => {
    console.log('single complete');
  }
});
```

弹珠图：

```
---0---1---2---3---4|
single(data => data === 1)
-------(undefined)|
符合条件时已经不只是发生过一次事件，因此得到undefined
```

**take**

代表要从来源Observable中触发N次事件值；当订阅开始后，如果发生过的事件数量已经达到我们设定的数量后，就会结束

```
timer(0, 1000).pipe(
  take(6)
).subscribe({
  next: data => console.log(`take 示例: ${data}`),
  complete: () => console.log(`take complete`),
});
// 0 1 2 3 4 5
```

弹珠图：

```
0---1---2---3---4---5---6---7---8---...
take(6)
0---1---2---3---4---(5|)
```

**takeLast**

`take`是从事件开始时取前面N次的事件值，`takelast`则是从后面取Observable最后N次的事件值，`takeLast`会等到Observable结束后，才会得到最后几次事件数据

```
range(1, 5).pipe(
  takeLast(3)
).subscribe(
  data => console.log(`takeLast 示範: ${data}`)
);
// 3 4 5
```

弹珠图：

```
(12345)
takeLast(3)
  (345)
```

**takeUntil**

![takeUntil marble diagram](https://rxjs.dev/assets/images/marble-diagrams/takeUntil.png)

会持续触发来源Observable的事件什，直到`untile`指定的别个一个Observalbe发生新事件时，才会结束。

```
const click = fromEvent(document.querySelector('#btnStop'), 'click'); 
const source = interval(1000).pipe(map(data => data + 1))

source.pipe(
  takeUntil(click)
).subscribe({
  next: data => console.log(` ${data}`),
  complete: () => console.log('takeUntil complete')
});
// 1 2 3 4 5
// takeUntil complete
```

弹珠图：

```
          ---1---2---3---4---5---6-...
takeUntil(---------------------c---...)
          ---1---2---3---4---5-|
```

可以看到订阅后在`click`事件发生前，会持续触发`source`事件，直到`click`事件发生，就结整个Obvservable

**takeWhile**

![takeWhile marble diagram](https://rxjs.dev/assets/images/marble-diagrams/takeWhile.png)

`takeWhile`需要传入一个callback function，这个callback function决定`takeWhile`发生事件的时机，只要这个callback funciton返回`true`就会持续产生事件，直到不符合条件结束

```
const source = interval(1000).pipe(map(data => ++data))

source.pipe(
  takeWhile(data => data < 5)
).subscribe({
  next: data => console.log(` ${data}`),
  complete: () => console.log('takeWhile complete')
});
// 1 2 3 4
// takeWhile complete
```

弹珠图：

```
---1---2---3---4---5---6---7....
takeWhile(data => data < 5)
---1---2---3---4---|
									 ^不符合条件就结束了
```

**skip**

可以传入一个数字，当订阅开始时，会`忽略`前N个事件什，直到第N+1事件值才会收到数据

```
interval(1000).pipe(
  skip(3)
).subscribe(data => {
  console.log(`${data}`)
})
// 3,4,5...
```

弹珠图：

```
---0---1---2---3---4---5....
skip(3)
---------------3---4---5....
					 ^忽略前三次事件值
```

**skipLast**

会忽略整个Observable 的最后N次事件值

```
range(5).pipe(
  skipLast(3)
).subscribe(
  data => console.log(`${data}`)
);
//0, 1
```

弹珠图：

```
(01234)
skipLast(3)
   (01)
```

与上面提到的`takeLast`不同的是，`skipLast`不用等到整个Observable结束才知道要怎么开始获取数据,从`sipLast`实现来看的话，会在前面N次事件发生时不做任何事情，当N+1次事件发生时，才把数据从头开始依照每次新事件发生顺序推送数据。

源码：

```typescript
export function skipLast<T>(skipCount: number): MonoTypeOperatorFunction<T> {
  return skipCount <= 0
    ? 
      identity
    : operate((source, subscriber) => {
    
        let ring: T[] = new Array(skipCount);
   
        let seen = 0;
        source.subscribe(
          new OperatorSubscriber(subscriber, (value) => {
            
            const valueIndex = seen++;
            // 不满足N+1次时，事件值缓存起来
            if (valueIndex < skipCount) {
              
              ring[valueIndex] = value;
            } else {
         
              const index = valueIndex % skipCount;
             
              const oldValue = ring[index];
              ring[index] = value;
             
              subscriber.next(oldValue);
            }
          })
        );
        return () => {
          // Release our values in memory
          ring = null!;
        };
      });
}
```

```
interval(1000).pipe(
  skipLast(3),
).subscribe(data => {
  console.log(`${data}`)
});
// 前三次事件发生时不会推送

```

`interval(1000)`是一个不会结束的数据流，而`skipLast`不会等到数据流结束，就开始产生事伯了

```
---0---1---2---3---4---5---...
skipLast(3)
---------------0---1---2---..
```

**skipUntil**

`skipUntil`会持续忽略数据，直到指定的Observable发出新的事件时，才会开始

```
onst click = fromEvent(document.querySelector('#btnStart'), 'click');
const source = interval(1000);

source.pipe(
  skipUntil(click)
).subscribe(data => console.log(`${data}`));
// 点击按钮后才开始触发订阅
```

```
source$: ---0---1---2---3---4---5...
click$:  ---------c---....

source$.pipe(takeUntil(click$))
         -----------2---3---4---5...
                  ^ 触发订阅
```

**skipWhile**

`skipWhile`需要传入一个callback function，在这个function会决定忽略的目前数据流的条件，只要符合这个条件。会一直忽略，直到条件不符合为止

```
interval(1000).pipe(
  skipWhile(data => data < 2)
)
.subscribe(data => console.log(` ${data}`));
//2 3 4 5....
```

弹珠图：

```
---0---1---2---3---4---5....
skipWhile(data => data < 2)
-----------2---3---4---5
           ^ 不符合 data < 2的条件，开始触发订阅
```

**distinct**

`distinct`功能是去重。与`mysql`中物distinct功能一样，过滤重复的值

```
from([1, 2, 3, 3, 2, 1, 4, 5])
  .pipe(distinct())
  .subscribe(data => {
    console.log(`${data}`);
  });
 // 1 2 3 4 5
```

弹珠图：

```
(1   2   3   3   2   1   4   5)
distinct()
(1   2   3               4   5)
             ^ 因数据重复，不触发订阅
```

`distinct`还可以伟入callback function，用来过滤对象key的重复

**distinctUntilChanged**

`distinctUntilChanged`会过滤到重复的事件值，直到事件值发生改变为止。也就是说，只要当前事件值跟上一次事件值一样，这次事件就不会发生，若目前事件值跟上一次事件值不同时，这次事件会发生

```
from([1, 1, 2, 3, 3, 1]).pipe(
  distinctUntilChanged()
).subscribe(data => {
  console.log(`${data}`)
});
```

弹珠图：

```
(1   1    2    3    3    1)
distinctUntilChanged()
(1        2    3         1)
    ^ 事件值跟上一样，不产生事件
          ^ 事件值跟上次不一样，产生事件
```

`distinctUntilChanged`内可以传入一个`compare`callback funciton，这个fcuntion会传入current与 prev的事件值，让我们可比较判断是否有被变更

```
const students = [
  { id: 1, score: 70 },
  { id: 1, score: 80 },
  { id: 2, score: 90 },
  { id: 3, score: 100 }
];
from(students).pipe(
  distinctUntilChanged(
    (studentA, studentB) => studentA.id === studentB.id
  )
)
.subscribe(student => {
  console.log(
    `${student.id} - ${student.score}`
  );
});

// 1 - 70
// 2 - 90
// 3 -100

```

**distinctUntilKeyChanged**

`distinctUntilKeyChanged` 跟 `distinctUntilChanged` 比较相似，但特别合适用在对象的某一个属性就是比较key的状态，以前d面`distinctUntilChanged`的例子来说，我们需要传比较的逻辑`compare funciton`，`distinctUntilKeyChanged`可以简化写法

```
const students = [
  { id: 1, score: 70 },
  { id: 1, score: 80 },
  { id: 2, score: 90 },
  { id: 3, score: 100 }
];
from(students).pipe(
  distinctUntilKeyChanged('id')
)
.subscribe(student => {
  console.log(
    `${student.id} - ${student.score}`
  );
});
// 1 - 70
// 2 - 90
// 3 -100
```

**sample**

![sample marble diagram](https://rxjs.dev/assets/images/marble-diagrams/sample.png)

**sample**取样的意思，可以传一个`notifier`的Observable，每个`notifier`有新事件发生时，`sample`就会在来源Observable上取最近一次发生的事件值

```
const notifier = new Subject();
const source = interval(1000);
source.pipe(
  sample(notifier)
).subscribe(data => {
  console.log(`${data}`);
});

setTimeout(() => notifier.next(), 1500);
// 0
setTimeout(() => notifier.next(), 1600);
// nothing
setTimeout(() => notifier.next(), 5000);
// 4
```

弹珠图：

```
       ---0---1---2---3---4---5....
sample(-----x---x---------x----....)
       -----0-------------4----....
```

执行过程如下

- `source` 是每 1000 ms发生一次事件的 Observable
- 1500 ms，`notifier` 发生事件，取样一次，此时 0~1500 ms內來源 Observable 最后一次事件值为 `0`
- 1600 ms，`notifier` 发生事件，取样一次，此时 1501~1600ms內來源 Observable 沒有任何事件发生过
- 5000 ms，`notifier` 发生事件，取样一次，此时1601~5000 ms內來源 Observable 最后一次事件值为`4`

**sampleTime**

![sampleTime marble diagram](https://rxjs.dev/assets/images/marble-diagrams/sampleTime.png)

`sampleTime`有定期取样的意思，可以指定一个时间，当Observable被订阅时，就会依据指定的时间，每经过这段时间就从来源Observable内取这段时间最近一次的数据

```
const source = new Subject();
source.pipe(
  sampleTime(1500)
).subscribe(data => {
  console.log(` ${data}`);
});
setTimeout(() => source$.next(1), 0);
setTimeout(() => source$.next(2), 500);
setTimeout(() => source$.next(3), 1000);
setTimeout(() => source$.next(4), 4000);
setTimeout(() => source$.next(5), 5000);
setTimeout(() => source$.complete(), 5500);
// 3 4
```

弹珠图：

```
1--2--3---------------4-----5--|
sampleTime(1500)
---------3---------------4-----|
         ^ 1500 毫秒取第一次
                  ^ 3000 毫秒取第二次 但沒新数据产生
                        ＾4500 毫秒取第三次
```

执行过程如下：

- `source`开始订阅，` sampleTime(1500)`会依照1500ms的循环去取来源Observable最近一次事件值
- 1500ms 后，在0-1500ms内的最后次事件值为3
- 3000ms后，在1501-3000ms内没有发生任何事件
- 4500ms后，在3001-4500ms取最近一次的事件什为4
- 5500ms`source`结束，因此不会有6000ms的时间点

**auditTime**

`auditTime` 运行机制跟 `sampleTime` 很像，差别在`auditTime`依照新事件发生后的指定时间内来处理，而`sampleTime`则是单纯的时间周期循环，我们可以在`auditTime`内指定一个时间间隔，每当来源Observable有新事件发生时，就会地等待一段时间，当指定时间间隔到了之后，才让来源Observable在这段时间内发生最近一次事件

```
interval(1000).pipe(
  auditTime(1500)
).subscribe(data => {
  console.log(`${data}`);
})
// 1 3 5 7
```

弹珠图：

```
-----0-----1-----2-----3-----4....
auditTime(1500)
--------------1-----------3---....
     ^ 发生事件后，等待 1500 ms
              ^ 1500 ms后，取來源 Observable 最近一次事件值
```

**debounceTime**

![debounceTime marble diagram](https://rxjs.dev/assets/images/marble-diagrams/debounceTime.png)

`debounceTime`可以指定一个时间间隔，当来源Observable有新事件发生时，会等待这段时间，如果这段时间内没有新的事件发生，将这个数据发生在新的Observable上；如果在这段等待时间有新事件发生，则原来的事件不会发生在新的数据流上，并持续等待

```
const source = new Subject();

source.pipe(
  debounceTime(500)
).subscribe(data => {
  console.log(` ${data}`);
});

setTimeout(() => source.next(1), 0);
setTimeout(() => source.next(2), 100);
setTimeout(() => source.next(3), 200);
setTimeout(() => source.next(4), 800);
setTimeout(() => source.next(5), 1200);
setTimeout(() => source.next(6), 1800);
setTimeout(() => source.complete(), 2000);
// 3 5 6
```

弹珠图：

```
1-2-3------4----5------6--|
debounceTime(500)
---------3-----------5----(6|)
         ^ 事件3发生后 500ms没有新事件 才将些数据发生在新的Observalbe上
```

**debounce**

![debounce marble diagram](https://rxjs.dev/assets/images/marble-diagrams/debounce.png)

`debounce`和`debounceTime`都是在一段时序内没有新事件才会让些事件值发生。差别在于`debounce`可以传入`durationSelector`的callback function，`debounce`会将来源Observable事件值传入`durationSelector`，并返回一个用来控制时间的Observable或Promise

```
const source = interval(3000);
const durationSelector = (value) => interval(value * 1000);

source.pipe(
  debounce(durationSelector)
).subscribe(data => {
  console.log(`${data}`);
});
// 0 1 2
```

弹珠图：

```
---0---1---2---3---4---5---6---....
debounce((value) => interval(value * 1000))
---0----1-----2----------------....
   ^ 第一次是 interval(0)，因此直接发生在新的 Observable 上
       ^ 之后发生事件 1，订阅 interval(1000)
```

