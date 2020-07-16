## 给vue定义全局方法
>我们有两种方式：1、挂到vue的prototype上；2、使用mixin,因为mixin里面的methods会和创建的每个单文件组件合并。这样做的优点是调用这个方法的时候有提示;3、插件的方法；

### 通过prototype

```js
Vue.prototype[key]=value
```

### 通过mixin
```js
Vue.mixin(mixin)
new Vue({
    store,
    router,
    render:h=>h(App)
}).$mount('#app')

//minxin
export default{
    data:(){
        return {

        }
    },
    methods:{

    }
}
```

### 插件
```js
Vue.use(plugin)

//plugin
export default{
    install(Vue,options){
        Vue.prototype.$factory = factory
    }
}
```
