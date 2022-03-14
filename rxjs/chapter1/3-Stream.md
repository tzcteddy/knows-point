### What are Stream 什么是流?

流是随着时间变化的值序列，仅此而已。

让我们看一张图

![stream](https://gitee.com/zhufengpeixun/zhufeng_-rxjs_202108/raw/master/assets/stream.gif)

网页中的DOM事件、ajax请求、用户操作等都可以看成是一种流。

### How to control stream in rxjs？

让我们再看一张图：



![stream](https://images.gitee.com/uploads/images/2021/0813/101833_227baac7_1720749.png "stream.png")

上图可以看出，通过订阅`observer`的`next,error,complete`方法来控制流状态，关于`observable`，后续有1个篇幅会细讲，这里对流有了解即可
