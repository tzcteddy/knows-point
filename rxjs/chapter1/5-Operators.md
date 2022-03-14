### Know Operator

在Rx中`Observable`，控制流的状态,是它的基石，但最有用的是它的`operator`，`operator`允许复杂的异步代码以声明的方式进行轻松组合的基础单元。  `operator`主要作用是操作、组合流中的数据。

> 操作符是函数，它基于当前的 Observable 创建一个新的 Observable。这是一个无副作用的操作：前面的 Observable 保持不变

操作符本质上是一个纯函数 (pure function)，它接收一个 Observable 作为输入，并生成一个新的 Observable 作为输出。订阅输出 Observable 同样会订阅输入 Observable 。



让我们看张图：

![image-20210718144637229](https://gitee.com/zhufengpeixun/zhufeng_-rxjs_202108/raw/master/assets/image-operator.png)

![image-20210718144651885](https://gitee.com/zhufengpeixun/zhufeng_-rxjs_202108/raw/master/assets/image-operator2.png)

