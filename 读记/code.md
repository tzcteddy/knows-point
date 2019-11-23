# 代码实现


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
```
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
