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
        使用methods方法
        使用computed
+ 怎么解决vue打包后静态资源图片失效的问题？
+ 怎么解决vue动态设置img的src不生效的问题？
    使用require
+ 使用vue后怎么针对搜索引擎做SEO优化？
        ssr,即单页面后台渲染
        vue-meta-info 与prerender-spa-plugin 预渲染
        nuxt
        phantomjs
+ 如果现在让你从vue/react/angularjs三个中选择一个，你会选哪个？说说你的理由
+ 你知道vue2.0兼容IE哪个版本以上吗？
+ 使用vue开发一个todo小应用，谈下你的思路
        引用
        全局注册组件
        vue-cli
+ 你有看过vue推荐的风格指南吗？列举出你知道的几条
        组件名定义多个单词 避免和原生冲突
        data必须是一个函数
        props定义要详细
        v-for设置键值
        v-if和v-for不共用
        设置样式作用域
+ 你知道vue中key的原理吗？说说你对它的理解
+ vue中怎么重置data？
        this.$data当前状态下
        this.$options.data()获取初始默认值
+ vue渲染模板时怎么保留模板中的HTML注释呢？
        `<template comments></template>`
+ Vue.observable你有了解过吗？说说看
+ 你知道style加scoped属性的用途和原理吗？
+ 你期待vue3.0有什么功能或者改进的地方？
+ vue边界情况有哪些？
        [vue边界情况](https://cn.vuejs.org/v2/guide/components-edge-cases.html)
+ 如何在子组件中访问父组件的实例？
+ watch的属性用箭头函数定义结果会怎么样？在vue项目中如果methods的方法用箭头函数定义结果会怎么样？
        箭头函数会改变this的指向,不再指向Vue实例
+ 在vue项目中如何配置favicon？
        [在vue项目中如何配置favicon](https://www.cnblogs.com/chinabin1993/p/8509743.html)
+ 你有使用过babel-polyfill模块吗？主要是用来做什么的？
+ 说说你对vue的错误处理的了解？
        errorCaptured是组件内部钩子，可捕捉本组件与子孙组件抛出的错误，接收error、vm、info三个参数，return false后可以阻止错误继续向上抛出。
        errorHandler为全局钩子，使用Vue.config.errorHandler配置，接收参数与errorCaptured一致，2.6后可捕捉v-on与promise链的错误，可用于统一错误处理与错误兜底。
+ 在vue事件中传入$event，使用e.target和e.currentTarget有什么区别？
        event.currentTarget始终指向事件所绑定的元素，而event.target指向事件发生时的元素。
+ 在.vue文件中style是必须的吗？那script是必须的吗？为什么？
+ vue怎么实现强制刷新组件？
+ vue自定义事件中父组件怎么接收子组件的多个参数？
        parent`<child v-for="(item, index) in data" @custom="parentMethod(index, $1, $2)"></child>`
        child`this.$emit('custom', arg1, arg2);`

+ 实际工作中，你总结的vue最佳实践有哪些？
+ vue给组件绑定自定义事件无效怎么解决？
        1、组件外部加修饰符.navtive
        2、组件内部声明$emit('自定义事件')
+ vue变量名如果以_、$开头的属性会发生什么问题？怎么访问到它们的值？
        以 _ 或 $ 开头**的属性不会被 Vue 实例代理，因为可能和 Vue 内置的属性、API 方法冲突。可以使用例如 **vm.$data._property
+ vue使用v-for遍历对象时，是按什么顺序遍历的？如何保证顺序？
        1、会先判断是否有iterator接口，如果有循环执行next()方法
        2、没有iterator的情况下，会调用Object.keys()方法，在不同浏览器中，JS引擎不能保证输出顺序一致
        3、保证对象的输出顺序可以把对象放在数组中，作为数组的元素
+ vue如果想扩展某个现有的组件时，怎么做呢？
        1.使用Vue.extend直接扩展 
        2.使用Vue.mixin全局混入 
        3.HOC封装 
        4.加slot扩展
+ 分析下vue项目本地开发完成后部署到服务器后报404是什么原因呢？
+ v-once的使用场景有哪些？
        v-once 只渲染元素和组件一次。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过
+ 说说你对vue的表单修饰符.lazy的理解
        v-model默认的触发条件是input事件,加了.lazy修饰符之后,v-model会在change事件触发的时候去监听
+ vue为什么要求组件模板只能有一个根元素？
        从效率上，如果多个根，那么就会产生多个入口（遍历、查找）从效率上来说都不方便;如果一个组件有多个根，说明你可以把这个组件拆开成两个组件，这样既进行了解耦，也会为后续的维护和迭代提供方便
+ EventBus注册在全局上时，路由切换时会重复触发事件，如何解决呢？
        建议在created里注册，在beforeDestory移出
        在组件内的beforeRouteLeave中移除事件监听
+ 怎么修改vue打包后生成文件路径？
+ 你有使用做过vue与原生app交互吗？说说vue与ap交互的方法
        jsBridge,建立连接，然后相互调用
+ 使用vue写一个tab切换
        v-for循环list，根据索引值设置active的样式和显示内容 
+ vue中什么是递归组件？举个例子说明下？
        当前注册一个vue组件定义 name 为 'node-tree' ，在组件 template 内部调用 实现递归
+ 怎么访问到子组件的实例或者子元素？
        `this.$children/this.$refs.xxx`
+ 在子组件中怎么访问到父组件的实例？
        `this.$parent`
+ 在组件中怎么访问到根实例？
        `this.$root`
        无限循环调用$parent直到没有这个属性为止
+ 说说你对Object.defineProperty的理解
+ vue组件里写的原生addEventListeners监听事件，要手动去销毁吗？为什么？
        肯定要，一方面是绑定多次，另一方面是函数没释放会内存溢出 
+ vue组件里的定时器要怎么销毁？
        可以在`beforeDestroy`里写清除函数 `const timer = setInterval(() =>{ // 某些定时器操作 }, 500)`; // 通过`$once`来监听定时器，在`beforeDestroy`钩子可以被清除。
+ vue组件会在什么时候下被销毁？
        没有使用keep-alive时的路由切换。
+ 使用vue渲染大量数据时应该怎么优化？说下你的思路！
        1.如果需要响应式，考虑使用虚表（只渲染要显示的数据）； 
        2.如果不考虑响应式，变量在beforeCreated或created中声明（Object.freeze会导致列表无法增加数据）
+ 在vue中使用this应该注意哪些问题？
+ 你有使用过JSX吗？说说你对JSX的理解
        jsx不是一门新的语言，是一种新的语法糖。让我们在js中可以编写像html一样的代码。 允许XML语法直接加入到JavaScript代码中，让你能够高效的通过代码而不是模板来定义界面
+ 说说组件的命名规范
        1.kebab-case（短横线分隔命名），引用时必须也采用kebab-case； 
        2.PascalCase（首字母大写命名），引用时既可以采用PascalCase也可以使用kebab-case； 但在DOM中使用只有kebab-case是有效的
+ 怎么配置使vue2.0+支持TypeScript写法？
+ <template></template>有什么用？
+ vue的is这个特性你有用过吗？主要用在哪些方面？
        vue中is的属性引入是为了解决dom结构中对放入html的元素有限制的问题 `<ul> <li is='my-component'></li></ul>`
+ vue的:class和:style有几种表示方式？
+ 你了解什么是函数式组件吗？
        函数式组件：
        需要提供一个render方法， 接受一个参数（createElement函数）， 方法内根据业务逻辑，通过createElement创建vnodes，最后return vnodes
        createElement函数， 三个参数， 第一个参数是html标签或自定义组件，第二个参数一个obj（包含props， on...等等）， 第三个参数children(通过createElement构建， 或者字符串) 
+ vue怎么改变插入模板的分隔符？
        new Vue({
          delimiters: ['${', '}']
        })// 分隔符变成了 ES6 模板字符串的风格
+ 组件中写name选项有什么作用？
        项目使用keep-alive时，可搭配组件name进行缓存过滤 DOM做递归组件时需要调用自身name vue-devtools调试工具里显示的组见名称是由vue中组件name决定的
+ 说说你对provide和inject的理解
        通过在父组件中provide一些数据然后再所有子组件中都可以通过inject获取使用该参数,
        主要是为了解决一些循环组件比如tree, menu, list等, 传参困难, 并且难以管理的问题, 主要用于组件封装, 常见于一些ui组件库
+ 开发过程中有使用过devtools吗？
        有，devtools确实是个好东西，大力协助vue项目开发，传参，数据展示，用于调试vue应用，这可以极大地提高我们的调试效率
+ 说说你对slot的理解有多少？slot使用场景有哪些？
        slot, 插槽, 在使用组件的时候, 在组建内部插入东西. 组件封装的时候最常使用到
+ 你有使用过动态组件吗？说说你对它的理解
        通过 Vue 的 元素加一个特殊的 is 特性来实现
+ prop验证的type类型有哪几种？
        Number, String, Boolean, Array, Function, Object,Promise
+ prop是怎么做验证的？可以设置默认值吗？
        单个类型就用Number等基础类型，多个类型用数组，必填的话设置require为true，默认值的话设置default，对象和数组设置默认用工厂函数，自定义验证函数validator
+ 怎么缓存当前打开的路由组件，缓存后想更新当前组件怎么办呢？
        可以在路由meta中加入参数, 对打开的路由进行keep-alive的判断, 通过钩子active等 
    [详细](https://blog.csdn.net/qq_38861711/article/details/98185106)
+ 说说你对vue组件的设计原则的理解
        第一: 容错处理, 这个要做好, 极端场景要考虑到 
        第二: 缺省值(默认值)要有, 一般把应用较多的设为缺省值 
        第三: 颗粒化, 把组件拆分出来. 
        第四: 一切皆可配置, 如有必要, 组件里面使用中文标点符号, 还是英文的标点符号, 都要考虑到 
        第五: 场景化, 如一个dialog弹出, 还需要根据不同的状态封装成success, waring, 等 
        第六: 有详细的文档/注释和变更历史, 能查到来龙去脉, 新版本加了什么功能是因为什么 
        第七: 组件名称, 参数prop, emit, 名称设计要通俗易懂, 最好能做到代码即注释这种程度 
        第八: 可拓展性, 前期可能不需要这个功能, 但是后期可能会用上, 要预留什么, 要注意什么 
        第九: 规范化 
        第十: 分阶段: 不是什么都要一期开发完成看具体业务 
+ 你了解vue的diff算法吗？
        一个list中某一个数据发生变更时, vue中会对整个list进行遍历, 判断使用到的某些属性是否发生变更, 从而更新发生变更的item 所以key属性才会显得很重要, 它会告诉你, 我那个item发生变更, 而不是去检测整个list
    [详细](https://www.cnblogs.com/wind-lanyan/p/9061684.html)
+ vue如何优化首页的加载速度？
        异步路由和异步加载 
        还有分屏加载, 按需加载, 延时加载图片等, cdn, 域名拆分 
        补充： ssr直出， webpack压缩HTML/CSS/JS， 首屏css单独提取内联， 关键资源Proload
        图片：不缩放，使用webp、小图片base64，iconfont， gzip, dns-prefetch， 静态资源单独域名，去掉cookie
+ vue打包成最终的文件有哪些？
+ ajax、fetch、axios这三都有什么区别？
        ajax是最早出现发送后端请求的技术，属于原生js范畴,核心是使用XMLHttpRequest对象,使用较多并有先后顺序的话，容易产生回调地狱。
        fetch号称可以代替ajax的技术，是基于es6中的Promise对象设计的，参数和jQuery中的ajax类似，它并不是对ajax进一步封装，它属于原生js范畴。没有使用XMLHttpRequest对象。
        axios不是原生js,使用时需要对其进行安装，客户端和服务器端都可以使用，可以在请求和相应阶段进行拦截，基于promise对象。
+ vue能监听到数组变化的方法有哪些？为什么这些方法能监听到呢？
        push()
        pop()
        shift()
        unshift()
        splice()
        sort()
        reverse()
+ vue中是如何使用event对象的？
        @click="func" 默认第一个参数传入event对象 @click="func(0, $event)" 如果自己需要传入参数和event对象，则需要使用$event来获取event对象并传入func 
+ vue首页白屏是什么问题引起的？如何解决呢？
        1.打包后文件引用路径不对，导致找不到文件报错白屏 
        2.路由模式mode设置影响 解决方案： 打包优化 路由懒加载 代码压缩 第三方插件按需加载
+ 说说你对单向数据流和双向数据流的理解
        单向数据流：所有状态的改变可记录、可跟踪，源头易追溯；所有数据只有一份，组件数据只有唯一的入口和出口，使得程序更直观更容易理解，有利于应用的可维护性；一旦数据变化，就去更新页面(data-页面)，但是没有(页面-data)；如果用户在页面上做了变动，那么就手动收集起来(双向是自动)，合并到原有的数据中。 
        双向数据流：无论数据改变，或是用户操作，都能带来互相的变动，自动更新。
+ 移动端ui你用的是哪个ui库？有遇到过什么问题吗？
+ 你知道nextTick的原理吗？
        用法：在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。 Vue官网提到DOM的更新是异步执行的，只要数据发生变化，将会开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个watcher被多次触发，只会被推入到队列中一次。
        简单来说，就是当数据发生变化时，视图不会立即更新，而是等到同一事件循环中所有数据变化完成之后，再统一更新视图。
+ 说说你对v-clock和v-pre指令的理解
+ 写出你知道的表单修饰符和事件修饰符
+ 说说你对proxy的理解
        vue的数据劫持有两个缺点: 1、无法监听通过索引修改数组的值的变化 2、无法监听object也就是对象的值的变化 所以vue2.x中才会有$set属性的存在
        proxy是es6中推出的新api，可以弥补以上两个缺点，所以vue3.x版本用proxy替换object.defineproperty
+ 你有自己用vue写过UI组件库吗？
+ 用vue怎么实现一个换肤的功能？
        局的theme属性然后做class判断或者加载不同的样式文件。 
        一种是编译时换肤 编译时换肤可以通过css in js相关技术修改css预处理器的变量 。 
        一种是用户操作换肤。 用户操作换肤 只能内置一些style变量供用户选择了
+ 有在vue中使用过echarts吗？踩过哪些坑？如何解决的？
        1、在切换tab时 第二个tab的图表无法正常显示 切换tab时使用方法@tab-click="handleClick"加载图表的render函数
        2、注意dom的渲染时机 和chart的实例化时机 在相应的生命周期方法中做操作。结合强制刷新 
        3、多线图垂直坐标轴click 事件触发问题~ 解决方法 （容器事件封装 判断事件参数处理）
+ vue性能的优化的方法有哪些？
        Vue 代码层面的优化； v-if 和 v-show 区分使用场景 computed 和 watch 区分使用场景 v-for 遍历必须为 item 添加 key，且避免同时使用 v-if 长列表性能优化 事件的销毁 图片资源懒加载 路由懒加载 第三方插件的按需引入
        webpack 配置层面的优化； Webpack 对图片进行压缩 减少 ES6 转为 ES5 的冗余代码 提取公共代码 模板预编译 提取组件的 CSS 优化 SourceMap 构建结果输出分析 Vue 项目的编译优化
        基础的 Web 技术层面的优化： 开启 gzip 压缩 浏览器缓存 CDN 的使用 使用 Chrome Performance 查找性能瓶颈
+ SSR解决了什么问题？有做过SSR吗？你是怎么做的？
        SSR服务端渲染，解决SEO问题，用next.js，最佳实践
+ 说说你觉得认为的vue开发规范有哪些？
+ vue部署上线前需要做哪些准备工作？
        outer 是不是hash 是否需要配置nginx , publicPath , 是不是要配置cdn
+ vue过渡动画实现的方式有哪些？
        1.使用vue的transition标签结合css样式完成动画 
        2.利用animate.css结合transition实现动画 
        3.利用 vue中的钩子函数实现动画 
+ vue在created和mounted这两个生命周期中请求数据有什么区别呢？
        看实际情况，一般在 created（或beforeRouter） 里面就可以，如果涉及到需要页面加载完成之后的话就用 mounted。
        在created的时候，视图中的html并没有渲染出来，所以此时如果直接去操作html的dom节点，一定找不到相关的元素 而在mounted中，由于此时html已经渲染出来了，所以可以直接操作dom节点，（此时document.getelementById 即可生效了）。
+ vue父子组件双向绑定的方法有哪些？
        1.利用对象的引用关系来实现
        2.父子组件之间的数据传递
        3.使用.sync修饰符
+ vue怎么获取DOM节点？
        view：v-ref:xxx
        data：this.$ref.xxx
+ vue项目有做过单元测试吗？
+ vue项目有使用过npm run build --report吗？
        给 process.env 对象添加了一个属性 npm_config_report: "true"，表示开启编译完成后的报告。
+ 如何解决vue打包vendor过大的问题？
        1、在webpack.base.conf.js新增externals配置，表示不需要打包的文件，然后在index.html中通过CDN引入
        `externals: { "vue": "Vue", "vue-router": "VueRouter", "vuex": "Vuex", "element-ui": "ELEMENT", "BMap": "BMap" } `
        2、使用路由懒加载
+ webpack打包vue速度太慢怎么办？
        升级webpack4,支持多进程
    [详细](https://www.cnblogs.com/imwtr/p/9189670.html)
+ vue在开发过程中要同时跟N个不同的后端人员联调接口（请求的url不一样）时你该怎么办？
        devServer中把所有的服务人员的地址代理都写进去， 然后动态更改接口的baseUrl，这样切换不同后端人员的时候不用重启
+ vue要做权限管理该怎么做？如果控制到按钮级别的权限怎么做？
        通过获取当前用户的权限去比对路由表，生成当前用户具的权限可访问的路由表，通过 router.addRoutes 动态挂载到 router 上。 如果权限角色是动态的，那么要为每个按钮做标识，根据这个标识去查哪些角色拥有该权限，再根据登录人的权限角色进行显示与否
    [详细](https://panjiachen.github.io/vue-element-admin-site/zh/guide/essentials/permission.html#%E9%80%BB%E8%BE%91%E4%BF%AE%E6%94%B9)
+ 说下你的vue项目的目录结构，如果是大型项目你该怎么划分结构和划分组件呢？
        views目录存放一级路由的组件，即视图组件
        Components目录存放组件
        Store存放vuex相关文件
        Router目录存放路由相关文件
        Untils目录存放工具js文件
        API目录存放封装好的与后端交互的逻辑
        Assets存放静态文件
+ 在移动端使用vue，你觉得最佳实践有哪些？
        
+ 你们项目为什么会选vue而不选择其它的框架呢？
        Vue.js是一个轻巧、高性能、可组件化的MVVM库，同时拥有非常容易上手的API；
        vue是单页面应用，使页面局部刷新，不用每次跳转页面都要请求所有数据和dom，这样大大加快了访问速度和提升用户体验。
        而且他的第三方ui库很多节省开发时间。
    [为什么我不再用Vue，改用React？](https://developer.aliyun.com/article/766236?spm=a2c6h.14164896.0.0.518228b8FRDdxa)
+ 对于即将到来的vue3.0特性你有什么了解的吗？
+ vue开发过程中你有使用什么辅助工具吗？
        vue-devtools
+ vue和微信小程序写法上有什么区别？

+ 你了解什么是高阶组件吗？可否举个例子说明下？
+ 为什么我们写组件的时候可以写在.vue里呢？可以是别的文件名后缀吗？
        配合相应的loader，也可以写为js,jsx,ts,tsx这种
+ vue-loader是什么？它有什么作用？
        解析和转换 .vue 文件，提取出其中的逻辑代码 script、样式代码 style、以及 HTML 模版 template，再分别把它们交给对应的 Loader 去处理。
+ 说说你对vue的extend（构造器）的理解，它主要是用来做什么的？
        extend的作用是继承当前的Vue类，传入一个extendOption生成一个新的构造函数。在extend的时候会进行mergeOption，融合Vue原型上的baseOption，所以extend出来的子类也能使用v-model、keep-alive等全局性的组件。
        作用是生成组件类。在挂载全局组件和设置了components属性的时候会使用到。在生成DOM的时候会new 实例化挂载。
+ 如果将axios异步请求同步化处理？
        async ,await,Generator函数 回调里面写回调
+ 怎么捕获组件vue的错误信息？
        使用errorCaptured 当捕获一个来自子孙组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回false以阻止该错误继续向上传播。 
+ 为什么vue使用异步更新组件？
        批量更新 收集当前的改动一次性更新 节省diff开销 
+ 如何实现一个虚拟DOM？说说你的思路
        虚拟DOM本身是一个JavaScript对象模拟真实DOM ，用对象的属性去描述一个DOM节点，最终也只是一个真实DOM的映射
+ 写出多种定义组件模板的方法
        1、字符串
        2、模板字面量
        3、<script type="x-template"></script>
        4、文件组件模板
        5、inline-template
+ SPA单页面的实现方式有哪些？
        1.监听地址栏中hash变化驱动界面变化 
        2.用pushsate记录浏览器的历史，驱动界面发送变化 
        3.直接在界面用普通事件驱动界面变化 它们都是遵循同一种原则：div 的显示与隐藏
+ 说说你对SPA单页面的理解，它的优缺点分别是什么？
        SPA应用就是一个web应用，可理解为：是一种只需要将单个页面加载到服务器之中的web应用程序。当浏览器向服务器发出第一个请求时，服务器会返回一个index.html文件，它所需的js，css等会在显示时统一加载，部分页面需要时加载。
         优点： 
            1.良好的交互式体验。意思是：用户无需刷新页面，获取数据通过异步ajax获取，页面显示流畅 
            2.良好的前后端分离模式（MVVM），减轻服务端压力。服务器只需要输出数据就可以，不用管逻辑和页面展示，吞吐能力会提高几倍 
            3.共用同一套后端程序代码，不用修改就可用于web界面，手机和平板等客户端设备 
        缺点： 
            1.不利于SEO优化 
            2.由于单页应用在一个页面中显示，所以不可以使用浏览器自带的前进后退功能，想要实现页面切换需要自己进行管理 
            3.首屏加载过慢（初次加载耗时多），原因是：为了实现单页web应用功能及展示效果，在页面初始化的时候就会将js，css等统一加载，部分页面在需要时加载。
            解决方法：①使用路由懒加载 ②开启Gzip压缩 ③使用webpack的externals属性把不需要的库文件分离出去，减少打包后文件的大小 ④使用vue的服务端渲染（SSR）
+ 说说你都用vue做过哪些类型的项目？
+ 在vue项目中如何引入第三方库（比如jQuery）？有哪些方法可以做到？
        1、绝对路径直接引入 在index.html中用script引入 <script src="./static/jquery-1.12.4.js"></script> 然后在webpack中配置external externals: { 'jquery': 'jQuery' } 在组件中使用时import import $ from 'jquery'
        2 、在webpack中配置alias resolve: { extensions: ['.js', '.vue', '.json'], alias: { '@': resolve('src'), 'jquery': resolve('static/jquery-1.12.4.js') } } 然后在组件中import
        3、在webpack中配置plugins plugins: [ new webpack.ProvidePlugin({ $: 'jquery' }) ] 全局使用，但在使用eslint情况下会报错，需要在使用了 $ 的代码前添加 /* eslint-disable*/ 来去掉 ESLint 的检查。
+ 使用vue手写一个过滤器
        全局过滤器 Vue.filter('addHobby',(val,hobby)=>{ return val + hobby }) 
        局部过滤器 filters:{ addHobby(val,hobby){ return val + hobby } }
+ 你有使用过render函数吗？有什么好处？
        template也会翻译成render，只有一点，template中元素的tag_name是静态的，不可变化，使用createEelment可以生成不同tag_name, 比如h1 ... h6, 可以通过一个number变量控制
    [vue 的 render 函数](https://blog.csdn.net/sansan_7957/article/details/83014838)
+ 写出你常用的指令有哪些？
+ 手写一个自定义指令及写出如何调用
        全局自定义指令 Vue,directive('test',(el,binding,vnode)=>{ 业务逻辑 })
        局部指令 directives:{ test(el,binding,vnode){ 业务逻辑 } } 
        调用，都是v-test 
+ 组件进来请求接口时你是放在哪个生命周期？为什么？
        一般在created 因为在这个生命周期我们常用到的都已经初始化好了 如果涉及dom 那就mounted
+ 你有用过事件总线(EventBus)吗？说说你的理解
        也是组件传值的一种方式（例如兄弟组件） 通过Bus.$emit('on-message',this.abc)的方式进行发布消息，它有两个参数，一个是消息声明，第二个是传递的值，key和value的关系 
        另一个组件接收通过Bus.$on('on-message', msg => { }）的方式，第一个参数是传递过来的消息声明，第二个参数可以是个函数，msg就是做为传递过来的参数
+ 说说vue的优缺点分别是什么？
+ DOM渲染在哪个周期中就已经完成了？
+ 第一次加载页面时会触发哪几个钩子？
+ vue生命周期总共有几个阶段？
+ vue生命周期的作用是什么？
+ vue和angular有什么区别呢？
+ 如何引入scss？引入后如何使用？
+ 使用vue开发过程你是怎么做接口管理的？
        在request.js中对axios请求和响应进行劫持，统一处理，然后在api文件夹中引入request.js后再使用封装后的方法进行请求
    [详情](https://github.com/haizlin/fe-interview/issues/306?spm=a2c6h.13066369.0.0.7b9e64a03u9Oh8)
+ 为何官方推荐使用axios而不用vue-resource？
        1.vue-resources不再更新了，vue作者尤大推荐axios。 
        2.axios更加强大 
        3.axios就是一个基于ES6的Promise的网络请求库，其实说干净了就是一个打包好的XMLHttpRequests，也就是说，这个也是一个ajax库。 
        4.axios 在浏览器里建立XHR 通过nodejs进行http请求 转换或者拦截请求数据或响应数据 支持Promise的API 可以取消请求 自动转换JSON 可以防御XSRF攻击！ 
        5.vue-resources 只提供了浏览器版本 
+ 你了解axios的原理吗？有看过它的源码吗？
[详情](https://juejin.im/post/5df349b5518825123751ba66)
+ 你有封装过axios吗？主要是封装哪方面的？
+ 如何中断axios的请求？
+ axios是什么？怎样使用它？怎么解决跨域的问题？
        axios 的是一种异步请求，用法和ajax类似，安装npm install axios --save 即可使用，请求中包括get,post,put, patch ,delete等五种请求方式，解决跨域可以在请求头中添加Access-Control-Allow-Origin，也可以在index.js文件中更改proxyTable配置等解决跨域问题 因
        为axios在vue中利用中间件http-proxy-middleware做了一个本地的代理服务A，相当于你的浏览器通过本地的代理服务A请求了服务端B，浏览器通过服务A并没有跨域，因此就绕过了浏览器的同源策略，解决了跨域的问题。
+ 说说你对vue的template编译的理解？
        组件化开发 复用性 先转化为AST树，在得到的render函数中返回VNode（vue的虚拟DOM节点）
+ v-on可以绑定多个方法吗？
+ vue常用的修饰符有哪些？列举并说明
+ 你认为vue的核心是什么？
        两部分 
        一部分 数据->虚拟dom->dom, 
        另一部分 响应式数据 
        这两部分大大节省了开发者对数据变动转换到页面显示的操作，可以让开发者聚焦业务，聚焦数据的处理
+ 说说你对vue的mixin的理解，有什么应用场景？
        多个实例引用了相同或相似的方法或属性等，可将这些重复的内容抽取出来作为mixins的js，export出去，在需要引用的vue文件通过mixins属性注入，与当前实例的其他内容进行merge。
+ 删除数组用delete和Vue.delete有什么区别？
        delete：只是被删除数组成员变为 empty /undefined，其他元素键值不变 
        Vue.delete：直接删了数组成员，并改变了数组的键值（对象是响应式的，确保删除能触发更新视图，这个方法主要用于避开 Vue 不能检测到属性被删除的限制）
+ 动态给vue的data添加一个新的属性时会发生什么？怎样解决？
        如果在实例创建之后添加新的属性到实例上，它不会触发视图更新。 
        Vue不允许在已经创建的实例上动态添加新的根级响应式属性 (root-level reactive property)。
        然而它可以使用Vue.set(object, key, value) 方法将响应属性添加到嵌套的对象上
+ 组件和插件有什么区别？
+ 说说你使用vue过程中遇到的问题（坑）有哪些，你是怎么解决的？
        从详情页返回列表页时, 要保存所有状态, 比如: 滚动条位置, 数据, 下拉数据等
        当时想用keep-alive, 后来没用, 直接存储一些关键数据, 返回到router时重新加载了数据
+ 说说你对选项el,template,render的理解
+ vue实例挂载的过程是什么？
+ vue在组件中引入插件的方法有哪些？
+ v-if和v-for的优先级是什么？如果这两个同时出现时，那应该怎么优化才能得到更好的性能？
        v-for 的优先级更高 避免出现这种情况，
        如果实在需要，则在外嵌套template，在这一层进行v-if判断，然后在内部进行v-for循环，避免每次只有v-if只渲染很少一部分元素，也需要遍历同级的所有元素
+ 分别说说vue能监听到数组或对象变化的场景，还有哪些场景是监听不到的？无法监听时有什么解决方案？
+ $nextTick有什么作用？
+ 为什么data属性必须声明为返回一个初始数据对应的函数呢？
+ 怎么在watch监听开始之后立即被调用？
+ watch怎么深度监听对象变化？
+ watch和计算属性有什么区别？
+ vue如何监听键盘事件？
+ v-for循环中key有什么作用？
        性能优化, 简述: 让vue在更新数据的时候可以更有针对性的(diff时更快更准确找到变化的位置) 
+ 说说你对keep-alive的理解是什么？
        keep-alive是Vue提供的一个抽象组件，用来对组件进行缓存，从而节省性能，由于是一个抽象组件，所以在页面渲染完毕后不会被渲染成一个DOM元素 
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
        1、npm install：下载 node_modules 资源包的命令 ==思考问题：== 为什么下载资源包要用npm install？ 请你谈一下 
        2、npm run dev： 启动 vue-cli 开发环境的 npm命令（3.0以下脚手架2启动方式） 
        npm run serve:启动 vue-cli 开发环境的 npm命令（3.0以上脚手架3启动方式） 
        3、npm run build： vue-cli 生成 生产环境部署资源 的 npm命令（常说的打包文件） 脚手架2打包，生成的是build文件 脚手架3打包，生成的是dist文件 
        4、serve build（脚手架2，把你写好的项目打包，然后在本机测试，查看是否完整） 
        serve dist（脚手架3，把你写好的项目打包，然后在本机测试，查看是否完整） 因为你最后直接给的是打包文件，交工之前直接测试一下，运行打包文件，查看项目是否完整 
        5.npm run build--report：用于查看vue-cli生产环境部署资源文件大小的 npm命令。（脚手架2、3不一样）
+ 在使用vue-cli开发vue项目时，自动刷新页面的原理你了解吗？
        自动刷新页面并不是vue-cli的功能，而是webpack的hot-module-replacement-plugin插件在做这件事，这个插件是webpack自带的插件，用来做hmr的。如果需要配置hmr只需要在webpack.config.js的devServer字段写 下面的配置即可。
        {
            contentBase: 服务器可以访问的根目录,
            hot:true, //开启热模块替换也就是hmr
            hotOnly:true //不刷新页面，只做hmr
        }
        而由于vue-cli3集成了webpack的配置，所以vue.config.js里面也有这个属性，配置写法是一样的。
+ vue-cli3插件有写过吗？怎么写一个代码生成插件？
        MyPlugin.install = function (Vue, options) {
            // 1. 添加全局方法或属性 Vue.myGlobalMethod = function () { // 逻辑... }
            // 2. 添加全局资源 Vue.directive('my-directive', { bind (el, binding, vnode, oldVnode) { // 逻辑... } ... })
            // 3. 注入组件选项 Vue.mixin({ created: function () { // 逻辑... } ... })
            // 4. 添加实例方法 Vue.prototype.$myMethod = function (methodOptions) { // 逻辑... } 
        }
+ vue-cli生成的项目可以使用es6、es7的语法吗？为什么？
        首先说结论, 有些可以直接使用, 有些不行 根据vue-cli 3.0的配置, 如果webpack能检测到, 它会自动把垫片自动打包到vendor中, 但是有些特性它检测不出来, 如es6.promise, 等
+ vue-cli怎么解决跨域的问题？
+ vue-cli中你经常的加载器有哪些？
+ 你知道什么是脚手架吗？
+ 说下你了解的vue-cli原理？你可以自己实现个类vue-cli吗？
        原理就是通过node环境发起git请求，把预先设置好的模板下载下来。
        给时间的话，应该可以实现，需要用到一些npm包，
+ 怎么使用vue-cli3创建一个项目？
+ vue-cli3你有使用过吗？它和2.x版本有什么区别？
        Vue CLI 的包名称由 vue-cli 改成了 @vue/cli vue cli 3 npm install -g @vue/cli vue create hello-world
        vue cli 2.x npm install -g vue-cli vue init webpack my-project
        vue-cli3.0将webpack的配置集成了进来，使用vue-cli3.0创建的项目在配置webpack的时候可以直接在vue.config.js里面配置。既可以用chainwebpack的链式语法也可以直接在configureWebpack字段内直接写webpack原生的配置。
+ vue-cli默认是单页面的，那要弄成多页面该怎么办呢？
+ 不用vue-cli，你自己有搭建过vue的开发环境吗？流程是什么？

# vue-router
+ vue-router怎么重定向页面？
+ vue-router怎么配置404页面？
+ 切换路由时，需要保存草稿的功能，怎么实现呢？
        1、在beforeDestroy中加入check功能,
        当检测到有草稿时, 自动保存到vuex或者storage中或者window中等等
        2、但是我要说的是, 这种方法是不靠谱的, 如果我是刷新页面呢!
        建议采用, 实施保存操作, 保存在storage中较为靠谱, 当然这种操作牺牲是比较多的
        3、用keep-alive缓存那个路由
+ vue-router路由有几种模式？说说它们的区别？
+ vue-router有哪几种导航钩子（ 导航守卫 ）？
+ 说说你对router-link的了解
+ vue-router如何响应路由参数的变化？
        切换路由，路由参数发生了变化，但是页面数据并未及时更新，需要强制刷新后才会变化。
        不同路由渲染相同的组件时（组件复用比销毁重新创建效率要高），在切换路由后，当前组件下的生命周期函数不会再被调用。
        1、使用 watch 监听
            watch: {
                $route(to, from){
                    if(to != from) {
                        console.log("监听到路由变化，做出相应的处理");
                    }
                }
            }
        2、向 router-view 组件中添加 key
            <router-view :key="$route.fullPath"></router-view>
        $route.fullPath 是完成后解析的URL，包含其查询参数信息和hash完整路径
+ 你有看过vue-router的源码吗？说说看
+ 切换到新路由时，页面要滚动到顶部或保持原先的滚动位置怎么做呢？
        滚动到顶部：在new Router()的时候，配置
        scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
        }
        保持原先滚动位置：通过router 的meta来记录需要保存滚动条的位置,在new VueRouter()时调用scrollBehavior(to, from, savedPosition) {return { x: 0, y: 0 }}的方法
    [详细](https://github.com/haizlin/fe-interview/issues/381?spm=a2c6h.13066369.0.0.30c738c18DZrsy)
+ 在什么场景下会用到嵌套路由？
        例如做个管理系统，顶部栏和左侧菜单栏是全局通用的，那就应该放在父路由，而右下的页面内容部分放在子路由 
+ 如何获取路由传过来的参数？
+ 说说active-class是哪个组件的属性？
        active-class是vue-router模块的router-link组件中的属性，用来做选中样式的切换首页
+ 在vue组件中怎么获取到当前的路由信息？
+ vur-router怎么重定向？
+ 怎样动态加载路由？
        vue-router的addRoutes方法
+ 怎么实现路由懒加载呢？
        1.vue的异步组件：resolve=>require(['需要异步加载的组件']，resolve) 
        2.es6的import方法：（）=>import(需要异步加载的组件) 
        3.webpack的 require.ensure： r => require.ensure([],()=>r( require(需要异步加载的组件))，chunkName)
+ 如果让你从零开始写一个vue路由，说说你的思路
+ 说说vue-router完整的导航解析流程是什么？
+ 路由之间是怎么跳转的？有哪些方式？
+ 如果vue-router使用history模式，部署时要注意什么？
+ route和router有什么区别？
+ vue-router钩子函数有哪些？都有哪些参数？
        全局的：beforeEach、beforeResolve、afterEach
        路由的：beforeEnter
        组件的：beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave
        参数：to、from、next；正对不同的钩子函数参数有所差异。
+ vue-router是用来做什么的？它有哪些组件？
        vue-router路由，通俗来讲主要是来实现页面的跳转，通过设置不同的path，向服务器发送的不同的请求，获取不同的资源。 
        主要组件：router-view、router-link

# vuex
+ 你有写过vuex中store的插件吗？
+ 你有使用过vuex的module吗？主要是在什么场景下使用？
+ vuex中actions和mutations有什么区别？
+ vuex使用actions时不支持多参数传递怎么办？
+ 你觉得vuex有什么缺点？
+ 你觉得要是不用vuex的话会带来哪些问题？
+ vuex怎么知道state是通过mutation修改还是外部直接修改的？
+ 请求数据是写在组件的methods中还是在vuex的action中？
+ 怎么监听vuex数据的变化？
+ vuex的action和mutation的特性是什么？有什么区别？
+ 页面刷新后vuex的state数据丢失怎么解决？
+ vuex的state、getter、mutation、action、module特性分别是什么？
+ vuex的store有几个属性值？分别讲讲它们的作用是什么？
+ 你理解的vuex是什么呢？哪些场景会用到？不用会有问题吗？有哪些特性？
+ 使用vuex的优势是什么？
+ 有用过vuex吗？它主要解决的是什么问题？推荐在哪些场景用？