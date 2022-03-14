### Know Scheduler

一般情况下，我们很少会用到rxjs的`Scheduler`，但`Scheduler`可以说是控制Rxjs至关重要的角色，偶尔也有可能会需要使用`Scheduler`来调整事件发生的时机。

**What's Scheduler?**

`Schedule` 顾明思议，单词本身有`安排`的意思，因此`Scheduler`可以想像成是`负责安排`的人,具体来说安排什么呢？就是安排`Observable`内`事件`该如何发生的时机点。

一个例子,请思考一下以下代码会以什么样的顺序打印？

```
const {of} = rxjs
console.log('start');
of(1, 2, 3)
  .subscribe({
    next: result => console.log(result),
    complete: () => console.log('complete')
  });
console.log('end');



```

由于`of(1,2,3)`事件是同步执行的，因此结果为

```
/*
start
1
2
3
complete
end
*/
```

那么有没有办法让`of(1,2,3)`变成异步执行呢？我们可以在`of`参数的最后放上一个`Scheduler`来安排数据处理的顺序，以下代码通过`asyncScheduler`来帮助我们将`of(1,2,3)`变成异步的代码

```js
const { asyncScheduler, of } = 'rxjs';

console.log('start');
of(1, 2, 3, asyncScheduler)
  .subscribe({
    next: result => console.log(result),
    complete: () => console.log('complete')
  });
console.log('end');
```

**Different kinds of Scheduler**

`Schduler`按照执行逻辑分成以下几类:

- `null`：也就是不指定`scheduler`，同步执行
- `queueScheduler`:也是同步执行，但在执行Rxjs会将所有同步的`Observable`放到`queue`内，再依次执行，等下我们说明这和`null`有什么区别
- `asapScheduler`:异步执行,与`Promise`一样的异步处理层级，也就是`microtask` 宏任务
- `asyncScheduler`:异步执行，处理方式同`setIntervael`,属于`macrotask`层级 微任务
- `animationFrameScheduler`异步执行，处理方式同`requestAnimationFrame`,也是属于`macrotask`层级，常用来做动画

**一段代码**

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div
      id="block"
      style="
        width: 25px;
        height: 25px;
        position: absolute;
        top: 199px;
        left: 199px;
        background: green;
      "
    ></div>

    <button id="null">null</button>
    <button id="queue">Queue</button>
    <button id="asap">Asap</button>
    <button id="async">Async</button>
    <button id="animationFrame">AnimationFrame</button>
    <script src="https://cdn.bootcdn.net/ajax/libs/rxjs/7.3.0/rxjs.umd.min.js"></script>
    <script>
      const {
        SchedulerLike,
        queueScheduler,
        asapScheduler,
        asyncScheduler,
        animationFrameScheduler,
        fromEvent,
        range,
      } = rxjs;
      //   动画开始重置DOM样式
      const initPosition = () => {
        const blockElement = document.querySelector("#block");
        blockElement.style.left = "100px";
        blockElement.style.top = "100px";
      };

      const updatePositionByScheduler = (scheduler) => {
        initPosition();

        setTimeout(() => {
          console.log("start");

          range(0, 100, scheduler).subscribe({
            next: (val) => {
              const blockElement = document.querySelector("#block");
              blockElement.style.left = 100 + val + "px";
              blockElement.style.top = 100 + val + "px";
            },
            complete: () => console.log("complete"),
          });
          console.log("end");
        }, 300);
      };

      fromEvent(document.querySelector("#null"), "click").subscribe(() => {
        updatePositionByScheduler(null);
      });

      fromEvent(document.querySelector("#queue"), "click").subscribe(() => {
        updatePositionByScheduler(queueScheduler);
      });

      fromEvent(document.querySelector("#asap"), "click").subscribe(() => {
        updatePositionByScheduler(asapScheduler);
      });

      fromEvent(document.querySelector("#async"), "click").subscribe(() => {
        updatePositionByScheduler(asyncScheduler);
      });

      fromEvent(document.querySelector("#animationFrame"), "click").subscribe(
        () => {
          updatePositionByScheduler(animationFrameScheduler);
        }
      );
    </script>
  </body>
</html>

```





![image-20210817234109187](https://gitee.com/zhufengpeixun/zhufeng_-rxjs_202108/raw/master/assets/image-scheduler.png)

**null scheduler**

`range`本身是同步执行的，执行顺序为:

```
start
complete
end
```

**queuescheduler**

`queuescheduler`依然是同步执行,结果与使用`null scheduler一样`，但有差别，等下会讲

**asapScheduler**

`asapScheduler`是异步执行，执行顺序为

```
start
end
complete
```

`asapScheduler`会进入`microtsk`，而`microtask`阶段是不会处理DOM渲染的，从页面看到虽然坐标有更新，但会在最后直接出现在右下角

**asyncScheduler**

`asyncScheduler`异步执行,执行顺序与`asapScheduler`一样。不同的是`asyncScheduler`是使用`macrotask`，DOM渲染行为会发生在每次`macrotask`结束之间，可以看到动画很流畅了...

**animationFrameScheduler**

`animationFrameScheduler`触发的时机与页面重绘(repaint)定义的时机点一样，与我们使用的`requestAnimationFrame`一样，基本上16MS左右执行一次(60HZ,大部分浏览器都是这个频率)，具体看显示器刷新频率.

参考：https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame