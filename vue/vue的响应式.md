## vue的响应式
![响应式](https://cn.vuejs.org/images/mvvm.png?_=5619070)
提到响应式，顺便也提下MVVM(Model-View-ViewModel)

## 数据监听
重点api`Object.defineProperty`

```js
function defineReactive(target,key,value){
    Object.defineProperty(target,key,{
        get(){return value},
        set(newValue){
            if(value!==newValue){
                value=newValue
            }
        }
    })
}
```
以上我们使用`defineProperty`定义了一个响应式的方法，调用`target`对象的`key`属性返回`value`

我们还需要一个监听的方法
```js
function observer(target){
    //不是对象或数组直接返回
    if( typeof target !== 'object' || target === null) return target;
    for(key in target){
        defineReactive(target,key,target[key])
    }
}
```
这样我就完成了一个简单的响应式，使用起来很简单，如下：
```js
let data={
    name:'对点',
    age:12
}
observer(data)
```
这是`data`上的数据都是响应式的了

## 深度监听
如果data上的一个属性的值也是对象呢？我们只监听了一层的属性，我们将代码改造一下
```js
function defineReactive(target,key,value){
    //深度监听
    observer(value);
    
    Object.defineProperty(target,key,{
        get(){return value},
        set(newValue){
            if(value!==newValue){
                value=newValue
            }
        }
    })
}
```
我们把对象的属性值在传给`observer`，如果是对象或数组就监听

+ 深度监听需要递归，一次性计算量大
+ 无法监听新增和删除属性Vue2调用`Vue.set`和`Vue.delete`,Vue3中使用Proxy能解决这问题，但是有兼容性问题

## 数组监听
上面我们对对象进行监听和深度监听，数组的一些变动我们怎么办呢？

重新定义数组

```js
const oldArrayProperty = Array.property;
//创建一个新对象 原型指向oldArrayProperty 此时扩展newArratProperty 不会影响原型
const newArratProperty = Object.create(oldArrayProperty)
['push','pop','shift','unshift','splice'].forEach(methodName=>{
    updataView()//更新视图方法
    newArratProperty[methodName]=function(){
        oldArrayProperty[methodName].call(this,...arguments)
    }
}) 
```

```js
function observer(target){
    //不是对象或数组直接返回
    if( typeof target !== 'object' || target === null) return target;
    if(Array.isArray(target)){
        target.__proto__=newArratProperty
    }
    for(key in target){
        defineReactive(target,key,target[key])
    }
}
```

