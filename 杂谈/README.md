# 面试总结

## 1、什么是外边距重叠？结果是什么？
外边距重叠就是margin-collapse
在CSS中，相邻的两个盒子（可能是兄弟关系，也可能是祖先关系）的外边距可以结合成一个单独的外边距。这种合并外边距的方式被称为折叠，并且因而所结合成的外边距成为折叠外边距。

**折叠结果遵循下列计算规则**
- 两个相邻的外边距都是正数时，折叠结果是它们两者之间较大的值
- 两个相邻的外边距都是负数时，折叠结果是两者绝对值较大的值
- 两个外边距一正一负时，折叠结果是两者相加的和。
## 2、事件委托是什么？
利用冒泡的原理，把事件加到父级上，触发执行效果
## 3、闭包是什么，有什么特性，对网页有什么影响？
函数执行还形成私有作用域，保护里面的变量不受外界干扰，成为闭包。
一个函数返回一个引用数据类型，并且在被外面的变量接受了，形成一个不销毁作用域，这叫闭包。
由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页性能问题，在IE中可能导致内存泄漏，解决方法是，在退出之前，将不使用的局部变量全部删除......null
## 4、如何实现跨域？JSONP的原理？

```js
//前端
function cb(data){
     console.log(data);
}
var oScript=document.createElement("script");
oScript.src="http://localhost:8080/jsonp?callback=cb";
document.body.appendChild(oScript);
//后台
if(pathname=="/jsonp"){
    let arr={s:["爱奇艺","阿里巴巴"]};
    var fnName=query.callback;
    res.setHeader("Content-Type","application/javascript;charset=utf8");
    res.end(fnName+"("+JSON.stringify(arr)+")"+);
}
```
## 5、call和apply、bind的区别？
call和apply方法的作用一模一样，都是用来改变方法的this关键字，并且把方法执行，call在给函数传参是一个一个传，而apply是统一放在一个数组进行操作，其实也是一个个传递
```js
Fn.call(obj,1,2);
Fn.apply(obj,[1,2]);
```
bind这个方法在IE6-8下不兼容，和call和apply都是用来改变this
 Fn.bind(obj,1,2) ;只是改变this，但是没有执行。
预处理：事先把函数的this改变为我们想要的结果，并且把对应的参数准备好，以后要用到了，直接执行即可。

## 6、行内元素和块级元素的区别？

行内元素
- 独占一行，从上至下排布
- 可以设置宽高，可以设置盒子模型的所有属性
- 不设置宽度，宽度是父元素内容的宽度，不设置高度，高度是本身内容的高度
- 可以嵌套其他元素（包括块级元素）p不中。
行内元素
- 不独占一行，从左至右排布
- 不能设置宽高，不能设置内外边距值
- 行内元素只能嵌套行内元素，元素宽高有本身内容撑开。
## 7、JavaScript的数据类型都有什么？
number、string、boolean、null、undefined
## 8、JavaScript的内置类？
Array、Number、String、Object、Date、Math...
## 9、iframe的优缺点？
优点
- iframe能够原封不动的把嵌入的网页展现出来。
- 网页如果为了统一风格，头部和版本都是一样的，就可以写成一个页面，用iframe来嵌套可以增加代码的可重用。
- 如果遇到加载缓慢的第三方内容如图标和广告，这些问题由iframe解决
- 重载页面时不需要重载整个页面，只需要重载页面中的一个框架页。
缺点
- 会产生很多页面，不好管理
- 浏览器的后退按钮无效
- iframe会不利于搜索引擎优化
- 多数小型的移动设备无法完全显示框架，设备兼容性差
## 10、生成5个不同的随机数
```
function onRound()
```
## 11、Ajax的最大特点是什么？
Ajax可以实现异步通信效果，实现页面局部刷新，带来更好的用户体验，按需获取数据，节约带宽资源
## 12、GET和POST的区别 ，何时用POST？
GET，从服务器获取资源
POST，往服务器发送资源
DELETE，告诉服务器删除某一项
HEAD，通知服务器，响应报文中只需返回起始行和首部，不需要返回响应主体。
PUT，往服务器发送数据，和post不一样，put有幂等性。
get
- 没有请求主体（因为它是获取资源）
- 通过问号传参
- 发送参数大小受限制
- 容易被浏览器缓存
- 明文发送
post
- 有请求主体
- 没有大小限制
- 不会被浏览器缓存
## 13、new操作具体干了什么？
new共经历了四个过程

1、创建了一个空对象
    ```var obj=new Object()```

