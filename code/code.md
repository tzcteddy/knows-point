# 代码实现


## 实现call

```js
Function.prototype.myCall = function(context){
    context =(context === null || context === undefined) ? window : context
    context.fn = this// 其实就等价于 obj.fn = function say(){} 当指向 context.fn 时，say里面的this 指向obj [关键]
    //obj 此时变成 var obj = {name:'innerName',fn:function say(){console.log(this.name)}}
    let args = [...arguments].slice(1) //截取第二个开始的所有参数
    let result= context.fn(...args)//把执行的结果赋予result变量
    delete context.fn //删除执行上下文上的属性 （还原）由var obj = {name:'innerName',fn:function say(){console.log(this.name)}}删除fn
    return result
}
var name = 'outerName'
var obj = {
    name:'innerName'
}
function say(){
    console.log(this.name)
}
say()//outerName     等价于  window.say    this指向window
say.myCall(obj)//innerName
```
## 实现apply

```js
Function.prototype.myApply = function(context){
    context =(context === null || context === undefined) ? window : context
    let result
    context.fn = this
    result = arguments[1] ? context.fn(...arguments[1]) : context.fn()
    delete context.fn
    return result
}
```

## 实现bind
```js
if(typeof Function.prototype.bind==='undefined'){
    Function.prototype.bind=function(thisArgs){
        var fn=this;
        var slice=Array.prototype.slice;
        var args=slice.call(arguments,1);
        return function(){
            fn.apply(thisArgs,args.concat(slice.call(arguments)));
        }
    }
}
```
```js
Function.prototype.myBind = function(context){
    context =(context === null || context === undefined) ? window : context
    let o = Object.create(context)
    o.fn = this
    let args = [...arguments].slice(1)
    let fn= function(){
        o.fn(...args)
    }
    return fn
}
```

## 手写flat

```js
function flatDeep( arr, dep=1 ){
    let ret = []
    for(let i=0;i<arr.length;i++){
        if(Array.isArray(arr[i])){
            dep>0 ? (ret = ret.concat(flatDeep(arr[i],dep-1))):(ret.push(arr[i]))
        }else{
            ret.push(arr[i]) 
        }
    }
    return ret
}
```

## 深拷贝
```js
function clone(obj){
    var buf;
    if(obj instanceof Array){
        buf=[];
        var i=obj.length;
        while(i--){
            buf[i]=clone(obj[i])
        }
        return buf;
    }else if(obj instanceof Object){
        buf={};
        for(var key in obj){
            buf[key]=clone(obj[key]);
        }
        return buf;
    }else{
        return obj;
    }
}
```

```js
export function deepclone(obj, hash = new WeakMap()){
  if(obj == null) return obj; // undefind派生于null 所以这里null和undefind都会被返回
  if(typeof obj !== 'object') return obj; // 简单数据类型直接返回
  if(obj instanceof Date) return new Date(obj); // 日期就返回一个新的日期
  if(obj instanceof RegExp) return new RegExp(obj); // 正则就返回一个新的正则
  if(hash.has(obj)){
    return hash.get(obj); // WeakMap解决循环引用的问题(市面上的深度克隆都是有缺陷的没有考虑循环引用)
  }
  const instance = new obj.constructor(); // 数组和对象的构造函数实例化后能得到一个空的数组和对象，这里就不用再去判断是数组还是对象了
  hash.set(obj, instance); // 制作一个映射表
  for(const key in obj){ // for in 可以遍历数组也可以遍历对象
    if(obj.hasOwnProperty(key)){ // 不拷贝原型链上的属性
      instance[key] = deepclone(obj[key], hash); // 递归拷贝
    }
  }
  return instance;
}
```

## 去重

```js
function qc(ary){
    var obj={};
    for (var i=0;i<ary.length;i++){
        var cur=ary[i];
        if(obj[cur]==cur){
            ary[i]=ary[ary.length-1];
            ary.length--;
            i--;
            continue;
        }
        obj[cur]=cur;
    }
    return ary;
}
```
## 冒泡排序
```js
function mp(ary){
  var flag=false;
  for(var i=0;i<ary.length-1;i++){
    for(var j=0;j<ary.length-1-i;j++){
       if(ary[j]>ary[j+1]){
          var val=ary[j];
          ary[j]=ary[j+1];
          ary[j+1]=val;
          flag=true;
       }
    }
    if(flag){
       flag=false;
    }else{
      break;
    }
  }
  return ary
}
```

## 快速排序
```js
function qs(n){
  if(n.length<=1){
    return n;
  }
  var val=n.splice(0,1)[0];
  var left=[],right=[];
  for(var i=0;i<n.length;i++){
     if(val<n[i]){
       right.push(n[i]);
     }else{
      left.push(n[i]);
     }
  }
  return qs(left).concat(val,qs(right));
}
```
## 波菲那契
```js
Fn(1)=1 Fn(2)=1 Fn(n)=Fn(n-1)+fn(n-2)
//递归实现
function bf(n){
    if(n==1||n==2){
        return 1
    }else{
      return bf(n-1)+bf(n-2)
    }
}
//循环实现
function bf(n){
    var num1=1,num2=1,sum;
    for(var i=3;i<=n;i++){
        sum=num1+num2;
        num1=num2;
        num2=sum;
    }
    if(n==1||n==2){
        return 1
    }
    return sum;
}
```

## URL的解析
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
}
```

## 创建DOM
```js
 function Element(tagName, props, children) {
    if (!(this instanceof Element)) {
      return new Element(tagName, props, children);
    }
    this.tagName = tagName;
    this.props = props || {};
    this.children = children || [];
    this.key = props ? props.key : undefined;

    let count = 0;
    this.children.forEach((child) => {
      if (child instanceof Element) {
        count += child.count;
      }
      count++;
    });
    this.count = count;
  }
  Element.prototype.setAttr = function(node, key, value){
    switch (key) {
      case 'style':
        node.style.cssText = value;
        break;
      case 'value': {
        const tagName = node.tagName.toLowerCase() || '';
        if (tagName === 'input' || tagName === 'textarea') {
          node.value = value;
        } else {
          node.setAttribute(key, value);
        }
        break;
      }
      default:
        node.setAttribute(key, value);
        break;
    }
  };
  Element.prototype.render = function() {
    let _this=this;
    const el = document.createElement(this.tagName);
    const props = this.props;

    for (const propName in props) {
      _this.setAttr(el, propName, props[propName]);
    }

    this.children.forEach((child) => {
      const childEl = (child instanceof Element) ? child.render() : document.createTextNode(child);
      el.appendChild(childEl);
    });

    return el;
  };
```

## 实现vue的事件

```js
var EventEmit=function(){
    this._events={};
}
EventEmit.prototype.on=function(event,cb){
  if(Array.isArray(event)){
        for(var i=0;i<event.length;i++){
           this.on(event[i],cb);
        }
  }else{
    (this._events[event]||(this._events[event]=[])).push(cb);
  }
  return this;
}
EventEmit.prototype.once=function(event,cb){
    function on(){
        this.off(event,cb);
        cb.apply(this,arguments)
    }
    on.fn=cb;
    this.on(event,on);
    return this;
}
EventEmit.prototype.off=function(event,cb){
    if(!arguments.length){//没有参数，全部解绑
        this._event=Object.create(null);
        return this;
    }
    if(Array.isArray(event)){//如果数组循环处理
        for(var i=0;i<event.length;i++){
            this.off(event[i],cb)
        }
        return this;
    }
    if(!cb){//如果没传要解绑对应事件的方法
        this._events[event]=null;
        return this;
    }
    if(cb){
        let cbs=this._events[event];
        let i=cbs.length;
        while(i--){
            if(cb===cbs[i]||cb===cbs[i].fn){
                cbs.splice(i,1);
                break;
            }
        }
        return this;
    }
}
EventEmit.prototype.emit=function(event){
    let cbs=this._events[event];
    let args=Array.prototype.slice.call(arguments,1);
    if(cbs){
        for(var i=0;i<cbs.length;i++){
            cbs[i].apply(this,args);
        }
    }
}
```

## 双向数据绑定原理
```js
var obj={};
var val;
Object.defineProperty(obj,value,{
    get(){
        return val;
    }
    set(newVal){
        val=newVal;
    }
})
```

## hash路由
```js
class RouterClass{
    constructor(){
        this.isBack=false;
        this.routes={};
        this.currentUrl='';
        this.historyStack=[];
        window.addEventListener('load',()=>{this.render()});
        window.addEventListener('hashchange',()=>{this.render()});
    }
    static(){
        window.Router=new RouterClass();
    }
    route(path,cb){
        this.routes[path]=cb||function(){};
    }
    render(){
        if(this.isBack){
            this.isBack=false;
            return
        }
        this.currentUrl=location.hash.slice(1)||'/';
        this.historyStack.push(this.currentUrl);
        this.routes[this.currentUrl]();
    }
    back(){
        this.isBack=true;
        this.historyStack.pop();
        const {length}=this.historyStack;
        if(!length)return;
        let pre=this.historyStack[length-1];
        location.hash=`${pre}`;
        this.currentUrl=pre;
        this.routes[pre]()
    }
}
```
## 获取对象层级的值 obj.key.key
```js
const bailRE = /[^\w.$]/;
function parsePath (path: string): any {
  if (bailRE.test(path)) {
    return
  }
  const segments = path.split('.')
  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}

```

## 几种设计模式

### 工厂模式  可以创建多个相似对象，但是不能识别，不知道对象的类型
```js
function createPerson(name,job){
    var o=new Object();
    o.name=name;
    o.job=job;
    o,sayName=function(){
        console.log(this.name);
    }
    return o;
}
```
### 构造函数模式  没有显示对象  但是可以检测类型  每个方法都要在实例上重建
```js
function Person(name,job){
    this.name=name;
    this.job=job;
    this.sayName=function(){
        console.log(this.name);
    }
}
```

### 原型模式  信息直接添加到原型上，实例可以共享  但是引用类型的值会出现问题  可以组合使用构造函数和原型模式
```js
function Person(){

}
Person.prototype.name='';
Person.prototype.job="";
Person.prototype.sayName=function(){
    console.log(this.name);
}
```
### 构造函数和原型模式
### 动态原型模式
```js
function Person(name,job){
    this.name=name;
    this.job=jon;
    if(typeof this.sayName!=='function'){
        Person.prototype.sayName=function(){
            console.log(this.name)
        }
    }
}
```
### 寄生构造函数模式  既是工厂函数使用 new

```js
function Person(name,obj){
    var o=new Object();
    o.name=name;
    o.job=job;
    o.sayName=function(){
        console.log(this.name)
    }
    return o

}
```
### 稳妥构造函数
```js
function Person(name,obj){
    var o=new Object();
    o.name=name;
    o.job=job;
    o.sayName=function(){
        console.log(this.name)
    }
    return o

}
```

## 继承

### 原型继承   实例会修改引用类型值
```js
function Parent(){
    this.name='';
}
Parent.prototype.getName=function(){
    console.log(this.name)
}
function Child(){

}
child.prototype=new Parent();
```

### call继承  只继承实例方法，原型上的属性方法继承不到
```js
function Parent(){
    this.name='';
}
Parent.prototype.getName=function(){
    console.log(this.name)
}
function Child(){
    Parent.call(this);
    this.name=''
}
```
### 组合继承  上面两种一块用  原型继承的问题就会解决        


```
```
### html 转译

```js
// 转义
        Vue.prototype.encodeHtml = function(str){
          if(str){
            return str.replace(/[<>&"]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c];});
          }
        }
        // 反转义
        Vue.prototype.decodeHtml = function(str){
          if(str){
            var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
            return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
          }
        }
        // 去掉HTML标签
        Vue.prototype.removeHtmlTag = function(str){
          return str.replace(/<\/?.+?>/g,"")
        }

```

### Promise链式调用
```js
Promise.resolve().then(()=>fn1()).then(()=>fn2());
function chainPromise(fns){
  fns=Array.isArray(fns)?fns:[fns];
  return (props)=>{
    fns.reduce((p,fn)=>{return p.then(()=>fn(props))},Promise.resolve())
  }
}
```

### 函数柯理化
```js
const curring=(fn,arr=[])=>{
  let len=fn.length;
  return function(...args){
    let newArgs=[...arr,...args];
    if(newArgs.length==len){
      return fn(...newArgs)
    }else{
      return curring(fn,newArgs)
    }
  }
};
function sum(a,b,c,d,e,f,g){
  return a+b+c+d+e+f+g
}
let s=curring(sum)
s(1)(2,3,4,5,6)(7)
```

### 函数执行前

```js
Function.prototype.before=function(callback){
  return (...args)=>{
      callback();
      this(...args)
  }
}
function fn(...args){
  console.log('fn',...args)
};
fn.before(()=>{
  console.log('before fn')
})
```

### 手写instenceof

```js
function myInstanceof(left,right){
    let proto = left.__proto__
    let prototype = right.prototype
    while(true){
        if(proto === null)return false
        if(proto === prototype)return true
        proto = proto.__proto__
    }
}
console.log(myInstanceof([],Array))// true
console.log(myInstanceof('',Array))// false
```

## requestIdleCallback
```js
var requestIdleCallback = window.requestIdleCallback || function requestIdleCallback(cb) {
  var start = Date.now();
  return setTimeout(function () {
    cb({
      didTimeout: false,
      timeRemaining: function timeRemaining() {
        return Math.max(0, 50 - (Date.now() - start));
      }
    });
  }, 1);
};
```

## 获取dom节点数量 最大嵌套层级，最大子元素个数
```js
function getDomInfo(root){
   root=root||document.documentElement
  let childrens=[...root.childNodes].filter(node=>node.nodeType===1);
  let totalElementCount=0,maxDomTreeDepth=0,maxChildrenCount=0;
  totalElementCount+=childrens.length;
  if(childrens.length){
    childrens.forEach(node=>{
      totalElementCount+=getDomInfo(node)
  })
  }
  
  return totalElementCount
}
function getMaxNestLevel() {
    var i = 1, sel = '* > *'; /* html > body is always present */
    while(document.querySelector(sel)) {
        sel += ' > *';
        i++;
    }
    return i;
}
```