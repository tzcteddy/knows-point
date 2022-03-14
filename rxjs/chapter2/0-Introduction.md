### Chapter 2 Introduction

> 本章介绍在 Rxjs 中常用的`Operators`操作符以及如何自定义一个`Operator`
>
> 本章节介绍的操作符，有可能在未来Rxjs8中弃用，不过rxjs8还未发布....

#### What are Operators?

在 1.5 章节中介绍过`Operator`，这里不再做过多解释。

**本章介绍的操作符类型**

- Creation Operators 创建操作符

- Transformation Operators 转换操作符

- Combination Operators 组合操作符

- Filtering Operators 过滤操作符

- Multicasting Operators 多播操作符

  

> 当然，本章不会介绍所有的操作符，会列举一些常见的。

### Marble diagrams 弹珠图

Rxjs 中增加了时间维度的考量，而赋予这一功能的正是各种`Opeartor`。要解释这些`Operator`是如何工作的，弹珠图比文字更能描述清楚，一图胜千字...

我们把描述`Observalbe`的图形称为`Marble diagrams`，在网络上有非常多的`Marble diagrams`，规则大致上都是相同的，这里采用类似`ASCII `的绘制方式。

我们用`-`表示一小段时间，这些`-`串起来代表一个 observable

```
--------
```

`X` 大写`X`代表有错误发生

```
----X
```

`|` 代表 Observable 结束

```
------|
```

**First Example**

```
const asyncSource = interval(1000)
```

asyncSource 图形就会像这样

```
----0----1----2----3--...
```

```
const syncSource = of(1,2,3)
```

syncSource 图形就会像这样

```
(123)|
```

小括号代表着同步发生

**Second Example**

```
const asyncSource = interval(1000)
const newSource = asyncSource.pipe(map(x => x + 1))
```

这种前后转换的图形，就会像这样

```javascript
asyncSource: ----0----1----2----3--...
            		map(x => x + 1)
newSource: 	 ----1----2----3----4--...

```

Marble diagrams 相关资源

- https://rxmarbles.com/
