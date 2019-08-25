# ECMAScript

JavaScript ( JS ) 是一种具有函数优先的轻量级，解释型或即时编译型的编程语言。

JavaScript 是一种基于原型编程、多范式的动态脚本语言，并且支持面向对象、命令式和声明式（如函数式编程）风格。

## 基本数据类型
null、undefined、number、string、boolean

## 运算符

## 作用域和闭包


## 字符串

### 属性
- String.length

### 方法

- charAt() 获取指定索引位置的字符,如果索引超出范围返回空字符串，数组会返回undefined
- charCodeAt() 获取指定索引位置字符对应的ASCII值（Unicode）编码
- substr(n,m) 从索引n开始，截取m个字符
- substring(n,m) 从索引n开始，找到索引m处，不包含m
- slice() 从索引n开始找到索引m处，不包含m,支持负数作为索引（str.length+负数索引）,如果前面索引是负数，后面的m不能为0,只写n，没有m，代表从n截取末尾位置
- indexOf() 兼容所有浏览器,如果没有这个字符返回-1
- toLowerCase() 转为小写
- toUpperCase() 转为大写
- replace() 第二个参数也可以是一个函数，用函数的返回值替换前面的值,在不使用正则的情况下每次调用方法只能执行一次
- search() 用来查找字符的，和indexOf一样
- match() 匹配字符的，找到就把找到的内容以数组的形式返回，找不到返回nul
- split() 将字符串按照指定分隔符分成数组,参数也可以是正则
- trim() 方法会从一个字符串的两端删除空白字符。
- localeCompar()  字符排序

```js
"a".localeCompar("b");//-1
```

## 数组
 
### 属性
- Array.length

### 方法
- Array.from() 方法从一个类似数组或可迭代对象中创建一个新的，浅拷贝的数组实例。

```js
console.log(Array.from('foo'));
// expected output: Array ["f", "o", "o"]

console.log(Array.from([1, 2, 3], x => x + x));
// expected output: Array [2, 4, 6]
```
- Array.isArray() 用于确定传递的值是否是一个 Array。
- Array.of() 方法创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型

- push() 方法将一个或多个元素添加到数组的末尾，并返回该数组的新长度。
- pop() 方法从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度。
- unshift() 方法将一个或多个元素添加到数组的开头，并返回该数组的新长度(该方法修改原有数组)。
- shift() 方法从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度。
- splice()  方法通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组
- slice() 方法返回一个新的数组对象，这一对象是一个由 begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括end）。原始数组不会被改变。
- sort() 方法用原地算法对数组的元素进行排序，并返回数组。默认排序顺序是在将元素转换为字符串，然后比较它们的UTF-16代码单元值序列时构建的

```js
 ary.sort(function(item1,item2){
    return (item-item2)
 })
```
- reverse() 方法将数组中元素的位置颠倒，并返回该数组。该方法会改变原数组
- concat() 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。
- join()  方法将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串。如果数组只有一个项目，那么将返回该项目而不使用分隔符。
- forEach() 方法对数组的每个元素执行一次提供的函数
- filter() 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。 
- find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。
- map() 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。
- every() 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。
- some() 方法测试是否至少有一个元素可以通过被提供的函数方法。该方法返回一个Boolean类型的值。
- includes() 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。
- reduce() 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。
- indexOf() 方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。
## 对象

### 方法
- Object.assin() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
- Object.creat()
- Object.defineProperty(obj, prop, descriptor) 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。
- object.defineProperties(obj, props) 方法直接在一个对象上定义新的属性或修改现有属性，并返回该对象。

```js
    var obj = {};
    Object.defineProperties(obj, {
    'property1': {
        value: true,
        writable: true
    },
    'property2': {
        value: 'Hello',
        writable: false
    }
    // etc. etc.
});
```
- Object.entries() 方法返回一个给定对象自身可枚举属性的键值对数组
- Object.freeze() 方法可以冻结一个对象。一个被冻结的对象再也不能被修改；
- Object.getProptotypeOf() 方法返回指定对象的原型
- Object.is() 方法判断两个值是否是相同的值。
- Object.keys() 法会返回一个由一个给定对象的自身可枚举属性组成的数组

### 属性描述符
 **数据描述符和存取描述符均具有**

**configurable**
当且仅当该属性的 configurable 为 true 时，该属性**描述符**才能够被改变，同时该属性也能从对应的对象上被删除。默认为 false。

**enumerable**
当且仅当该属性的enumerable为true时，该属性才能够出现在对象的枚举属性中。默认为 false

**数据描述符同时具有以下可选键值**

**value**
该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。默认为 undefined。

**writable**
当且仅当该属性的writable为true时，value才能被赋值运算符改变。默认为 false。

**存取描述符同时具有以下可选键值**

**get**
一个给属性提供 getter 的方法，如果没有 getter 则为 undefined。当访问该属性时，该方法会被执行，方法执行时没有参数传入，但是会传入this对象（由于继承关系，这里的this并不一定是定义该属性的对象）。默认为 undefined。

