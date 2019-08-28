# Event

```js
<script>
//实现bind
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
//实现vue的事件
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
//深拷贝
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
            buf[key]=clone(obj[key])
        }
        return buf;
    }else{
        return obj;
    }
}
//去重
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

//hash路由
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

//工厂模式  可以创建多个相似对象，但是不能识别，不知道对象的类型
function createPerson(name,job){
    var o=new Object();
    o.name=name;
    o.job=job;
    o,sayName=function(){
        console.log(this.name);
    }
    return o;
}
//构造函数模式  没有显示对象  但是可以检测类型  每个方法都要在实例上重建
function Person(name,job){
    this.name=name;
    this.job=job;
    this.sayName=function(){
        console.log(this.name);
    }
}
//原型模式  信息直接添加到原型上，实例可以共享  但是引用类型的值会出现问题  可以组合使用构造函数和原型模式
function Person(){

}
Person.prototype.name='';
Person.prototype.job="";
Person.prototype.sayName=function(){
    console.log(this.name);
}
//构造函数和原型模式
//动态原型模式
function Person(name,job){
    this.name=name;
    this.job=jon;
    if(typeof this.sayName!=='function'){
        Person.prototype.sayName=function(){
            console.log(this.name)
        }
    }
}
//寄生构造函数模式  既是工厂函数使用 new
function Person(name,obj){
    var o=new Object();
    o.name=name;
    o.job=job;
    o.sayName=function(){
        console.log(this.name)
    }
    return o

}
//稳妥构造函数

function Person(name,obj){
    var o=new Object();
    o.name=name;
    o.job=job;
    o.sayName=function(){
        console.log(this.name)
    }
    return o

}


//继承
//原型继承   实例可以修改引用类型值
function Parent(){
    this.name='';
}
Parent.prototype.getName=function(){
    console.log(this.name)
}
function Child(){

}
child.prototype=new Parent();

//call继承  只继承实例方法，原型上的属性方法继承不到
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
//组合继承  上面两种一块用  原型继承的问题就会解决        

</script>
```