
项目中我们会使用一些element-ui、iview、vuetify等等的UI库，但是我们如何自己封装一个自己的库呢？<br>

### 项目中一般使用组件
组件化的开发，我们经常会采用以下方式进行组件的调用

```js
<template>
    <alert><alert>
</template>
<script>
    import alert from './children/alert/alert';
    export default {
        components:{alert}
    }
</script>
```

### 全局组件的使用
```js
//alert.vue同级下的index.js
import AlertComponent from './alert.vue';
const Alert={
    install:function(Vue){
        Vue.component('alert',AlertConponent);
    }
}
export default Alert
//main.js
import alert from './public/alert/index';
Vue.use(alert)
//App.vue
<template>
 <alert></alert>
</template>
```
上面的方式也是注册了一个全局组件，只不过是使用了Vue的插件形式，但是再组件的挂载上还是通过了标签的形式，有的同时可能注意到，有些UI库我们可以直接使用js进行操作组件

```js
import AlertComponet from './alert.vue';
const Alert = {
    install:function (Vue,option) {
        const AlertInstance=Vue.extend(AlertComponet);
        let alert,alertSpan
        const initInstance=()=>{
            alert=new AlertInstance();
            alertSpan=alert.$mount().$el;//$mount没有参数，模板将被渲染为文档之外的的元素，必须使用原生DOMAPI插入文档
            console.log(alertSpan)
            document.body.appendChild(alertSpan);
        }
        Vue.prototype.$alert={
            alert(option){
                initInstance();
                if(typeof option === 'string'){
                    alert.msg = option;
                  }else if(typeof option === 'object'){
                    Object.assign(alert, option);
                  }
                  return initInstance;
            },
            cancelAlert(){
                console.log(alert.$el)
                document.body.removeChild(alert.$el);//此处不能再使用alert.$mount().$el了
            }
        }
    }
}
export default Alert
//使用
this.$alert.alert('返回成功');//或
this.$alert.alert({msg:"返回成功"})
```