**set**
一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。当属性值修改时，触发执行该方法。该方法将接受唯一参数，即该属性新的参数值。
默认为 undefined。

**描述符可同时具有的键值**

| 描述符 | configurable | enumerable  | value | writable | get | set |
| :-------- | --------:|
| 数据描述符  | Yes | Yes | Yes | Yes | No | No |
| 存取描述符  | Yes | Yes | No | No | Yes | Yes |

如果一个描述符不具有value,writable,get 和 set 任意一个关键字，那么它将被认为是一个数据描述符。如果一个描述符同时有(value或writable)和(get或set)关键字，将会产生一个异常。

## 正则


@(基础)

### 正则表达式基础
1、RegExp：内置类
2、创建正则：字面量创建、实例创建

```js
//字面量创建
var reg = //;
//实例创建
var reg = new RegExp();
```
3、作用：专业处理字符串
- 1验证：test ->验证字符串是否符合正则制定的规则，返回布尔值
- 2捕获：exec ->把符合规则的字符串捕获

```js
var reg = /a/;//只要字符串中包含一个字母a就可以，区分大小写
var reg = /ab/;//在字符串中出现连续的ab
```
4、特殊意义的元字符：

```js
\d ://0-9中的一个数字
\w ://数字、字母、下划线中的一个
\s ://匹配空格空白 tab等
\b ://边界，不一定是开始和结束，空格两边，“-两边”也是边界
\n ://换行
. ://任意字符
\ ://转译字符
\. ://点本身，通过转译字符把代表任意字符串的点变成本身
\D ://除了\d
\W ://除了\w
\S ://除了\s
^ ://以...开始
$ ://以...结束
ps: /^\d\d$/=>要求字符串以数字开始，以数字结束，并且只能是两位
ps: \b ^ $都不占位
```
5、量词（内容连续出现）

```js
+ ://1到多次
* ://0到多次
? ://0到1次
{n} ://出现n次
{n,} ://至少出现n次
{n,m} ://至少出现n次，最多出现m次
ps:修饰前面的元字符出现的次数
```
有效数字的验证

```js
var reg=/^-?\d+(\.\d+)?$/
```

6、正则表达式中的或者关系

```js
/x|y|z/  //x或者y或者z中的一个，使用或者关系的时候我们可以加小括号来改变优先级。
/[xyz]/  //x或者y或者z中的一个，这个或者关系占一位。
/[.]/   //“.”本身
/[^xyz]/  //除了x或者y或者z，取非，只要字符串中有一个字符不是x不是y不是z
/[a-z]/   //a到z中的任意一个

```
7、问号？的用法

```js
1、量词 0-1次
2、放在量词后  \d+?尽可能少的去匹配
3、（?:  ）分组中，匹配不捕获，破坏分组
4、?= 正向预查 只能是...
5、?! 负向预查 不能是...
```

### 字面量方式和实例方式
1、什么时候使用实例
  - 1、需要变量来实现正则，只能用实例
  - 2、实例创建方式i m g 是第二个参数
  - 3、new RegExp("\\w","i")  ==>/\w/i
  - 4、第一个参数可以使用变量和字符串拼接

2、i/m/g（实例方式的第二个参数）
- i :  ignoreCase 忽略大小写
- m  :  multiLine   多行匹配，不常用
- g  :  global   全局全文匹配

例子
```js
//第一
var str="name";
var reg=new RegExc(str);
reg.test(str);//返回true
//第二
var reg=/\d/ /*等=>价*/reg=new RegExp("\\d")
var reg=/d/  /*等=>价*/reg=new RegExp("\d")
```

### 正则捕获

**exec**

1、捕获的结果是一个数组

```js
[捕获结果， index，input]// index->开始索引/input->原有字符串
```
2、如果要把全部符合要求的都捕获到，需要全文g，每次只捕获到一个，如果加了全文g，就会向后捕获了

3、如果没有捕获到结果那么返回null

 PS
 - 1、reg.lastIndex -> 下一次捕获从哪个索引开始就取决这个属性。还可以重新复制
 - 2、test和exec方法都可以改变reg.lastIndex属性
 -3、lastIndex属性当捕获为null，test为false的时候，lastIndex的值被赋值为0，如果没有g那么这个lastIndex的值每次都是0.


下面是一段一次性把所有符合要求的全部捕获到 ->当捕获结果为null的时候
```js
var reg=/\d+/g;
var str="z2016f2017p2018x";
var ary=[];
var res=reg.exec(str);
while(res){//捕获结束再捕获res就是null
  ary.push(res[0]);
  res=reg.exec(str);
}
console.log(ary);
```
### 分组和分组的引用

1、在正则中用()包起来的部分就会形成一个分组，这个分组在捕获的时刻还会参与捕获。把分组捕获到的内容从第二项开始依次排列。

2、这个分组还可以在正则中引用\1 \2 \n...分组引用。

3、在分组括号开始前面"?:"就会取消这个分组，只匹配不捕获

字符串中和正则相关的方法

**split** 

