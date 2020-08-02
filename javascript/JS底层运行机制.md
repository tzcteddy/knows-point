## JS底层运行机制 

>ECStack（栈内存）、Heap（堆内存）、EC(Execution Context执行上下文)、AO(Active Object)、VO(variable Objec)、GO(Globle Object全局对象)

+ `栈内存(ECStack（Execution Context Stack):执行环境栈)`:浏览器在计算机内存中分配一块内存，专门用来供代码执行(也就是提供代码执行的环境)
+ `全局对象GO(Globle Object)`:它是一个堆内存(Heap)，浏览器把内置的一些属性和方法放一个单独的内存中，浏览器端会让window指向GO即：window =GO
+ `堆内存(Heap)`：存放东西(属性和方法)  `例 isNaN:function...`
+ 任何开辟的内存都有一个16进制的内存地址，方便后期找到这个内存
+ `执行上下文EC(Execution Context)`：在编程语言中，代码执行中，为了区分全局和函数执行所处的不同的作用域（目的是为了区分每个词法作用域下代码的独立性）=>EC(Execution Content)执行上下文：代码执行所在的词 法作用域，或者代码执行所处的范围
+ `变量对象VO(variable Object)`->`活动对象AO(Active Object)变量对象`：在每一个上下文代码执行的时候，都可能会创建变量，所在每一个上下文中(不论是全局还是私有)，都会有一个存储变量的空间：VO(variable Object)->AO(Active Object)变量对象：存放当前上下文中变量的，只不过`全局上下文成为VO(G)`,`私有上下文中称为AO(xx)`,但是也是变量对象.

参考<br>
[js引擎的执行过程（一）](https://heyingye.github.io/2018/03/19/js%E5%BC%95%E6%93%8E%E7%9A%84%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B%EF%BC%88%E4%B8%80%EF%BC%89/)<br>
[js引擎的执行过程（二）](https://heyingye.github.io/2018/03/26/js%E5%BC%95%E6%93%8E%E7%9A%84%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B%EF%BC%88%E4%BA%8C%EF%BC%89/)<br>
[深入理解JavaScript系列（12）：变量对象（Variable Object）](https://www.cnblogs.com/TomXu/archive/2012/01/16/2309728.html)<br>
[js底层运行机制 代码演示 VO/GO](https://blog.csdn.net/wuj1935/article/details/107054522)