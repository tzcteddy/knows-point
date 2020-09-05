## 浅谈vuex

我们一般都这么使用：

### 一、原理
+ Vuex本质是一个对象
+ Vuex有两个属性，install、Store

其中install是将store实例挂在到所有组件；Store类会将传入的state包装成data,作为`new Vue`的参数，有两个方法`commit`、`dispatch`;

### 二、剖析

我们平时会这么使用
```
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex({
    state,
    mutations,
    actions,
    getters,
    modules
})

new Vue({
    store
})
```
根据用法  我们来实现一个雏形
```js
class Store{};
let install=function(){};
let Vuex={
    Store,
    install
};
export default Vuex
```
这样就搭了一个小梯子，接下来一步步向上爬吧！

## 三、Vue.use(vuex)
完善`install`方法,上面说到，install是将store挂载到每个组件上。

```js
let install = function(Vue){
    Vue.mixin({
        beforeCreate(){
            if (this.$options && this.$options.store){ // 如果是根组件
                this.$store = this.$options.store
            }else { //如果是子组件
                this.$store = this.$parent && this.$parent.$store
            }
        }
    })
}
```
+ `Vue`作为参数传给`install`
+ 通过`mixin`将内容混入到`Vue`初始的`options`中
+ 使用`beforeCreate`是因为要在`options`初始之前
+ 判断根组件还是子组件，我们将`store`赋值给组件的`$store`

这里有个问题，为什么判断当前组件是子组件，就可以直接从父组件拿到$store呢？
> A：父beforeCreate-> 父created -> 父beforeMounte  -> 子beforeCreate ->子create ->子beforeMount ->子 mounted -> 父mounted

可以得到，在执行子组件的beforeCreate的时候，父组件已经执行完beforeCreate了，那理所当然父组件已经有$store了。

### 四、Store


```vue
<p>{{this.$store.state.num}}</p>
```
既然再模板中可以通过这个`this.$store.state.num`拿到state的值
```js
{
    state,
    mutations,
    actions,
    getters,
    modules
}
```
上面我们是把这个对象传给Store类的

```js
class Store{
    constructor(options){
        this.state=options.state||{}
    }
}
```
>注意：Vuex和全局变量的区别——响应式

我们优化下
```js
class Store{
    constructor(options){
        this.vm=new Vue({
            data:{
                state:options.state
            }
        })
    }
}
```
现在实现响应式了，但是我们如何获取到state呢？`this.$store.vm.state`？

继续
```js
class Store{
    constructor(options){
        this.vm=new Vue({
            data:{
                state:options.state
            }
        })
    }
    get state(){
        return this.vm.state
    }
}

```

### 五、getters

```js
class Store{
    constructor(options){
        this.vm=new Vue({
            data:{
                state:options.state
            }
        })
        let getters=options.getters||{}
        this.getters = {}
        Object.keys(getters).forEach(getterName=>{
            Object.defineProperty(this.getters,getterName,{
                get:()=>{
                    return getters[getterName](this.state)
                }
            })
        })
    }
    get state(){
        return this.vm.state
    }
}
```
这里使用了`Object.defineProperty的get接口`

### 六、mutations

```js
class Store{
    constructor(options){
        this.vm=new Vue({
            data:{
                state:options.state
            }
        })

        let getters=options.getters||{}
        this.getters = {}
        Object.keys(getters).forEach(getterName=>{
            Object.defineProperty(this.getters,getterName,{
                get:()=>{
                    return getters[getterName](this.state)
                }
            })
        })

        let mutations = options.mutations || {}
        this.mutations = {}
        Object.keys(mutations).forEach(mutationName=>{
            this.mutations[mutationName] = (arg)=> {
                mutations[mutationName](this.state,arg)
            }
        })

    }
    get state(){
        return this.vm.state
    }
}
```
触发mutations,我们使用`this.$store.commit('add',1)`,继续添加commit方法

```js
class Store{
    constructor(options){
        this.vm=new Vue({
            data:{
                state:options.state
            }
        })

        let getters=options.getters||{}
        this.getters = {}
        Object.keys(getters).forEach(getterName=>{
            Object.defineProperty(this.getters,getterName,{
                get:()=>{
                    return getters[getterName](this.state)
                }
            })
        })

        let mutations = options.mutations || {}
        this.mutations = {}
        Object.keys(mutations).forEach(mutationName=>{
            this.mutations[mutationName] = (arg)=> {
                mutations[mutationName](this.state,arg)
            }
        })

    }
    commit:(method,arg)=>{
        this.mutations[method](arg)
    }
    get state(){
        return this.vm.state
    }
}
```
### 七、actions

```js
class Store{
    constructor(options){
        this.vm=new Vue({
            data:{
                state:options.state
            }
        })

        //实现getters
        let getters=options.getters||{}
        this.getters = {}
        Object.keys(getters).forEach(getterName=>{
            Object.defineProperty(this.getters,getterName,{
                get:()=>{
                    return getters[getterName](this.state)
                }
            })
        })

        //实现mutations
        let mutations = options.mutations || {}
        this.mutations = {}
        Object.keys(mutations).forEach(mutationName=>{
            this.mutations[mutationName] = (arg)=> {
                mutations[mutationName](this.state,arg)
            }
        })

        //实现actions
        let actions = options.actions
        this.actions = {}
        Object.keys(actions).forEach(actionName=>{
            this.actions[actionName] = (arg)=>{
                actions[actionName](this,arg)
            }
        })

    }
    dispatch(method,arg){
        this.actions[method](arg)
    }
    commit:(method,arg)=>{
        this.mutations[method](arg)
    }
    get state(){
        return this.vm.state
    }
}
```
和mutations看似一样，但是有个地方不同，actions中接受的是`this`

使用actions
```js
actions: {
    asyncIncre({commit},arg){
        setTimeout(()=>{
          commit('incre',arg)
        },1000)
    }
  },
```


细心的同学会发现，commit方法使用的时箭头函数

我们执行`this.$store.commit()`的时候，`this`指向`$store`

但是执行`this.$store.dispatch('asyncIncre')`的时候，this的指向就发生变化了。

好了，到这一个简单的vuex就实现啦！