当和正则一起使用的时候，把符合正则的部分全部拆分
```js
var str="a-b-c%d";
console.log(str.split(/-|%/));
//["a","b","c","d"]
```
**match**

**match和exec捕获的区别**
- 1、如果不存在g捕获的结果一样
- 2、如果存在g那么match一次性把所有符合要求的全部捕获到，而exec需要捕获多次
```js
var str="z2016f2017p2018x";
//不带g的情况
var reg=/\d+/;
console.log(reg.exec(str));
//["2016", index: 1, input: "z2016f2017p2018x"]
console.log(str.match(reg));
//["2016", index: 1, input: "z2016f2017p2018x"]
//带g的情况
var reg=/\d+/g;
console.log(reg.exec(str));
//["2016", index: 1, input: "z2016f2017p2018x"]
console.log(str.match(reg));
//["2016", "2017", "2018"]
```
**match和exec分组的区别**

- 1、如果正则中存在分组，那么exec方法的捕获结果会发生改变，在数组中的第二项开始是第一个分组捕获到的的内容，以此类推.......

- 2、如果使用match方法，那么再捕获的过程中存在g的情况下，就获取不到分组
```js
var str="z2016f2017p2018x";
//不存在g的情况
var reg=/(\d+)/;
console.log(reg.match(str));
//["2016", "2016", index: 1, input: "z2016f2017p2018x"]
console.log(str.match(reg));
//["2016", "2016", index: 1, input: "z2016f2017p2018x"]
//存在g的情况
var reg=/(\d+)/g;
console.log(reg.match(str));
//["2016", "2016", index: 1, input: "z2016f2017p2018x"]
console.log(str.match(reg));
//["2016", "2017", "2018"]
```
如果有分组并且还想获取分组的内容，就使用exec，如果不获取分组一次性捕获到所有结果使用match

**replace**
- 1、返回一个新的替换后的字符串
- 2、第一个参数是reg，第二个参数是函数

 例如：str.replace(reg,functoin (){})
  - 1)函数执行的次数取决于正则reg成功匹配多少次
  - 2)使用函数每次执行的返回值return来的替换正则每次匹配到的内容
  - 3)打印arguments类数组：
       + arguments[0]:每次大正则匹配到的内容
       +  arguments[1]:第一个分组匹配到的内容
       + arguments[n]:第n个分组匹配到的内容
       + arguments[length-2]:index
       + arguments[length-1]:input

  - 4) str.replace(reg,"$1")
        + 当使用"\$1"这样的字符串来替换reg的时候，如果正则中存在第一个分组，那么是使用分组的内容来替换。如果不存在就还是"$1"字符串本身
        + 任何一个正则只要执行完捕获等操作就已经把第一个分组的内容添加到RegExp.\$1...$9的属性上一份，不兼容！



### 案例
格式化时间字符串
```js
String.prototype.myFormatTime = function (template) {
    template = template || '{0}年{1}月{2}日 {3}时{4}分{5}秒';
    let ary = this.match(/\d+/g);
    template = template.replace(/\{(\d)\}/g, function () {
        let index = arguments[1],
            num = ary[index] || '00';
        num.length < 2 ? num = '0' + num : null;
        return num;
    });
    return template;
};
```
从URL中解析出键值对和HASH值
```js
String.prototype.myQueryURLParameter = function () {
    var reg = /([^?=#&]+)=([^?=#&]+)/g,
        obj = {};
    this.replace(reg, function () {
        obj[arguments[1]] = arguments[2];
    });
    //->GET HASH
    reg = /#([^?=#&]+)/;
    this.replace(reg, function () {
        obj['HASH'] = arguments[1];
    });
    return obj;
};
```
替换大小写
```js
  var str = '2342345'; //=> "玖捌柒壹贰"  1234 => '壹贰叁肆'
    var str1 = '零壹贰叁肆伍陆柒捌玖';
    str = str.replace(/(\d)/g,function (){
        arguments; // ['9','9',0,'98712']
        arguments; // ['8','8',1,'98712']
        arguments; // ['7','7',2,'98712']
        arguments; // ['1','1',3,'98712']
        arguments; // ['2','2',4,'98712']
        return str1.charAt(arguments[0]);
    });
    //console.log(str);
```
## 类型检测

1、typeof：
首先返回一个字符串，局限性不能检测null(也是object)和对象数据类型
```js
typeof({})//"object"
```
2、instance of：
检测某个实例是否属于某个类
局限性：不能检测字面量方式创建的出来的基本数据类型；只要在当前实例的原型链上，我们我们用其检测出来的结果都为true；在类的继承中最后检测结果未必准确
```js
[1,2]instanceof Array;//true
```
3、constructor：和instance of相似，但可以处理字面量创建的
局限性：把类的原型进行重写，在重写的过程中很可能出现之前的constructor的覆盖，这样检测就不准确了
```js
[1,2].constructor===Array;//true
```
4、Object.prototype.toString.call();
```js
Object.prototype.toString.call([1,2]);//[object Array]
```
