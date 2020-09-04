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

### 



