## 基于vue的微前端

今天基于[vue](https://cn.vuejs.org/),使用[qiankun.js](https://qiankun.umijs.org/zh)实现一个简单微前端项目

### 搭建

我们先快速搭建一个主应用、两个子应用，这里使用vue-cli<br>
`npm install @vue/cli -g`<br>
`vue create pro-base`<br>
`vue create pro-1`<br>
`vue create pro-2`<br>

主应用中安装我们的[qiankun.js](https://qiankun.umijs.org/zh)<br>
`npm install qiankun`

接下里就是实现了。

### 主应用

**APP.vue**

```vue
<template>
  <div><!--不要给属性id="app" 导致你的子应用找不到挂在节点 Target container with #id not existed after app1 mounted!-->
    <div id="nav">
      <router-link to="/app1">APP1</router-link> |
      <router-link to="/app2">APP2</router-link>
    </div>
    <!--子应用的挂在容器-->
    <div id="app1"></div>
    <div id="app2"></div>
  </div>
</template>
```

**main.js**
```js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入两个方法
import {registerMicroApps,start} from 'qiankun'
Vue.config.productionTip = false;
const apps=[
    {
        name:"appProOne",//子应用的名称
        entry:"//localhost:1000",//子应用的入口地址
        container:"#app1",//子应用挂在的容器节点
        activeRule:getActiveRule("/app1")//应用的激活规则(访问到/app1时加载子应用)
    },
    {
        name:"appProTow",
        entry:"//localhost:2000",
        container:"#app2",
        activeRule:"/app2"
    }
]
registerMicroApps(apps,{//这里是生命周期，可取官网查看，这里没使用
    beforeLoad:()=>{},
    beforeMount:()=>{},
    afterMount:()=>{},
    beforeUnmount:()=>{},
    afterUnmount:()=>{}
})
function getActiveRule(routerPrefix){
    return location=>location.pathname.startsWith(`${routerPrefix}`)
}
start()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

```

### 子应用

**APP.vue**

```vue
<template>
  <div id="app">
        我是子应用 1
  </div>
</template>
```

**main.js改造**

```js
let instance = null
function render(props) {
    instance = new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount('#app'); // 这里是挂载到自己的html中  基座会拿到这个挂载后的html 将其插入进去
}
//非独立运行
if(window.__POWERED_BY_QIANKUN__){
    //动态添加publicPath
    __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
//独立运行
if(!window.__POWERED_BY_QIANKUN__){
    render();
}
//导出三个必要方法 均为Promise
export async function bootstrap(props){}
export async function mount(props){render(props)}
export async function unmount(props){
    instance.$destroy();
}
```
**router.js**

```js
const router = new VueRouter({
    mode: "history",
    //改为符合激活规则的路径
    base: '/app1',
    routes
});
```

**vue.config.js**

```js
module.exports = {
    devServer:{
        port:1000,
        headers:{
            // 允许跨域，在主应用中fetch到子应用的静态文件
            'Access-Control-Allow-Origin':'*'
        }
    },
    configureWebpack:{
        output:{
            library:'appProOne',//注意：这个名字是导出的一个全局变量，要和主应用注册APP时的name一样
            libraryTarget:'umd'
        }
    }
}
```


[https://blog.csdn.net/alnorthword/article/details/100527780](https://blog.csdn.net/alnorthword/article/details/100527780)
[https://blog.csdn.net/alnorthword/article/details/100549291](https://blog.csdn.net/alnorthword/article/details/100549291)
[https://blog.csdn.net/alnorthword/article/details/100569485](https://blog.csdn.net/alnorthword/article/details/100569485)
[https://blog.csdn.net/alnorthword/article/details/100676849](https://blog.csdn.net/alnorthword/article/details/100676849)


