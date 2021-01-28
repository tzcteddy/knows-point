# 为什么CSS动画应用到新创建dom不起作用

给弹框添加一个动画效果，你怎么做？首先肯定会想到css的动画属性，但是只给了属性真的就成功了吗？

试过的同学会发现，当触发事件后弹框出现，但是动画效果却没有😮

`transition`，过渡动画属性，既然是过渡，就是有始有终，从一个属性 过渡 到另一个属性

`entry`类名定义了初始状态， `entry-action`定义了动画，`entry-to`定义了动画结束时的状态，我们看下面这段代码

```js
  this.popDev.classList='entry entry-active';
  document.body.appendChild(this.popDev);
  this.popDev.classList="entry-active entry-to";
```

这段代码其实动画不会生效，**js执行进程和浏览器渲染进程互斥（体现到这里就是DOM插入和CSS样式操作会合并计算）**，这可以理解为浏览器的一种优化策略

执行到`appendChild`浏览器并没有将真实的DOM元素绘制到网页上，代码执行结束后浏览器再将已经赋予css样式的DOM元素绘制到网页上，所以尽管设置了初始状态，但最后绘出了结束时的状态，动画无效。

如何让DOM有一个初始状态呢，`强制触发页面回流`

```js
  this.popDev.classList='entry entry-active';
  document.body.appendChild(this.popDev);
  this.popDev.scrollTop;
  this.popDev.classList="entry-active entry-to";
```
代码执行到`this.popDev.scrollTop;`，页面回流被强制触发：js代码的运行被中断，同时浏览器调用渲染进程将新创建的DOM元素添加到页面上。

此时被渲染到页面上的DOM元素已经具备了一个已有的初始状态。继续执行动画也就生效了。

关于`强制触发页面回流`课查看[了解回流和重绘](杂谈/了解回流和重绘)

当然也可以使用定时器，其实是一个道理（即强行阻止浏览器将DOM操作合并，对这两个操作进行拆分），vue的transition组件使用`requestAnimationFrame`来实现的具体可参考[transition组件原理](/vue/transition组件原理)



