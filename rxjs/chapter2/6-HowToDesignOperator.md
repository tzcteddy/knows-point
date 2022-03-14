

### 设计自己的Opeator

**为何要自己设计？**

Rxjs提供了超过100个operators，很多场景下都满足了，实际上我们确实不一定需要设计operator，如果有以下几种情况，可能比较适合自己设计制Operator

- 单元测试：当我们将一堆opeartors合适`pipe`串起来时，多多少少会需要加上一些 `side effect`的代码。这样的行为会让我们单元测试很不容易，此时我们可以把`side effect`前和后的opeartors各自建立成新的`opeartors`独立测试
- 通用性：很如果我们是负责写`libary`的开发人员，在提供通用性的功能进，比较适合把通用性提取出来，让使用更容易 
- 可读性：当功能越来复杂时，是有可能在一个`pipe`里面一口气写数十个operators，不易阅读，维护上亦然。那么将不同组的行为抽成独立的opeartors。
- 重构：我们重构程度代码，当然也会重构opeartors，将opeartors抽出新的opeartor，就跟把一段复杂的代码抽成一个function一样
- 没有合适的operator：实际上应该不太可能发生，常用的operator几乎可以完各种弯，其它都只是让语义更强、使用更方便。

**再一次认识operator结构**

operator其实就是一个`curry function`柯里化函数而已，让我们看一下之前介绍到的 `map` operator基本结构

```typescript
export function map<T, R>(project: (value: T, index: number) => R): OperatorFunction<T, R>;
```

```typescript
export function map<T, R>(project: (value: T, index: number) => R, thisArg?: any): OperatorFunction<T, R> {
  // 返回 OperatorFunction
  return operate((source, subscriber) => {
    // 索引初始化
    let index = 0;
    // 订阅源 将发送所有错误和完成 给使用者
    source.subscribe(
      new OperatorSubscriber(subscriber, (value: T) => {
        //thisArg用来修改当前上下文，如果用户有传的话 并将结果返回
        subscriber.next(project.call(thisArg, value, index++));
      })
    );
  });
}
```

可以看出operator一定要返回`OperatorFunction`,也就是`operate`function，我们再看一下`operate`做了哪些事情，主要是判断是否存在`lift`函数

```typescript
export function hasLift(source: any): source is { lift: InstanceType<typeof Observable>['lift'] } {
  return isFunction(source?.lift);
}
export function operate<T, R>(
  init: (liftedSource: Observable<T>, subscriber: Subscriber<R>) => (() => void) | void
): OperatorFunction<T, R> {
  return (source: Observable<T>) => {
    if (hasLift(source)) {
      return source.lift(function (this: Subscriber<R>, liftedSource: Observable<T>) {
        try {
          return init(liftedSource, this);
        } catch (err) {
          this.error(err);
        }
      });
    }
    throw new TypeError('Unable to lift unknown Observable type');
  };
}
```

**定义一最简单的operator**

```
 const doNothing = (source) => {
 	return source;
 };
 source = from([1, 2, 3, 4]);
 source.pipe(doNothing).subscribe(console.log);
 // 1 2 3 4
```

可以看到，我们已经定义好一个opeartor，虽然它什么都没有做....

如果需要定义参数，写个`curry function`就好了

```
const doNothing = (args) => {
 	return source=> source
 };
```

**自定义Operator两种方式**

直接串上现有的operator

```
 const filterPassScore = () => {
   return (source$) => {
     return source$.pipe(
       filter((score) => score >= 60)
     );
   };
 };
 const scores = of( 80,36, 49, 100);
 scores.pipe(filterPassScore()).subscribe(console.log);
 // 80 100
```

从新的Observable开始

```
const filterPassScore = (passScore) => {
  return (source$) => {
  // 创建新的 Observable
    return new Observable((subscriber) => {
    // 订阅來源 Observable并创建Observer来处理Observable的各种事件
      source$.subscribe({
        next: (score) => {
        if (score >= passScore) {
        // 分数及格 产生事件
        subscriber.next(score);
        }
        },
        // 也要处理 error 和 complete 事件
        error: (error) => subscriber.error(error),
        complete: () => subscriber.complete(),
      });
    });
  };
};
```

```
 const scores = of( 80,36, 49, 100);
 scores.pipe(filterPassScore(60)).subscribe(console.log);
```

需要注意的是，虽然我们只专注在`next`，但`error`和`complete`也需要处理。



