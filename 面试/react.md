# 基础
## React核心概念是什么？
- 组件（Components）：React基于组件化开发，将UI拆分为独立可复用的组件。组件可以是类组件（使用ES6类语法定义）或函数组件（使用函数定义）。
- 虚拟DOM（Virtual DOM）：React使用虚拟DOM来表示UI结构，并将其与实际DOM进行比较和更新。虚拟DOM是一个轻量级的JavaScript对象树，通过对比前后两个虚拟DOM树的差异，React可以最小化对实际DOM的操作，提高性能。
- 单向数据流（One-Way Data Flow）：React采用单向数据流，也称为自顶向下的数据流动。数据通过props从父组件向子组件传递，子组件不能直接修改props，而是通过回调函数等方式通知父组件进行状态更新。
- JSX（JavaScript XML）：JSX是一种JavaScript的语法扩展，允许开发者在JavaScript代码中编写类似HTML结构的语法。JSX使得在React组件中描述UI变得更加直观和易于理解。
- 状态（State）：状态是组件内部的数据，可以通过this.state来访问和修改。状态的变化会触发组件的重新渲染，并更新UI。只有类组件可以有状态，函数组件可以使用React的钩子函数来管理状态。
- 生命周期（Lifecycle）：React组件具有生命周期方法，这些方法在组件不同的生命周期阶段被自动调用。生命周期方法包括组件的初始化、挂载、更新和卸载等阶段，可以在这些方法中执行相应的操作。
- 上下文（Context）：上下文提供了一种跨组件层级传递数据的机制，可以避免通过props一层层传递数据。上下文在组件树中的某个地方设置数据，然后在需要该数据的组件中访问它。

##  介绍JSX
JSX 是J avaScript XML 的简写。是 React 使用的一种文件，它利用 JavaScript 的表现力和类似 HTML 的模板语法。这使得 HTML 文件非常容易理解。此文件能使应用非常可靠，并能够提高其性能
## 介绍虚拟DOM
## React中Dom结构发⽣变化后内部经历了哪些变化
- setState引起状态变化
- React重新构建vnode树
- 和旧vnode树对比，得出变化部分Patches(diff算法)
- 将Patches更新到真实dom上
## React挂载的时候有3个组件，textComponent、composeComponent、domComponent，区别和关系，Dom结构发⽣生变化时怎么区分data的变化，怎么更更新，更更新怎么调度，如果更更新的时候还有其他任务存在怎么处理理
## key主要是解决哪⼀一类的问题，为什什么不不建议⽤用索引index（重绘）
## 对React看法，有没有遇到⼀一些坑
- 事件需要绑定this

# 生命周期
## React声明周期及⾃己的理理解
装载阶段：
- constructor(): 在组件被装载之前调用一次，用于初始化state和绑定方法。
- componentDidMount(): 组件挂载后（DOM已经创建）调用，常用于数据获取和订阅。

更新阶段：
- componentDidUpdate(prevProps, prevState, snapshot): 组件更新后（DOM已经更新）调用，可以访问更新前后的props和state。
- shouldComponentUpdate(): 在组件接收新的props或state时调用，用于性能优化，决定组件是否需要重新渲染。

卸载阶段：
- componentWillUnmount(): 组件即将被卸载时调用，常用于清除定时器、取消网络请求和解除事件监听。

16.3以后新增

- getDerivedStateFromProps 这个getDerivedStateFromProps是一个静态函数，所以函数体内不能访问this，简单说，就是应该一个纯函数，纯函数是一个好东西啊，输出完全由输入决定。以前需要利用被deprecate的所有生命周期函数才能实现的功能，都可以通过getDerivedStateFromProps的帮助来实现。
- getSnapshotBeforeUpdate 这函数会在render之后执行，而执行之时DOM元素还没有被更新，给了一个机会去获取DOM信息，计算得到一个snapshot，这个snapshot会作为componentDidUpdate的第三个参数传入
错误处理：
- getDerivedStateFromError 子组件树发生错误，用其渲染备用组建呢
- componentDidCatch 打印错误日志

16.3以后废弃
- componentWillReceiveProps
- componentWillMount
- componentWillUpdate
## 16.X中props改变后在哪个生命周期中处理
当组件接收到新的props时，props的改变会在componentDidUpdate生命周期中处理。‌在这个生命周期方法中，你可以比较前后的props，执行相应的操作，例如根据新的props更新组件的内部状态‌