2、设置原型链
    ```obj.__proto__=fn.prototype```

 3、让fn的this指向obj，并执行fn的函数体
     ```var result=fn.call(obj)```

  4、判断fn的返回值类型，如果是值类型，返回obj，如果是引用类型，就返回这个引用类型的对象
```js
  if(typeof(result)=="object"){
    fnObj=result;
}else{
    fnObj=obj;
}
```
## 14、哪些操作会造成内存泄漏？
内存泄漏是指一块被分配的内存既不能使用，又不能回收，直到浏览器进程结束。
垃圾回收器定期扫描对象，并计算引用了每个对象的其他对象的数量。如果一个对象的引用数量为0（没有其他对象引用过该对象），或对该对象的唯一引用是循环的，那么该对象的内存即可回收
## 15、DOM方法
## 16、在JavaScript中什么是伪数组？如何将伪数组转化为标准数组？
伪数组：和数组很像，也有length属性，按索引方式存储数据，但不具备数组的方法
1、```arr=[].slice.call(likeAry)```
2、```for(var i=0;i<likeAry.length;i++){arr.push(likeAry[i]);}```
3、```arr=Array.from(likeAry)```
## 17、jQuery中如何将数组转化为JSON字符换，然后在转化回来？
## 18、在低版本浏览器如何支持HTML5新标签？
1、通过document.createElement()
2、引用html.min.js
## 19、JavaScript原型，原型链，有什么特点？
1、每个函数数据类型包括类都有一个天生的prototype（原型），并且这个属性是一个对象数据类型的值
2、并且在prototype上浏览器天生给它加了一个属性constructor（构造函数），属性值是当前函数（类）的本身。
3、每一个对象数据类型（普通对象，实例，prototype）也天生自带一个属性__proto__,属性值是当前所属类的原型
原型链：通过对象名，属性名的方式获取属性值的时候，首先在对象的私有属性上进行查找，如果私有的有这个属性，获取私有的，如果私有的没有则通过__proto__找到所属类的原型。直到找到Object.prototype，如果依然没有就是undefined
## 20、Zepto的点透问题
点透：你可能碰到过在列表页面上创建一个弹出层，弹出层有个关闭的按钮，你点击了这个按钮关闭弹出层后，这个按钮正下方的内容也会执行点击事件（或打开连接）。这个被定义为一个点透现象。
引入fastclick.js```FastClick.attach(document.body)```
## 21、HTML5有哪些新特性，移除了哪些元素，如何处理HTML5新标签的兼容问题，如何区分HTML和HTML5？
新增标签的优点有助于语义化和SEO
移除的元素：```<big><font><frame><center>```
HTML5新增的语义化标签：header（头部）、footer（尾部）、main（主体）、article（文章）、figure（配图）、figcaption（配图说明）、aside（广告）、nav（导航）、section（区域）
HTML和HTML5区别：
文档类型声明上、在结构语义化上
## 22、http状态码有哪些？分别代表什么意思？
-200 成功
- 301 永久重定向
- 302 临时重定向
- 304 读取缓存数据
- 400 请求参数有误
- 401 无权访问
- 404 请求地址不存在
- 500 未知服务器错误
- 503 服务器超负荷
## 23、如何垂直居中一个浮动元素？
绝对定位元素水平垂直居中：
## 24、什么是JavaScript的同源策略？
URL有协议，域名，端口和路径组成，如果两个URL的协议，域名，和端口相同则表示他们同源，防止其他网页对本网页的非法篡改。
## 25、JavaScript的事件流模型有什么？
1、事件的冒泡：IE的事件流叫做事件冒泡，即事件开始时由最具体的元素接受，然后逐级向上传播到较为不具体的节点
2、事件的捕获：标准浏览器采用事件捕获的思想是不太具体的DOM节点应该更早接受到事件，而最具体的节点应该最后接受到事件
3、DOM事件流：DOM2级事件规定的事件流包括三个阶段：事件捕获阶段、处于目标阶段、事件冒泡阶段。
## 26、四种检测数据类型
1、typeof：
首先返回一个字符串，局限性不能检测null(也是object)和对象数据类型
```
typeof({})//"object"
```
2、instance of：
检测某个实例是否属于某个类
局限性：不能检测字面量方式创建的出来的基本数据类型；只要在当前实例的原型链上，我们我们用其检测出来的结果都为true；在类的继承中最后检测结果未必准确
```
[1,2]instanceof Array;//true
```
3、constructor：和instance of相似，但可以处理字面量创建的
局限性：把类的原型进行重写，在重写的过程中很可能出现之前的constructor的覆盖，这样检测就不准确了
```
[1,2].constructor===Array;//true
```
4、Object.prototype.toString.call();
```
Object.prototype.toString.call([1,2]);//[object Array]
```