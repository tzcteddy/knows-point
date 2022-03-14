### 转换操作符

**map**

`map`在实际开发中使用频率非常的高，简单易懂，并且许多功能都可用`map`完成。

```

of(1, 2, 3, 4).pipe(
  map(value => value * 2)
).subscribe(value => console.log(`${value}`));
// 2,4,6,8
```

弹珠图：

```
1    2    3    4|
map(value => value * 2)
2    4    6    8|
```

上面可以看出，与原生JS`map`很像很像。但还是有差别的

- `Observable`的`map`是每次有事件发生时进行转换
- 原生JS的`map`立刻把整个数组的数据进行转换

**scan**

`scan`需要传两个参数

- 累加函数：这个函数执行时会传入三个参数，可以搭配这三个参数处理数据后返回一个累加的结果，函数参数包含
  - `acc`：目前累加的值，也就是上一次执行累加函数的返回结果
  - `value`：当前事件推送的值
  - `index`：索引
- 初始值

```
const amount = [1, 2, 3, 4];

const source = of(...amount).pipe(
  scan(
    (acc, value) => acc + value, // 累加函数
    0 // 初始值
  )
);

source.subscribe(amount => {
  console.log(`${amount}`) 
});
// 1,3,6,10
```

弹珠图：

```
(1          2       3       4|)
scan((acc, value) => acc + value, 0)
(1          3       6      10|)
```

`scan`与`reduce`operator很像，但`reduce`只会返回结束时的累加总结果

**pairwise**

`pairwise`可以将`Observable`的数据成对成对的输出，这个operator没有任何参数。

```
import {of} from 'rxjs'
import {pairwise} from 'rxjs/operators'

of(1, 2, 3, 4, 5, 6)
.pipe(pairwise())
.subscribe((data) => {
console.log(`pairwise 示例: ${data}`);
});
  // pairwise 示例: 1,2
  // pairwise 示例: 2,3
  // pairwise 示例: 3,4
  // pairwise 示例: 4,5
  // pairwise 示例: 5,6
```

`pairwise`会将目前事件和上一次事件组成一组。有一点需要注意，因为第一次事件发生时，没有上一次事件，所以输出结果的数量永远会比总事件数量少一次

弹珠图：

```
(      1      2      3      4      5      6|)
pairwise()
(           [1,2]  [2,3]  [3,4]  [4,4]  [5,6]|)
      ^ 第一次事件发生时，还没有上一次事件，因此会被过滤掉
```

因为第一次事件发生时会自动过滤，我们看下如何用`scant和filter`如何来实现相同的效果

```
 of(1, 2, 3, 4, 5, 6)
 .pipe(
   scan((accu, value) => [accu === null ? null : accu[1], value], null),
   filter((value) => value[0])
 )
 .subscribe((data) => {
 	console.log(data);
 });
```

弹珠图：

```
(      1      2      3      4      5        6|)
scan()
( [null, 1] [1,2]  [2,3]  [3,4]  [4,4]  [5,6]|)
filter()
(  				  [1,2]  [2,3]  [3,4]  [4,4]  [5,6]|)
      ^ 过滤掉值null的
```

**switchMap**

`switchMap`内部是一个`project`function，传入的参数为前一个Observable的事件值，同时必须返回一个Observable。因此可以帮助我们原先来源的事件值转换成另一个Obserable,`switchMap`收到这个 Observable后会帮我们进行订阅的动作，再把订阅结果当作新的事件值发送， 会退订上一次的Observable。

```
import { timer, interval } from 'rxjs'; 
import { switchMap } from 'rxjs/operators';

interval(3000).pipe(
  switchMap(() => timer(0, 1000))
).subscribe(data => {
  console.log(data);
});
// 0
// 1
// 2
// 0 (新Observable事件发生，退订上一个 Observable)
// 1
// 2
// ...
```

来源`interval(3000)`每次有新事件发生时，会产生新的Observable`timer(0, 1000)`，如果上一次Observable没有完成，会被退订掉。切换成新的Observable，所以每次产生`0,1,2`的循环

**concatMap**

在每次事件发生时都会产生的新的`Observable`，不过`concatMap`会等前面的Observable结束后，才会接上`concat`产生的的`Observable`

```
import { timer, interval } from 'rxjs'; 
import { switchMap } from 'rxjs/operators';
interval(3000).pipe(
  concatMap(() => timer(0, 1000))
).subscribe(data => {
  console.log(data);
});
// 0
// 1
// 2
// 3
// 4
// 5
// 6
// 永远不会结束
```

上面代码中，由于`concatMap`转换了一个没有结束的机会的Observable，因此来源`interval(3000)`Observable虽然持续有新事件，但却因为上一次的Observable没有结束而无法继续

看一下正确用法：

```
const source1 = interval(3000);
const source2 = timer(0, 1000).pipe(take(5));

source1.pipe(
  concatMap(() => source2)
).subscribe(data => {
  console.log(data);
});
// 0
// 1
// 2
// 3
// 4
// 0
// 1
// ...
```

在使用`concatMap`时，转换后的Observable基本上都必须设定结束条件，也就是确保会完成`complete`

弹珠图：

```
source1 -----0-----1-----2-----3.....
source2 -0-1-2-3-4|

source1.pipe(concatMap(() => source2))

         -------0-1-2-3-4-0-1-2-3-4-0-1-2-3-4-0-1-2-3-4
                ^ source1 的事件 0，转换成source2的事件流
                    ^ source1 的事件 1，但上一次的事件流还没结束，等待中
                        ^ source1 事件 0 转换的事件流结束，开始新的事件流
```

**mergeMap**

会把所有被转换过的Observable合并到同一个数据流内，因此会有平行处理的概念，也就说每次转换的Observable都会直接订阅，不会退订上一次的Observable，也不会等待上一次Observable结束，因此在任何目前存在中的Observable数据流中有新事件，都会被转换成整体数据流的事件

```
const source1 = timer(0, 3000);
const source2 = (input) => timer(0, 1500)
  .pipe(map(data => `数据流 ${input}: ${data}`));

source1.pipe(
  mergeMap(data => source2(data))
).subscribe(result => {
  console.log(result);
});
 // 数据流 0: 0
 // 数据流 0: 1
 // 数据流 1: 0 新事件，新数据流
 // 数据流 0: 2
 // 数据流 1: 1
 // 数据流 0: 3
 // 数据流 1: 2
 // 数据流 2: 0 新事件，新数据流
 // 数据流 0: 4
 // 数据流 1: 3
 // 数据流 2: 1
 // 数据流 0: 5
 // 数据流 1: 4
 // 数据流 2: 2
 // 数据流 3: 0 新事件，新数据流
 // 数据流 0: 6
 // 数据流 1: 5
 // 数据流 2: 3
 // 数据流 3: 1
 // 数据流 0: 7
 // 数据流 1: 6
 // 数据流 2: 4
```

弹珠图：

```
source1: -----0-----1-----2--..
source2: --0--1--2--3--4--5--...
				------[0,0],[0,1]
        			------[1,0],[0,2],[1,1],[0,3],[1,2]
        						------[2,0],[0,4],[1,3],[2,1],[0,5],[1,4],[2,2]
        										----...

```