## componentWillReceiveProps的触发条件是什么
父组件更新，会触发子组件的整套更新生命周期

componentWillReceiveProps只有props改变时才会触发，内部的state变化不会触发
## React16.3对⽣生命周期的改变
React 16.3 对组件的生命周期做了一些改变，主要是为了支持异步渲染和并发渲染。以下是一些主要的改变：
- componentWillMount 已经不再支持，它在服务器渲染和未来的并发渲染中被移除。使用 componentDidMount 代替了挂载相关的逻辑，或者使用新的生命周期方法 static getDerivedStateFromProps。
- componentWillUpdate 和 componentWillReceiveProps 也不再支持，分别被 getSnapshotBeforeUpdate 和 getDerivedStateFromProps 替代。
- 新增了 getDerivedStateFromError 方法，用于处理子组件渲染错误时的状态更新。

# 组件
## 介绍react context
Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法
- React.createContext()
- Context.Provider
- Class.contextType,方便使用this.context
- Context.Consumer
- Context.displayName

## 介绍pureComponet
- PureComponent 是优化 React 应用程序最重要的方法之一，易于实施，只要把继承类从 Component 换成 PureComponent 即可，可以减少不必要的 render 操作的次数，从而提高性能
当组件更新时，如果组件的 props 和 state 都没发生改变， render 方法就不会触发，省去 Virtual DOM 的生成和比对过程，达到提升性能的目的。
- React.PureComponent是基于浅比较，所以只要属性值是引用类型，但是修改后的值变了，但是地址不变，也不会重新渲染。在深层数据结构发生变化时可以调用 forceUpdate() 来确保组件被正确地更新。也可以用 immutable 对象加速嵌套数据的比较
- PureComponent其实就是一个继承自Component的子类，会自动加载shouldComponentUpdate函数。当组件需要更新的时候，shouldComponentUpdate会对组件的props和state进行一次浅比较。如果props和state都没有发生变化，那么render方法也就不会出发，当然也就省去了之后的虚拟dom的生成和对比，在react性能方面得到了优化。

## 介绍Function Component
## pureComponent和FunctionComponent区别
- PureComponent是类组件的一种，通过继承React.PureComponent类来创建。它可以使用类的方式定义组件，并通过继承React.Component或React.PureComponent来获得React提供的生命周期方法和状态管理功能。PureComponent实现了浅比较的shouldComponentUpdate方法，当接收到新的props或state时，会自动执行浅比较来判断是否需要重新渲染组件。这种优化可以避免不必要的渲染，提高性能。然而，PureComponent只进行浅比较，对于嵌套对象或数组，只有引用变化才会引起更新，这可能限制了其使用场景‌
- FunctionComponent是函数组件，通过函数的方式定义组件，以函数的形式接收props并返回JSX元素作为组件的输出。FunctionComponent默认情况下每次渲染都会重新执行函数体并返回新的JSX元素，不会进行浅比较。为了提高FunctionComponent的性能，可以使用React的memo函数或React Hooks中的useMemo和useCallback来实现类似的性能优化。FunctionComponent更加灵活，适用于简单的组件或函数式编程爱好者‌

## 介绍React⾼阶组件
高阶组件是一个函数(而不是组件),它接受一个组件作为参数,返回一个新的组件
高阶组件是重用组件逻辑的高级方法，是一种源于 React 的组件模式。 HOC 是自定义组件，在它之内包含另一个组件。它们可以接受子组件提供的任何动态，但不会修改或复制其输入组件中的任何行为。你可以认为 HOC 是“纯（Pure）”组件。

## 介绍下React⾼高阶组件，和普通组件有什什么区别

# 数据流
## React数据流
React是单向数据流的js框架，即数据只会朝一个方向流动，由父组件到子组件进行传递和更新

React的核心思想就是UI = Render(data)，data就是数据，Render()是React提供的纯函数，所以用户界面的展示完全取决于数据。

React是利用可复用的组件来构建界面，组件本质上是一个有限状态机，它能够记住当前所处的状态，并且能够根据不同的状态变化做出相应的操作。在React中，把这种状态定义为state，用来描述该组件对应的当前交互界面，表示当前界面展示的一种状况，React正是通过管理状态来实现对组件的管理。当state变化时，React会自动执行操作：绘制界面

