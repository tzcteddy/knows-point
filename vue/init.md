# vue
+ 你知道vue的模板语法用的是哪个web模板引擎的吗？说说你对这模板引擎的理解

        Vue的模板引擎使用Mustache的语法

+ 你知道v-model的原理吗？说说看

        <input v-model="sth" />
        //  等同于
        <input :value="sth" @input="sth = $event.target.value" />
        :value中sth=>value 
        @input中value=>sth
        也就是所谓的双向数据绑定
        语法规则：属性必须为value，方法名必须为：input。缺一不可。
        自定义组件实现v-model,
        使用$emit('input',)

+ 你有使用过vue开发多语言项目吗？说说你的做法？

       vue-i18n 重新获取语言包

+ 在使用计算属性的时侯，函数名和data数据源中的数据可以同名吗？

        

+ vue中data的属性可以和methods中的方法同名吗？为什么？，一样会出现什么问题
    不能重名  出现覆盖情况
+ 怎么给vue定义全局的方法？
+ vue2.0不再支持v-html中使用过滤器了怎么办？
    - 使用methods方法
    - 使用computed
+ 怎么解决vue打包后静态资源图片失效的问题？
+ 怎么解决vue动态设置img的src不生效的问题？
    使用require
+ 使用vue后怎么针对搜索引擎做SEO优化？
    - ssr,即单页面后台渲染
    - vue-meta-info 与prerender-spa-plugin 预渲染
    - nuxt
    - phantomjs
+ 如果现在让你从vue/react/angularjs三个中选择一个，你会选哪个？说说你的理由
+ 你知道vue2.0兼容IE哪个版本以上吗？
+ 使用vue开发一个todo小应用，谈下你的思路
    - 引用
    - 全局注册组件
    - vue-cli
+ 你有看过vue推荐的风格指南吗？列举出你知道的几条
    - 组件名定义多个单词 避免和原生冲突
    - data必须是一个函数
    - props定义要详细
    - v-for设置键值
    - v-if和v-for不共用
    - 设置样式作用域
+ 你知道vue中key的原理吗？说说你对它的理解
+ vue中怎么重置data？
    - this.$data当前状态下
    - this.$options.data()获取初始默认值
+ vue渲染模板时怎么保留模板中的HTML注释呢？
    `<template comments></template>`
