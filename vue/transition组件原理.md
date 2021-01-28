## transition组件原理

### transition组件
这是一个抽象组件，也就是说在组件渲染完成后，不会以任何Dom的形式表现出现，只是以插槽的形式对内部的子节点进行控制。它的作用是在合适的时机进行Css类名的添加/删除或执行JavaScript钩子来达到动画执行的目的。

**转为VNode**
```js
export const transitionProps = { // transition组件接受的props属性
  appear: Boolean, // 是否首次渲染
  css: Boolean, // 是否取消css动画
  mode: String,  // in-out或out-in二选一
  type: String, // 显示声明监听animation或transition
  name: String, // 默认v
  enterClass: String, // 默认`${name}-enter`
  leaveClass: String, // 默认`${name}-leave`
  enterToClass: String, // 默认`${name}-enter-to`
  leaveToClass: String, // 默认`${name}-leave-to`
  enterActiveClass: String, // 默认`${name}-enter-active`
  leaveActiveClass: String, // 默认`${name}-leave-active`
  appearClass: String, // 首次渲染时进入
  appearActiveClass: String, // 首次渲染时持续
  appearToClass: String, // 首次渲染时离开
  duration: [Number, String, Object] // 动画时长
}

export default {
  name: 'transition',
  props: transitionProps,
  abstract: true, // 标记为抽象组件，在vue内部不会参与父子组件的构建关系

  render(h) { // 采用render函数编写，终于知道为啥叫h了
    let children = this.$slots.default // 获取默认插槽内节点
    if (!children) {
      return
    }
    if (!children.length) {
      return
    }
    if (children.length > 1) {
      ...插槽内只能有一个子节点
    }

    const mode = this.mode
    if (mode && mode !== 'in-out' && mode !== 'out-in') {
      ...mode只能是in-out或out-in
    }

    const child = children[0] // 子节点对应VNode
    const id = `__transition-${this._uid}-`
    child.key = child.key == null  // 为子节点的VNode添加key属性
      ? child.isComment // 注释节点
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key) // 原始值
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key

    (child.data || (child.data = {})).transition = extractTransitionData(this)
    // 核心！将props和钩子函数赋给子节点的transition属性，表示是一个经过transition组件渲染的VNode

    return child
  }
}

export function extractTransitionData(comp) { // 赋值函数
  const data = {}
  const options = comp.$options
  for (const key in options.propsData) { // transition组件接收到的props
    data[key] = comp[key]
  }
  const listeners = options._parentListeners // 注册在transition组件上的钩子方法
  for (const key in listeners) {
    data[key] = listeners[key]
  }
  return data
}
```
通过以上代码我们知道了，transition组件主要是做两件事情，首先为渲染子节点的VNode添加key属性，然后是在它的data属性下添加一个transition属性，表示这是一个经过transition组件渲染的VNode，在之后path创建真实Dom的过程中再另外处理。

**CSS类名实现**
```js
export function enter (vnode) { // 参数为组件插槽内的VNode
  const el = vnode.elm // 对应真实节点
  const data = resolveTransition(vnode.data.transition) // 扩展属性
  // data包含了传入的props以及扩展的6个class属性

  if (isUndef(data)) { // 如果不是transition渲染的vnode，再见
    return
  }

  ...
}

export function resolveTransition (def) { // 扩展属性
  const res = {}
  extend(res, autoCssTransition(def.name || 'v')) // class对象扩展到空对象res上
  extend(res, def) // 将def上的属性扩展到res对象上
  return res
}

const autoCssTransition (name) { // 生成包含6个需要使用到的class对象
  return {
    enterClass: `${name}-enter`,
    enterToClass: `${name}-enter-to`,
    enterActiveClass: `${name}-enter-active`,
    leaveClass: `${name}-leave`,
    leaveToClass: `${name}-leave-to`,
    leaveActiveClass: `${name}-leave-active`
  }
})
```

transition组件是分为enter和leave状态的，先看下`enter`状态：
```js
export function enter (vnode) { // 参数为组件插槽的内的VNode
  ...

  const { // 解构出需要的参数
    enterClass,
    enterToClass,
    enterActiveClass,
    appearClass,
    appearActiveClass,
    appearToClass,
    css,
    type
    // ...省略其他参数
  } = data

  const isAppear = !context._isMounted || !vnode.isRootInsert 
  // _isMounted表示组件是否mounted
  // isRootInsert表示是否根节点插入

  if (isAppear && !appear && appear !== '') {    
  //  如果没有配置appear属性，也是第一次渲染的情况直接退出，没有动画效果
    return
  }

  const startClass = isAppear && appearClass // 如果有定义appear且有对应的appearClass
    ? appearClass     // 执行定义的appearClass
    : enterClass      // 否则还是执行enterClass
  const activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass
  const toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass

  ...
}
```

