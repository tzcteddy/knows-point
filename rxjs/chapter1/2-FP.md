### What's Function Programming 什么是FP?

>  FP就像Object-oriented-Programming(OOP)一样，一种写代码的方法论，这些方法论告诉我们如何思考及解决问题

简单来FP核心思想就是做运算处理，并用function来思考问题,例如下面这个例子

```javascript
(3+8) - 1*9
// 可以这样写
const add =(a,b)=> a + b
const mul = (a,b)=> a * b
const sub = (a,b) => a - b
sub(add(3,8),mul(1,9))
```

我们把每个运算包成一个个不同的function，并用这些function组合出我们想要的结果，这就是最简单的FP

### FP Basic Condition 满足FP的基础条件

跟OOP 一样不是所有的语言都支持FP，要能够支持FP的语言至少要符合函数一等公民的特性

#### First Class 函数一等公民

一等公民简单来说函数能够被赋值给变数，函数也能够被当作参数传入另一个函数，也可以当作一个函数的返回值

##### 函数能够赋值给变量

```javascript
const hello = ()=> //...
```

##### 函数能被当作参数传入

```javascript
function timeoutHandler(){
  //...
}

setTimeout(timeoutHandler)
```

##### 函数能被当作值返回

```javascript
const hello = () => ()=> //...
```

### FP Important Features FP重要特性 

> FP 都是表达式(Expression)，不会是陈述式(Statement)

表达式是一个运算过程，一定会有返回值，例如执行一个function

```javascript
add(1,2)
```

陈述式则是表现某个行为，例如一个赋值给一个变量

```javascript
const x = 1
```

> 有时候表达式也可能同时是合法的陈述式，这里只讲基本的判断方法，如果想更深入了解其中的差异，可以参考以下文章

https://2ality.com/2012/09/expressions-vs-statements.html

https://maksimivanov.com/posts/statements-expressions-js/

由于FP最早就是为了做运算处理不管I/O，而Statement通常属于对系统I/O的操作，所以FP很自然的不会是Statement。

> 当然实际中不可能完全没有I/O的操作，FP只要求对I/O操作限制到最小，不要有不必要的I/O行为，尽量保持运算过程的单纯

### Pure Function 纯函数

PF是指一个function给相同的参数，永远会返回相同的返回值，并且没有任何显著的副作用(Side Effect)

```
const arr = [1,2,3,4,5]
arr.slice(0, 3) // [1,2,3]
arr.slice(0, 3) // [1,2,3]
arr.slice(0, 3) // [1,2,3]
```

这里可以看到slice不管执行几次，返回值都是相同的，并且除了返回一个值(Value)之外并没有做任何事，所以`slice`就是一个pure function

```
const arr = [1,2,3,4,5]
arr.splice(0, 3) // [1,2,3]
arr.splice(0, 3) // [4,5]
arr.slice(0, 3) // []
```

这里我们换成用`splice`，因为`splice`每执行一次就会影响`arr`的值，导致每次结果都不同，这就很显不是一个`pure function`

### Side Effect 副作用 

Side Effect是指一个function做了跟本身运算返回值没有关系的事，比如说修改某个全局变量，或是修改传入参数的值，甚至是执行`console.log`都算是Side Effect

FP强调没有Side Effect，也就是function要保持纯粹，只做运算并返回一个值，没有其他额外的行为。

### **Referential Transparency** 函数的引用透明性

上面提到的`Pure Function`不管外部环境如何，只要参数相同，函数行执行的返回结果必定相同。这种不依赖任何外部状态，只依赖于传入的参数的特性也称为引用透明(Referential Transparency)

### 利用参数保存状态

如果你使用过Redux应该会知Redux的状态是由各个reducer所组成的，而每个reducer的状态就是保存在参数中

```
function counter(state = 0, action){
// ....
}
```

如果你不熟悉reducer，可以看这个例子

```
function findIndex(arr, predicate, start = 0) {
    if (0 <= start && start < arr.length) {
        if (predicate(arr[start])) {
            return start;
        }
        return findIndex(arr, predicate, start+1);
    }
    return -1
}
findIndex(['a', 'b'], x => x === 'b'); // 找数组中 'b' 的 index
```

这里的findIndex用来查找数组中的元素位置，我们在`findIndex`中故意多加了一个参数用来保存当前找到第个几index的状态，这就是利用参数保存状态！

### FP Advantage FP 优势

> 可维护性

因为Pure Function等特性，执行结果不依赖外部状态，且不会对外部环境有任何操作，使Functional Programming能更好的除错及编写单元测试

> 可读性

当我们通过一系列的函数链式操作过程，代码能变得非常简洁，例如:

```
[2,1].concat([7,4,3,5]).sort().filter(x => x > 3) // 先升序然后过滤出大于3的数
```

> 易于并行/平行处理

FP易于做并行/平行(Concurrency/Parallel)处理，因为我们基本上只做运算不碰I/O，再加上没有Side Effect的特性，所以不用担心deadlock等问题

