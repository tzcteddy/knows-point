# var、let和count

## 一、var声明的变量会挂在window上，let和const 不会

```js
var a=2;
console.log (a,window.a);//2 2

let b=2;
console.log(b,window.b);//2 undefined

const c=2;
console.log(c,window.c);//2 undefined
```
## 二、var存在变量提升
```js
console.log(a);//undefined
var a=2;

console.log(b);//报错 b is not defined
let b=2;

console.log(c);//报错 c is not defined
const c=2;
```
## 三、let和const 声明形成块作用域
```js
if(1){
    var a = 100;
    let b = 10;
}

console.log(a); // 100
console.log(b)  // 报错：b is not defined  ===> 找不到b这个变量

if(1){

    var a = 100;
        
    const c = 1;
}
 console.log(a); // 100
 console.log(c)  // 报错：c is not defined  ===> 找不到c这个变量
```
## 四、同一作用域下let和const不能声明同名变量，而var可以
```js
var a = 100;
console.log(a); // 100

var a = 10;
console.log(a); // 10

let a = 100;
let a = 10;

//  控制台报错：Identifier 'a' has already been declared  ===> 标识符a已经被声明了。
```
## 五、暂存死区
```js
var a = 100;

if(1){
    a = 10;
    //在当前块作用域中存在a使用let/const声明的情况下，给a赋值10时，只会在当前作用域找变量a，
    // 而这时，还未到声明时候，所以控制台Error:a is not defined
    let a = 1;
}
```
## 六、const

* 　　1、一旦声明必须赋值,不能使用null占位。
* 　　2、声明后不能再修改
* 　　3、如果声明的是复合类型数据，可以修改其属性