React是自上而下的单向数据流，容器组件&展示组件是最常用的组件设计方案。容器组件负责处理复杂的业务逻辑和数据，展示组件负责处理UI层。通常我们会将展示组件抽出来进行封装和复用。容器组件自身通过state来管理状态，setState更新状态，从而更新UI，将自身的状态通过props传递给展示组件实现通信。

单向数据流最大的好处是所有状态改变可溯源。单向数据流就保证了父组件状态不会被子组件修改。
## ⽗⼦组件之间如何通信
- 父组件向子组件通讯: 父组件可以向子组件通过传 props 的方式，向子组件进行通讯
- 子组件向父组件通讯: props+回调的方式,父组件向子组件传递props进行通讯，此props为作用域为父组件自身的函数，子组件调用该函数，将子组件想要传递的信息，作为参数，传递到父组件的作用域中
- 兄弟组件通信: 找到这两个兄弟节点共同的父节点,结合上面两种方式由父节点转发信息进行通信
- 跨层级通信:Context( redux )设计目的是为了共享那些对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言,对于跨越多层的全局数据通过Context通信再适合不过

## props和state的区别
- props是传递给组件的（类似于函数的形参），而state是在组件内部被组件自己管理的（类似于在一个函数内声明的变量）；
- props是不可以被修改的，state是多变的，可被修改的。
开发react组件，最常用到的两个引起组件渲染的可能就是state和props

## 多个组件之间如何拆分各⾃的state，每块⼩小的组件有⾃己的状态，它们之间还有⼀一些公共的状态需要维护，如何思考这块

## React怎么做数据的检查和变化
- PropTypes：PropTypes是React提供的一种属性类型检查机制。通过在组件中定义propTypes静态属性，可以指定每个属性的类型，并在开发模式下进行验证。例如，可以检查属性是否为特定的数据类型（如字符串、数字、数组等），以及是否必需等
- 状态（State）管理：通过使用组件的状态（state），可以在组件内部存储和管理数据。通过调用setState方法，可以更新状态，并触发组件的重新渲染。在状态更新之前，可以进行必要的数据检查和变化操作
- 使用第三方库：React可以与其他数据管理库（如Redux、Mobx等）结合使用，以提供更复杂的数据检查和变化机制。这些库提供了更丰富的状态管理和数据流控制工具，适用于大型应用程序或需要更高级功能的场景



