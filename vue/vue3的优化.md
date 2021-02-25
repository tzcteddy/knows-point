## vue3的优化
![vue3](https://v3.cn.vuejs.org/images/vuemastery/black-hole.png)

### 源码优化：
**a.使用monorepo来管理源码**
+ Vue.js 2.x 的源码托管在 src 目录，然后依据功能拆分出了 compiler（模板编译的相关代码）、core（与平台无关的通用运行时代码）、platforms（平台专有代码）、server（服务端渲染的相关代码）、sfc（.vue 单文件解析相关代码）、shared（共享工具代码）等目录。
+ Vue.js 3.0，整个源码是通过 monorepo 的方式维护的，根据功能将不同的模块拆分到 packages 目录下面不同的子目录中，每个 package 有各自的 API、类型定义和测试。

**b.使用Typescript来开发源码**
+ Vue.js 2.x 选用 Flow 做类型检查，来避免一些因类型问题导致的错误，但是 Flow 对于一些复杂场景类型的检查，支持得并不好。
+ Vue.js 3.0 抛弃了 Flow ，使用 TypeScript 重构了整个项目。 TypeScript 提供了更好的类型检查，能支持复杂的类型推导；由于源码就使用 TypeScript 编写，也省去了单独维护 d.ts 文件的麻烦。

### 性能优化：
**a.引入tree-shaking的技术**
+ tree-shaking 依赖 ES2015 模块语法的静态结构（即 import 和 export），通过编译阶段的静态分析，找到没有引入的模块并打上标记。像我们在项目中没有引入 Transition、KeepAlive 等不常用的组件，那么它们对应的代码就不会打包进去。

**b.移除了一些冷门的feature**
+ Vue.js 3.0 兼容了 Vue.js 2.x 绝大部分的api，但还是移除了一些比较冷门的feature：如 keyCode 支持作为 v-on 的修饰符、$on，$off 和 $once 实例方法、filter过滤、内联模板等。

### 响应式实现优化：

**a.改用proxy api做数据劫持**
+ Vue.js 2.x 内部是通过 Object.defineProperty 这个 API 去劫持数据的 getter 和 setter 来实现响应式的。这个 API 有一些缺陷，它必须预先知道要拦截的 key 是什么，所以它并不能检测对象属性的添加和删除。
+ Vue.js 3.0 使用了 Proxy API 做数据劫持，它劫持的是整个对象，自然对于对象的属性的增加和删除都能检测到。

**b.响应式是惰性的**
+ 在 Vue.js 2.x 中，对于一个深层属性嵌套的对象，要劫持它内部深层次的变化，就需要递归遍历这个对象，执行 Object.defineProperty 把每一层对象数据都变成响应式的，这无疑会有很大的性能消耗。
+ 在 Vue.js 3.0 中，使用 Proxy API 并不能监听到对象内部深层次的属性变化，因此它的处理方式是在 getter 中去递归响应式，这样的好处是真正访问到的内部属性才会变成响应式，简单的可以说是按需实现响应式，就没有那么大的性能消耗。

### 编译优化：

**a.生成block tree**
+ Vue.js 2.x 的数据更新并触发重新渲染的粒度是组件级的，单个组件内部需要遍历该组件的整个 vnode 树。
+ Vue.js 3.0 做到了通过编译阶段对静态模板的分析，编译生成了 Block tree。Block tree 是一个将模版基于动态节点指令切割的嵌套区块，每个区块内部的节点结构是固定的。每个区块只需要追踪自身包含的动态节点。

**b.slot编译优化**
+ Vue.js 2.x 中，如果有一个组件传入了slot，那么每次父组件更新的时候，会强制使子组件update，造成性能的浪费。
+ Vue.js 3.0 优化了slot的生成，使得非动态slot中属性的更新只会触发子组件的更新。动态slot指的是在slot上面使用v-if，v-for，动态slot名字等会导致slot产生运行时动态变化但是又无法被子组件track的操作。

**c.diff算法优化**
+ 能力有限，说不清楚，可以看下这篇文章：https://blog.csdn.net/weixin_48726650/article/details/107019164
### 语法api优化

**a.优化逻辑组织**
+ 使用 Vue.js 2.x 编写组件本质就是在编写一个“包含了描述组件选项的对象”，可以把它称为 Options API。我们按照 data、props、methods、computed 这些不同的选项来书写对应的代码。这种方式对于小型的组件可能代码还能一目了然，但对于大型组件要修改一个逻辑点，可能就需要在单个文件中不断上下切换和寻找逻辑代码。
+ Vue.js 3.0 提供了一种新的 API：Composition API，它有一个很好的机制去解决这样的问题，就是将某个逻辑关注点相关的代码全都放在一个函数里，这样在修改一个逻辑时，只需要改那一块的代码了。

**b.优化逻辑复用**
+ 在 Vue.js 2.x 中，我们一般会用 mixins 去复用逻辑。当抽离并引用了大量的mixins，你就会发现两个不可避免的问题：命名冲突和数据来源不清晰。
+ Vue.js 3.0 设计的 Composition API，在逻辑复用方面就会很有优势了。

[转载](http://www.likecs.com/show-116411.html)