核心处
```js
export function enter (vnode) {
  ...

  const expectsCSS = css !== false && !isIE9 // 没有显性的指明不执行css动画

  const cb = once(() => { // 定义只会执行一次的cb函数，只是定义并不执行
    if (expectsCSS) {
      removeTransitionClass(el, toClass) // 移除toClass
      removeTransitionClass(el, activeClass) // 移除activeClass
    }
  })

  if (expectsCSS) {
    addTransitionClass(el, startClass) // 添加startClass
    addTransitionClass(el, activeClass) // 添加activeClass
    nextFrame(() => { // requestAnimationFrame的封装，下一帧浏览器渲染回调时执行
      removeTransitionClass(el, startClass) // 移除startClass
      addTransitionClass(el, toClass) // 添加toClass
      whenTransitionEnds(el, type, cb) 
      // 浏览器过渡结束事件transitionend或animationend之后执行cb，移除toClass和activeClass
    })
  }
}
```
首先定义一个cb函数，这个函数被once函数包裹，它的作用是只让里面的函数执行一次，当然这个cb只是定义了，并不会执行。接下来同步的为当前真实节点添加startClass和activeClass，也就是我们熟悉的v-enter和v-enter-active；之后在requestAnimationFrame也就是浏览器渲染的下一帧移除startClass并添加toClass，也就是v-enter-to；最后执行whenTransitionEnds方法，这个方法是监听浏览器的动画结束事件，也就是transitionend或animationend事件，表示v-enter-active内定义的动画或过渡结束了，结束后执行上面定义cb，在这个函数里面移除toClass和activeClass。

**JavaScript钩子实现原理**

```js
export function enter(vnode) {

  if (isDef(el._leaveCb)) { // 如果进入enter时，_leaveCb没执行，立刻执行
    el._leaveCb.cancelled = true // 执行了_leaveCb的标记位
    el._leaveCb() // cb._leaveCb执行后会变成null
  }
  // el._leaveCb是leave状态里定义的cb函数，表示的是leave状态的回调函数
  // 看到下面的enter的cb定义就会知道怎么肥事

  const {
    beforeEnter,
    enter,
    afterEnter,
    enterCancelled,
    duration
    ... 其他参数
  } = data

  const userWantsControl = getHookArgumentsLength(enter) // 传入enter钩子
  // 如果钩子里enter函数的参数大于1，说明有传入done函数，表示用户想要自己控制
  // 这也是为什么enter里动画结束后需要调用done函数

  const cb = el._enterCb = once(() => { // 这里定义了el._enterCb函数，对应leave里就是el._leaveCb
    if (cb.cancelled) { // 如果在leave的状态里，enter状态的cb函数没执行，则执行enterCancelled钩子
      enterCancelled && enterCancelled(el)
    } else {
      afterEnter && afterEnter(el) // 否则正常的执行afterEnter钩子
    }
    el._enterCb = null // 执行后el._enterCb就是null了
    ... 省略css逻辑相关
  })

  mergeVNodeHook(vnode, 'insert', () => { // 将函数体插入到insert钩子内，在path中模块的created之后执行的钩子
    ...
    enter && enter(el, cb) // 执行enter钩子，传入cb，这里的cb也就是对应enter钩子里的done函数
  })

  beforeEnter && beforeEnter(el)

  nextFrame(() => {
    if (!userWantsControl) { // 如果用户不想控制
     if (duration) { // 如果有指定合法的过渡时间参数
        setTimeout(cb, duration) // setTimeout之后执行cb
      } else {
        whenTransitionEnds(el, type, cb) // 浏览器过渡结束之后的事件之后执行
      }
    }
  })
}
```
以上代码就是JavaScript钩子实现的原理，这里一定要注意它们的执行顺序： 
+ 1. 首先执行beforeEnter钩子，因为这个是同步的，cb只是定义了，insert是在created之后执行，nextFrame里面的是浏览器的下一帧，是异步的。 
+ 2. 执行插入到insert钩子里的函数体，这也是属于同步，只是在created之后，执行里面的enter钩子。 
+ 3. 如果用户不想控制动画的结束，执行nextFrame里的函数体。 
+ 4. 如果用户想控制，也就是调用了done函数，直接直接cb函数，正常来说执行里面的afterEnter钩子。

**总结**

transition组件是一个抽象组件，不会渲染出任何的Dom，它主要是帮助我们更加方便的写出动画。以插槽的形式对内部单一的子节点进行动画的管理，在渲染阶段就会往子节点的虚拟Dom上挂载一个transition属性，表示它的一个被transition组件包裹的节点，在path阶段就会执行transition组件内部钩子，钩子里分为enter和leave状态，在这个被包裹的子节点上使用v-if或v-show进行状态的切换。你可以使用Css也可以使用JavaScript钩子，使用Css方式时会在enter/leave状态内进行class类名的添加和删除，用户只需要写出对应类名的动画即可。如果使用JavaScript钩子，则也是按照顺序的执行指定的函数，而这些函数也是需要用户自己定义，组件只是控制这个的流程而已。 