# Filbert
## 介绍下React的Filber架构
解决的问题：在v16版本以前，react的更新过程是通过递归从根组件树开始同步进行的，更新过程无法被打断，当组件树很大的时候就会出现卡顿的问题
[https://blog.csdn.net/weixin_43294560/article/details/122888711](https://blog.csdn.net/weixin_43294560/article/details/122888711)
## 画Filber渲染树
## react异步渲染的概念,介绍Time Slicing 和 Suspense
React的异步渲染是指将渲染工作分割成多个小任务，以提高应用程序的响应性能。在异步渲染中，React可以根据优先级和时间分片，将渲染工作分布在多个帧中执行，从而避免阻塞主线程。
- Time Slicing（时间切片）是React异步渲染的一种技术，它允许React在多个渲染任务之间进行时间切片，使得每个任务的执行时间限制在一个时间片段内，以确保主线程不被长时间占用。这样可以避免用户界面的卡顿和不响应现象。
- Time Slicing的核心概念是将渲染工作划分为小的任务单元，每个任务单元在一个时间片段中执行，然后根据优先级和时间限制来决定是否继续下一个任务单元。这样可以将渲染工作与用户输入事件等高优先级任务进行交替执行，从而提高应用程序的响应性。
- Suspense是React中用于处理异步数据加载的机制。通过Suspense组件和相关API，可以在等待异步操作完成时显示占位内容，而不必显示加载指示器或手动处理加载状态。
- 使用Suspense时，组件可以通过包裹异步加载的内容，指定fallback属性来定义在数据加载期间显示的占位内容。当异步操作完成后，React会自动更新界面以显示加载的内容。



# 事件
## React的事件机制（绑定⼀个事件到⼀个组件上）
在React组件中实现事件代理的常见方式是利用React的事件系统，将事件处理程序定义在父组件中，然后通过props传递给子组件。子组件通过调用这些事件处理程序来触发相应的事件。
## React组件中怎么做事件代理
## React组件事件理的原理
在React中，事件代理是基于合成事件（Synthetic Event）系统实现的。React通过在顶层使用单个事件监听器来处理所有事件，而不是将事件监听器直接附加到每个DOM元素上。当事件触发时，React会在内部处理并分发事件到正确的组件。

事件代理的原理如下：

- React在顶层创建一个事件监听器，并将其附加到根元素（通常是）上。

- 当事件在DOM树中的某个元素上触发时，事件会冒泡（Bubble Up）到根元素。

- React的事件监听器会捕获这个事件，并通过React的事件系统创建一个合成事件对象（Synthetic Event）。

- React通过遍历组件树，找到与触发事件的DOM元素相关联的组件。

- React将合成事件对象传递给相应的组件的事件处理程序（通过props传递）。

- 组件可以在事件处理程序中访问合成事件对象，并执行相应的操作。

通过事件代理，React实现了以下优势：

- 减少了事件监听器的数量：由于只需一个事件监听器，无论有多少个组件和DOM元素，都可以减少内存占用。

- 动态绑定和卸载事件处理程序：组件的创建和销毁都会自动绑定和卸载事件处理程序，无需手动管理。

- 提供了跨浏览器的一致性：React的合成事件系统解决了跨浏览器兼容性问题，使得开发者无需关心不同浏览器之间的差异。

注意：React并非完全取代了原生DOM事件，对于某些特殊需求或直接操作DOM的情况，仍然可以使用原生的事件监听和处理方式。然而，对于大多数情况下，使用React的合成事件系统和事件代理机制是更好的选择，能够提供更好的性能和开发体验。



# 性能
## React性能优化
- 代码分割，异步加载 React.lazy(()=>import('./Compoents'))
- Context 默认值提升到父组件的state中，状态提升
- 使用PureComponents减少组件更新次数
- 使用memo useCallback
- 使用shouldComponentUpdate
## 写react有哪些细节可以优化
- 使用React.memo或shouldComponentUpdate来避免不必要的重渲染。
- 使用React Fragments来减少嵌套层数。
- 使用React Portals进行跨iframe渲染。
- 使用React.lazy和Suspense进行代码分割。
- 使用React DevTools Profiler分析组件渲染性能。
- 使用React.createContext和useContext来优化Context的使用。
- 使用React.useCallback和React.useMemo来优化函数和值的复用。
- 使用React.StrictMode来进行组件渲染检查。
- 使用React.forwardRef进行ref转发。
- 使用React.useRef来访问DOM或保存可变值
## react优化
- 使用纯函数(PureComponents)防止不必要的更新
- 使用React.memo组件记忆，将函数组件包装成记忆组件，只在其属性更改时更新
- 使用组件懒加载，React.lazy和Suspense组件来按需加载
- 图片资源懒加载 借助react-lazyload
- 使用React.Fragment
- 不要使用内联函数，每次render都会创建新函数
- 使用虚拟列表 借助react-window、react-virtuazed
- 避免使用内联样式属性
- 使用唯一键key
- 使用shouldComponentUpdate来避免不必要的重渲染。
- 对图片进行压缩
- 使用CDN
- 使用useMemo、useCallback实现稳定的props传值，如果传给子组件的派生状态或函数，每次都是新引用会导致PureComponent和React.memo失效
- 避免在render中处理复杂计算，(缓存值)
- 提高代码复用，优化条件渲染
- 防抖节流




# Redux相关
## redux的设计思想，介绍Redux数据流的流程
单项数据流，
state->视图->dispatch->action->reducer-state

## 介绍redux，解决什么问题
Redux 是 JavaScript 状态容器,提供可预测化的状态管理。我的理解是，redux是为了解决react组件间通信和组件间状态共享而提出的一种解决方案，主要包括3个部分，（store + action + reducer）。

1. 组件间通信

由于connect后，各connect组件是共享store的，所以各组件可以通过store来进行数据通信，当然这里必须遵守redux的一些规范，比如遵守 view -> aciton -> reducer的改变state的路径

2. 通过对象驱动组件进入生命周期

对于一个react组件来说，只能对自己的state改变驱动自己的生命周期，或者通过外部传入的props进行驱动。通过redux，可以通过store中改变的state，来驱动组件进行update

3. 方便进行数据管理和切片

redux通过对store的管理和控制，可以很方便的实现页面状态的管理和切片。通过切片的操作，可以轻松的实现redo之类的操作

## Redux 有哪些优点
- 结果的可预测性 - 由于总是存在一个真实来源，即 store ，因此不存在如何将当前状态与动作和应用的其他部分同步的问题。
- 可维护性 - 代码变得更容易维护，具有可预测的结果和严格的结构。
- 服务器端渲染 - 你只需将服务器上创建的 store 传到客户端即可。这对初始渲染非常有用，并且可以优化应用性能，从而提供更好的用户体验。
- 开发人员工具 - 从操作到状态更改，开发人员可以实时跟踪应用中发生的所有事情。
- 社区和生态系统 - Redux 背后有一个巨大的社区，这使得它更加迷人。一个由才华横溢的人组成的大型社区为库的改进做出了贡献，并开发了各种应用。
- 易于测试 - Redux 的代码主要是小巧、纯粹和独立的功能。这使代码可测试且独立。
- 组织 - Redux 准确地说明了代码的组织方式，这使得代码在团队使用时更加一致和简单。

## Redux中间件是什什么东⻄西，接受⼏几个参数（两端的柯⾥里里化函数）
Redux中间件是Redux数据流中位于action和reducer之间的扩展点，中间件采用柯里化，接受store和next作为参数，  next用于传递action至后续的中间件或reducer，通过使用applyMiddleware应用中间件，实现对action拦截和处理
## 介绍redux接⼊入流程
## rudux和全局管理理有什什么区别（数据可控、数据响应）
## redux状态树的管理理
## Redux如何实现多个组件之间的通信，多个组件使⽤用相同状态如何进⾏管理
- 创建store createStore(reducer)
- 连接组件：connect(mapStateToProps,mapDispatchToProps)(ComponentA)
mapStateToProps和
- 共享状态
connectA connetcB

```js
import { connect } from 'react-redux'
import { setVisibilityFilter } from '@/reducers/Todo/actions'
import Link from '@/containers/Todo/components/Link'
//ownProps 组件通过props传入的参数
const mapStateToProps = (state, ownProps) => ({
    active: ownProps.filter === state.visibilityFilter
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    setFilter: () => {
        dispatch(setVisibilityFilter(ownProps.filter))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Link)
```
## connect原理
connect方法复杂点，它返回一个函数，此函数的功能是创建一个connect组件包在WrappedComponent组件外面，connect组件复制了WrappedComponent组件的所有属性，并通过redux的subscribe方法注册监听，当store数据变化后，connect就会更新state，然后通过mapStateToProps方法选取需要的state，如果此部分state更新了，connect的render方法就会返回新的组件。
```js
import React from 'react'
import PropTypes from 'prop-types'

// 高阶组件 contect 
export const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
    class Connect extends React.Component {
        // 通过对context调用获取store
        static contextTypes = {
            store: PropTypes.object
        }

        constructor() {
            super()
            this.state = {
                allProps: {}
            }
        }

        // 第一遍需初始化所有组件初始状态
        componentWillMount() {
            const store = this.context.store
            this._updateProps()
            store.subscribe(() => this._updateProps()); // 加入_updateProps()至store里的监听事件列表
        }

        // 执行action后更新props，使组件可以更新至最新状态（类似于setState）
        _updateProps() {
            const store = this.context.store;
            let stateProps = mapStateToProps ?
                mapStateToProps(store.getState(), this.props) : {} // 防止 mapStateToProps 没有传入
            let dispatchProps = mapDispatchToProps ?
                mapDispatchToProps(store.dispatch, this.props) : {
                                    dispatch: store.dispatch
                                } // 防止 mapDispatchToProps 没有传入
            this.setState({
                allProps: {
                    ...stateProps,
                    ...dispatchProps,
                    ...this.props
                }
            })
        }

        render() {
            return <WrappedComponent {...this.state.allProps} />
        }
    }
    return Connect
}

```
## redux中间件
```js
(store) => (next) => (action) => {
  next(action); // 继续传递action给下一个中间件或reducer
};
store.dispatch = loggerMiddleware(store)(store.dispatch);
```
## 使⽤过的Redux中间件
‌- redux-thunk‌：允许dispatch一个函数而不是一个纯的action对象。这在进行异步操作时非常有用，例如发起网络请求或使用定时器。Thunk中间件可以接收store作为参数，并返回一个函数，该函数可以执行异步操作，并在完成后分发新的action‌。
- ‌redux-promise‌：专门用于处理Promise对象。当action的payload是一个Promise时，中间件会等待Promise解决，并将结果作为新的payload派发一个新的action。这适用于需要进行输入输出操作的场景，例如处理fetch请求的结果‌。
- ‌redux-saga‌：用于处理更复杂的异步流程。Saga中间件提供了一个生成器函数来处理副作用，如异步操作和定时器。它允许更复杂的逻辑控制，如并行执行、竞赛条件等‌。
- redux-logger‌：用于记录日志，帮助调试和监控应用状态的变化。Logger中间件可以在dispatch action前后打印日志，帮助开发者理解状态的变化过程‌。

通过使用这些中间件，开发者可以扩展Redux的功能，处理复杂的业务逻辑，提高开发效率和应用的健壮性。
## Redux怎么实现属性传递，介绍下原理理
Provider：

从最外部封装了整个应用，并向connect模块传递store。

Connect：

包装原组件，将state和action通过props的方式传入到原组件内部。
监听store tree变化，使其包装的原组件可以响应state变化
## 中间件是怎么拿到store和action，然后怎么处理

中间件函数接收getState和dispatch作为参数，并返回一个包装后的dispatch方法。

返回的dispatch方法可以在action被发送之前或之后添加任意逻辑。
## Redux中异步的请求怎么处理
## state是怎么注入到组件的，从reducer到组件经历了什么样的过程
通过connect和mapStateToProps将state注入到组件中


## redux请求中间件如何处理理并发
Redux请求中间件处理并发的一种常见方法是使用Redux Thunk或Redux Saga。这里以Redux Thunk为例，演示如何处理并发请求：
```js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { usersReducer, postsReducer } from './reducers';
 
// 创建一个包含thunk中间件的Redux store
const store = createStore(
  combineReducers({
    users: usersReducer,
    posts: postsReducer
  }),
  applyMiddleware(thunk)
);
 
// 在action creator中返回函数，而不是直接返回action对象
function fetchUsers() {
  return async (dispatch) => {
    try {
      const users = await axios.get('/api/users');
      dispatch({ type: 'FETCH_USERS_SUCCESS', payload: users });
    } catch (error) {
      dispatch({ type: 'FETCH_USERS_FAILURE', payload: error });
    }
  };
}
 
function fetchPosts() {
  return async (dispatch) => {
    try {
      const posts = await axios.get('/api/posts');
      dispatch({ type: 'FETCH_POSTS_SUCCESS', payload: posts });
    } catch (error) {
      dispatch({ type: 'FETCH_POSTS_FAILURE', payload: error });
    }
  };
}
 
// 并发执行请求
store.dispatch(fetchUsers());
store.dispatch(fetchPosts());
```
## ‌Redux和Vuex的主要区别
‌Redux和Vuex的主要区别在于它们的设计初衷、集成度、状态管理方式、可扩展性以及学习曲线和适用性。‌

‌设计初衷与生态系统‌：Vuex专为Vue.js框架设计，与Vue.js的概念和语法紧密集成，因此在Vue社区中更为常见和受欢迎。Redux作为一个独立的库，可用于多种JavaScript框架或库，包括React，在React及其相关生态系统中有着广泛的应用‌12。

‌API与集成度‌：Vuex具有更简单的API，与Vue.js的集成度很高，集成了Vue.js的核心概念，如响应式系统和组件系统，使得在Vue项目中使用Vuex更加方便和自然。Redux的API相对较为抽象和通用，虽然Redux与React结合使用时非常强大，但在其他框架中可能需要更多的工作来集成‌12。

‌状态管理方式‌：Vuex通过mutations来同步地更改状态，通过actions来异步地更改状态。Vuex的状态是响应式的，能够实时保持数据与页面的同步。Redux也使用actions来触发状态的变化，但状态的变化是通过reducer函数来处理的。Reducer函数是一个纯函数，它接收旧的状态和一个action，返回新的状态。Redux的状态变化也是可预测和可追踪的‌13。

‌可扩展性与功能‌：Vuex提供了getters和actions等概念，getters允许组件从Store中派生一些状态，actions允许执行异步操作。这使得Vuex在处理复杂状态时更加灵活和强大。Redux由于其独立性和通用性，具有强大的中间件支持，如redux-thunk和redux-saga等，这些中间件可以轻松处理异步操作和副作用‌13。

‌学习曲线与适用性‌：对于Vue开发者来说，学习Vuex相对容易，因为它与Vue.js的概念和语法紧密相关。Vuex适用于Vue.js项目，特别是需要管理复杂状态的大型应用程序。虽然Redux的API相对抽象，但一旦掌握了其核心概念，就可以轻松地在任何JavaScript项目中应用。Redux适用于需要统一状态管理的任何规模的应用程序，特别是React项目‌12。

# React-Router相关
## 什么是React 路由
React 路由是一个构建在 React 之上的强大的路由库，它有助于向应用程序添加新的屏幕和流。这使 URL 与网页上显示的数据保持同步。它负责维护标准化的结构和行为，并用于开发单页 Web 应用。 React 路由有一个简单的API

## 为什么React Router v4中使用 switch 关键字 ？
** 用于封装 Router 中的多个路由，当你想要仅显示要在多个定义的路线中呈现的单个路线时，可以使用 “switch” 关键字。使用时， ** 标记会按顺序将已定义的 URL 与已定义的路由进行匹配。找到第一个匹配项后，它将渲染指定的路径。从而绕过其它路线。

## react-router怎么实现路由切换
使用Link组件 配置路由
## react-router里的`<Link>`标签和`<a>`标签有什什么区别

功能
- Link：在单页应用程序（SPA）中提供导航，而不会导致页面重新加载。当用户点击链接时，React会阻止浏览器默认的页面刷新行为，并且使用 react-router 提供的导航方式，只更新 URL 并渲染对应的组件，从而实现单页面应用（SPA）的效果。。
- a：单击时会导致完整页面重新加载，导航到新

性能
- Link：由于不会导致页面重新加载，因此它提供更好的用户体验，特别是在 SPA 中。它提高了性能，因为避免了不必要的网络请求。
- a：完整页面重新加载会导致较慢的用户体验，因为需要从服务器获取新页面。

无障碍
- Link：提供更好的无障碍性，因为它可以通过键盘聚焦和激活。
- a：可能不那么无障碍，因为它不提供与按钮或其他交互式元素相同的键盘导航和焦点行为。
## 如何配置React-Router
BrowserRouter 使用 HTML5 的 History API 来管理路由，而 HashRouter 使用 URL 的哈希部分来管理路由。Route 组件定义了路由的匹配规则，Switch 组件用于渲染第一个匹配的 Route 或 Redirect。Link 组件用于在应用程序中创建导航链接。
## 路由的动态加载模块
在React中，动态加载模块通常是为了实现代码分割（Code Splitting），以优化应用的加载时间。React Router提供了一个React.lazy函数和Suspense组件来实现这一功能。

以下是一个使用React Router和React.lazy实现动态加载模块的例子：
```js
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
 
// 动态导入About和Home组件
const About = lazy(() => import('./About'));
const Home = lazy(() => import('./Home'));
 
function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
}
 
export default App;
```
## 介绍路由的history

## 服务端渲染SSR


## 实现createStore
```js
export default function createStore(renduer, enhancer) {
  //如果添加了中间件就需要增强createStore
  if (enhancer) {
    return enhancer(createStore)(renduer)
  }

  let currentState
  let currentListeners = []

  function getState() {
    return currentState
  }

  function dispatch(action) {
    //修改state
    currentState = renduer(currentState, action)
    // 订阅通知
    currentListeners.forEach(listener => listener())
  }

  function subscribe(listener) {
    //添加订阅
    currentListeners.push(listener)

    return () => {
      currentListeners = []
    }
  }

  // 获取初始值 (原理：没有此type 走default: return state)
  dispatch({type: "REDUX/YYYYYYYYYY"})

  return { getState, dispatch, subscribe }
}

```

## 实现applyMiddleware
```js
export default function applyMiddleware(...middlewares) {
  return createStore => reducer => {
    const store = createStore(reducer) //返回原始{ getState, dispatch, subscribe }

    let dispatch = store.dispatch

    const midApi = {
      getState: store.getState,
      dispatch: action => dispatch(action) //dispatch随自身变化 并非是原始的store.dispatch
    }

    //*重点 midApic传递的dispatch是下面增强后的dispatch
    const middlewareChain = middlewares.map(middleware => middleware(midApi))
    dispatch = compose(...middlewareChain)(store.dispatch)

    return { ...store, dispatch }
  }
}

//传入compose(a, b, c)(...args)  返回： a(b(c(...args)))
function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}


```