+ Vue.observable你有了解过吗？说说看
+ 你知道style加scoped属性的用途和原理吗？
+ 你期待vue3.0有什么功能或者改进的地方？
+ vue边界情况有哪些？
[vue边界情况](https://cn.vuejs.org/v2/guide/components-edge-cases.html)
+ 如何在子组件中访问父组件的实例？
+ watch的属性用箭头函数定义结果会怎么样？在vue项目中如果methods的方法用箭头函数定义结果会怎么样？
    - 箭头函数会改变this的指向,不再指向Vue实例
+ 在vue项目中如何配置favicon？
[在vue项目中如何配置favicon](https://www.cnblogs.com/chinabin1993/p/8509743.html)
+ 你有使用过babel-polyfill模块吗？主要是用来做什么的？
+ 说说你对vue的错误处理的了解？
    - errorCaptured是组件内部钩子，可捕捉本组件与子孙组件抛出的错误，接收error、vm、info三个参数，return false后可以阻止错误继续向上抛出。
    - errorHandler为全局钩子，使用Vue.config.errorHandler配置，接收参数与errorCaptured一致，2.6后可捕捉v-on与promise链的错误，可用于统一错误处理与错误兜底。
+ 在vue事件中传入$event，使用e.target和e.currentTarget有什么区别？
    - event.currentTarget始终指向事件所绑定的元素，而event.target指向事件发生时的元素。
+ 在.vue文件中style是必须的吗？那script是必须的吗？为什么？
+ vue怎么实现强制刷新组件？
+ vue自定义事件中父组件怎么接收子组件的多个参数？
    - parent`<child v-for="(item, index) in data" @custom="parentMethod(index, $1, $2)"></child>`
    - child`this.$emit('custom', arg1, arg2);`

+ 实际工作中，你总结的vue最佳实践有哪些？
+ vue给组件绑定自定义事件无效怎么解决？
    - 1、组件外部加修饰符.navtive
    - 2、组件内部声明$emit('自定义事件')
+ vue变量名如果以_、$开头的属性会发生什么问题？怎么访问到它们的值？
    - 以 _ 或 $ 开头**的属性不会被 Vue 实例代理，因为可能和 Vue 内置的属性、API 方法冲突。可以使用例如 **vm.$data._property
+ vue使用v-for遍历对象时，是按什么顺序遍历的？如何保证顺序？
    - 1、会先判断是否有iterator接口，如果有循环执行next()方法
    - 2、没有iterator的情况下，会调用Object.keys()方法，在不同浏览器中，JS引擎不能保证输出顺序一致
    - 3、保证对象的输出顺序可以把对象放在数组中，作为数组的元素
+ vue如果想扩展某个现有的组件时，怎么做呢？
    - 1.使用Vue.extend直接扩展 
    - 2.使用Vue.mixin全局混入 
    - 3.HOC封装 
    - 4.加slot扩展
+ 分析下vue项目本地开发完成后部署到服务器后报404是什么原因呢？
+ v-once的使用场景有哪些？
    - v-once 只渲染元素和组件一次。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过
+ 说说你对vue的表单修饰符.lazy的理解
    - v-model默认的触发条件是input事件,加了.lazy修饰符之后,v-model会在change事件触发的时候去监听
+ vue为什么要求组件模板只能有一个根元素？
    - 从效率上，如果多个根，那么就会产生多个入口（遍历、查找）从效率上来说都不方便;如果一个组件有多个根，说明你可以把这个组件拆开成两个组件，这样既进行了解耦，也会为后续的维护和迭代提供方便
+ EventBus注册在全局上时，路由切换时会重复触发事件，如何解决呢？
    - 建议在created里注册，在beforeDestory移出
    - 在组件内的beforeRouteLeave中移除事件监听
+ 怎么修改vue打包后生成文件路径？
+ 你有使用做过vue与原生app交互吗？说说vue与ap交互的方法
    - jsBridge,建立连接，然后相互调用
+ 使用vue写一个tab切换
    - v-for循环list，根据索引值设置active的样式和显示内容 
+ vue中什么是递归组件？举个例子说明下？
    - 当前注册一个vue组件定义 name 为 'node-tree' ，在组件 template 内部调用 实现递归
+ 怎么访问到子组件的实例或者子元素？
    - `this.$children/this.$refs.xxx`
+ 在子组件中怎么访问到父组件的实例？
    - `this.$parent`
+ 在组件中怎么访问到根实例？
    - `this.$root`
    - 无限循环调用$parent直到没有这个属性为止
+ 说说你对Object.defineProperty的理解
+ vue组件里写的原生addEventListeners监听事件，要手动去销毁吗？为什么？
    - 肯定要，一方面是绑定多次，另一方面是函数没释放会内存溢出 
+ vue组件里的定时器要怎么销毁？
    - 可以在`beforeDestroy`里写清除函数 `const timer = setInterval(() =>{ // 某些定时器操作 }, 500)`; // 通过`$once`来监听定时器，在`beforeDestroy`钩子可以被清除。
+ vue组件会在什么时候下被销毁？
    - 没有使用keep-alive时的路由切换。
+ 使用vue渲染大量数据时应该怎么优化？说下你的思路！
    - 1.如果需要响应式，考虑使用虚表（只渲染要显示的数据）； 
    - 2.如果不考虑响应式，变量在beforeCreated或created中声明（Object.freeze会导致列表无法增加数据）
+ 在vue中使用this应该注意哪些问题？
+ 你有使用过JSX吗？说说你对JSX的理解
+ 说说组件的命名规范
+ 怎么配置使vue2.0+支持TypeScript写法？
+ <template></template>有什么用？
+ vue的is这个特性你有用过吗？主要用在哪些方面？
+ vue的:class和:style有几种表示方式？
+ 你了解什么是函数式组件吗？
+ vue怎么改变插入模板的分隔符？
+ 组件中写name选项有什么作用？
+ 说说你对provide和inject的理解
+ 开发过程中有使用过devtools吗？
+ 说说你对slot的理解有多少？slot使用场景有哪些？
+ 你有使用过动态组件吗？说说你对它的理解
+ prop验证的type类型有哪几种？
+ prop是怎么做验证的？可以设置默认值吗？
+ 怎么缓存当前打开的路由组件，缓存后想更新当前组件怎么办呢？
+ 说说你对vue组件的设计原则的理解
+ 你了解vue的diff算法吗？
+ vue如何优化首页的加载速度？
+ vue打包成最终的文件有哪些？
+ ajax、fetch、axios这三都有什么区别？
+ vue能监听到数组变化的方法有哪些？为什么这些方法能监听到呢？
+ vue中是如何使用event对象的？
+ vue首页白屏是什么问题引起的？如何解决呢？   
+ 说说你对单向数据流和双向数据流的理解
+ 移动端ui你用的是哪个ui库？有遇到过什么问题吗？
+ 你知道nextTick的原理吗？
+ 说说你对v-clock和v-pre指令的理解
+ 写出你知道的表单修饰符和事件修饰符
+ 说说你对proxy的理解
+ 你有自己用vue写过UI组件库吗？
+ 用vue怎么实现一个换肤的功能？
+ 有在vue中使用过echarts吗？踩过哪些坑？如何解决的？
+ vue性能的优化的方法有哪些？
+ SSR解决了什么问题？有做过SSR吗？你是怎么做的？
+ 说说你觉得认为的vue开发规范有哪些？
+ vue部署上线前需要做哪些准备工作？
+ vue过渡动画实现的方式有哪些？
+ vue在created和mounted这两个生命周期中请求数据有什么区别呢？
+ vue父子组件双向绑定的方法有哪些？
+ vue怎么获取DOM节点？
+ vue项目有做过单元测试吗？
+ vue项目有使用过npm run build --report吗？
+ 如何解决vue打包vendor过大的问题？
+ webpack打包vue速度太慢怎么办？
+ vue在开发过程中要同时跟N个不同的后端人员联调接口（请求的url不一样）时你该怎么办？
+ vue要做权限管理该怎么做？如果控制到按钮级别的权限怎么做？
+ 说下你的vue项目的目录结构，如果是大型项目你该怎么划分结构和划分组件呢？
+ 在移动端使用vue，你觉得最佳实践有哪些？
+ 你们项目为什么会选vue而不选择其它的框架呢？
+ 对于即将到来的vue3.0特性你有什么了解的吗？
+ vue开发过程中你有使用什么辅助工具吗？
+ vue和微信小程序写法上有什么区别？
+ 怎么缓存当前的组件？缓存后怎么更新？
+ 你了解什么是高阶组件吗？可否举个例子说明下？
+ 为什么我们写组件的时候可以写在.vue里呢？可以是别的文件名后缀吗？
+ vue-loader是什么？它有什么作用？
+ 说说你对vue的extend（构造器）的理解，它主要是用来做什么的？
+ 如果将axios异步请求同步化处理？
+ 怎么捕获组件vue的错误信息？
+ 为什么vue使用异步更新组件？
+ 如何实现一个虚拟DOM？说说你的思路
+ 写出多种定义组件模板的方法
+ SPA单页面的实现方式有哪些？
+ 说说你对SPA单页面的理解，它的优缺点分别是什么？
+ 说说你都用vue做过哪些类型的项目？
+ 在vue项目中如何引入第三方库（比如jQuery）？有哪些方法可以做到？
+ 使用vue手写一个过滤器
+ 你有使用过render函数吗？有什么好处？
+ 写出你常用的指令有哪些？
+ 手写一个自定义指令及写出如何调用
+ 组件进来请求接口时你是放在哪个生命周期？为什么？
+ 你有用过事件总线(EventBus)吗？说说你的理解
+ 说说vue的优缺点分别是什么？
+ DOM渲染在哪个周期中就已经完成了？
+ 第一次加载页面时会触发哪几个钩子？
+ vue生命周期总共有几个阶段？
+ vue生命周期的作用是什么？
+ vue和angular有什么区别呢？
+ 如何引入scss？引入后如何使用？
+ 使用vue开发过程你是怎么做接口管理的？
+ 为何官方推荐使用axios而不用vue-resource？
+ 你了解axios的原理吗？有看过它的源码吗？
+ 你有封装过axios吗？主要是封装哪方面的？
+ 如何中断axios的请求？
+ axios是什么？怎样使用它？怎么解决跨域的问题？
+ 说说你对vue的template编译的理解？
+ v-on可以绑定多个方法吗？
+ vue常用的修饰符有哪些？列举并说明
+ 你认为vue的核心是什么？
+ 说说你对vue的mixin的理解，有什么应用场景？
+ SPA首屏加载速度慢的怎么解决？
+ 删除数组用delete和Vue.delete有什么区别？
+ 动态给vue的data添加一个新的属性时会发生什么？怎样解决？
+ 组件和插件有什么区别？
+ 说说你使用vue过程中遇到的问题（坑）有哪些，你是怎么解决的？
+ 说说你对选项el,template,render的理解
+ vue实例挂载的过程是什么？
+ vue在组件中引入插件的方法有哪些？
+ v-if和v-for的优先级是什么？如果这两个同时出现时，那应该怎么优化才能得到更好的性能？
+ 分别说说vue能监听到数组或对象变化的场景，还有哪些场景是监听不到的？无法监听时有什么解决方案？
+ $nextTick有什么作用？
+ 为什么data属性必须声明为返回一个初始数据对应的函数呢？
+ 怎么在watch监听开始之后立即被调用？
+ watch怎么深度监听对象变化？
+ watch和计算属性有什么区别？
+ vue如何监听键盘事件？
+ v-for循环中key有什么作用？
+ 说说你对keep-alive的理解是什么？
+ 你有写过自定义指令吗？自定义指令的生命周期（钩子函数）有哪些？
+ v-show和v-if有什么区别？使用场景分别是什么？
+ 说说你对MVC、MVP、MVVM模式的理解
+ 说下你对指令的理解？
+ 什么是虚拟DOM？
+ 什么是双向绑定？原理是什么？
+ vue和react有什么不同？使用场景是什么？
+ 说说vue的优缺点
+ 有使用过vue吗？说说你对vue的理解


# vue-cli
+ vue-cli提供了的哪几种脚手架模板？
+ vue-cli工程中常用的npm命令有哪些？
+ 在使用vue-cli开发vue项目时，自动刷新页面的原理你了解吗？
+ vue-cli3插件有写过吗？怎么写一个代码生成插件？
+ vue-cli生成的项目可以使用es6、es7的语法吗？为什么？
+ vue-cli怎么解决跨域的问题？
+ vue-cli中你经常的加载器有哪些？
+ 你知道什么是脚手架吗？
+ 说下你了解的vue-cli原理？你可以自己实现个类vue-cli吗？
+ 怎么使用vue-cli3创建一个项目？
+ vue-cli3你有使用过吗？它和2.x版本有什么区别？
+ vue-cli默认是单页面的，那要弄成多页面该怎么办呢？
+ 不用vue-cli，你自己有搭建过vue的开发环境吗？流程是什么？

# vue-router
+ vue-router怎么重定向页面？
+ vue-router怎么配置404页面？
+ 切换路由时，需要保存草稿的功能，怎么实现呢？
+ vue-router路由有几种模式？说说它们的区别？
+ vue-router有哪几种导航钩子（ 导航守卫 ）？
+ 说说你对router-link的了解
+ vue-router如何响应路由参数的变化？
+ 你有看过vue-router的源码吗？说说看
+ 切换到新路由时，页面要滚动到顶部或保持原先的滚动位置怎么做呢？
+ 在什么场景下会用到嵌套路由？
+ 如何获取路由传过来的参数？
+ 说说active-class是哪个组件的属性？
+ 在vue组件中怎么获取到当前的路由信息？
+ vur-router怎么重定向？
+ 怎样动态加载路由？
+ 怎么实现路由懒加载呢？
+ 如果让你从零开始写一个vue路由，说说你的思路
+ 说说vue-router完整的导航解析流程是什么？
+ 路由之间是怎么跳转的？有哪些方式？
+ 如果vue-router使用history模式，部署时要注意什么？
+ route和router有什么区别？
+ vue-router钩子函数有哪些？都有哪些参数？
+ vue-router是用来做什么的？它有哪些组件？

# vuex
+ 你有写过vuex中store的插件吗？
+ 你有使用过vuex的module吗？主要是在什么场景下使用？
+ vuex中actions和mutations有什么区别？
+ vuex使用actions时不支持多参数传递怎么办？
+ 你觉得vuex有什么缺点？
+ 你觉得要是不用vuex的话会带来哪些问题？
+ vuex怎么知道state是通过mutation修改还是外部直接修改的？
+ 请求数据是写在组件的methods中还是在vuex的action中？
+ + 怎么监听vuex数据的变化？
+ vuex的action和mutation的特性是什么？有什么区别？
+ 页面刷新后vuex的state数据丢失怎么解决？
+ vuex的state、getter、mutation、action、module特性分别是什么？
+ vuex的store有几个属性值？分别讲讲它们的作用是什么？
+ 你理解的vuex是什么呢？哪些场景会用到？不用会有问题吗？有哪些特性？
+ 使用vuex的优势是什么？
+ 有用过vuex吗？它主要解决的是什么问题？推荐在哪些场景用？