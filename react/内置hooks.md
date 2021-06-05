## 内置Hooks

### useState

如果使用props参数当作默认值，并且转换复杂，可以使用延迟执行，写法如下：

```js
const Foo = (props)=>{
  const [data,setData]=useState(()=>{
    //可以进行复杂的转化
    return props.defaultData
  })
}
```
由于 `useState` 是要保证顺序的，所以我们一般在函数组件开始的地方调用，为了保证安全性可以使用`eslint-plugin-react-hooks`插件，配置如下：

package.json
```js
{
  "eslintConfig":{
    "extends":"react-app",
    "plugins":[
      "react-hooks"
    ],
    "rules":{
      "react-hooks/rules-of-hooks":"error"
    }
  }
}
```

### useEffect

副作用
1. 绑定事件
2. 发起请求
3. DOM操作

副作用调用时机
1. Mount 后
2. Update 后
3. Unmount 前

之前这些时机都在生命周期函数中调用，现在使用`useEffect`即可，它在render后执行，第一次相当于：componentDidMount,之后相当于：componentDidUpdate

思考：componentWillUnmount能被代替吗？

`useEffect`的回调返回一个方法，清除上一次副作用遗留下的状态，执行时机和`useEffect`相关的，如果回调是在1、3、5次调用，那么返回的方法会在2、4、6渲染之前调用，如果组件只渲染一次，那么他将在组件卸载之前调用，相当于`componentWillUnmount`

```js
function App(){
  const onResize=()=>{}
  useEffect(()=>{//每次在渲染要进行绑定吗？useEffect接受第二个参数,只有数组中所有项都不变时才不会执行，一般执行一次传空数组[]
    window.addEventListener('resize',onResize,false);
    return ()=>{
      window.removeEventListener('resize',onResize,false);
    }
  },[])
}
```

### useContext

原来的类组件中使用`context`实现数据跨组件传递
```html
<Provider value={data}>
  <Consumer>
    {data=><span>{data}</span>}
  </Consumer>
</Provider>
```
也可以使用contextType简化其使用

在hooks中`contextType`无法使用，因为它是一个类组件的静态属性，`Consumer`依然可以使用。


#### 类组件中的使用

1. 先声明`context`
```js
import { createContext, useState, Component } from "react";
const CountContext = createContext();
```

2. 创建两个组件
```js
class Bar extends Component {
  static contextType = CountContext;
  render() {
    const count = this.context;
    return <h1>{count}</h1>;
  }
}
```
```js
class Foo extends Component {
  render() {
    return (
      <CountContext.Consumer>
        {(count) => <span>{count}</span>}
      </CountContext.Consumer>
    );
  }
}
```

3. 调用
```js
function App() {
  const [count, setCount] = useState(0);
  const onClick = function () {
    setCount(count + 1);
  };
  return (
    <div className="App">
      <button
        onClick={() => {
          onClick();
        }}
      >
        Count
      </button>
      <CountContext.Provider value={count}>
        <Foo />
        <Bar />
      </CountContext.Provider>
    </div>
  );
}

```

#### 使用hooks实现

继续声明一个组件
```js
import {useContext} from 'react';
function Counter(){
  //count来自哪？？？？ 如下：
  const count=useContext(CountContext)
  return <h1>{count}</h1>;
}
```
渲染:
```js
function App() {
  const [count, setCount] = useState(0);
  const onClick = function () {
    setCount(count + 1);
  };
  return (
    <div className="App">
      <button
        onClick={() => {
          onClick();
        }}
      >
        Count
      </button>
      <CountContext.Provider value={count}>
        <Foo />
        <Bar />
        <Counter />
      </CountContext.Provider>
    </div>
  );
}
```

**注意：不要滥用context，它会破坏组件的独立性**

### useMemo&useCallback

#### useMemo
`Memo`用来优化函数组件重复渲染的行为，和`PurComponent`组件的相似的。

+ Memo: memo函数针对的是一个组件的渲染是否重复执行
+ useMemo: 定义的一段函数逻辑是否重复执行

都是利用同一个算法判断依赖是否发生改变，进而决定了是否触发对应逻辑

`useMemo`和`useEffect`的使用是相似的，第二个参数是依赖，传空数组只执行一次，不传则每次都执行。

巨大差异是`useEffect`是渲染后执行，处理副作用。但是`useMemo`是有返回值得，并且返回值参与渲染，因此`useMemo`是渲染时运行的

改造Counter组件：
```js
function Counter(props) {
  const { count } = props;
  const double = useMemo(() => {
    return count * 2;
  }, [count]);
  //useMemo可以作为依赖项
  const half = useMemo(() => {
    return double / 2;
  }, [double]);
  return (
    <div>
      <h1>Counter:{count}</h1>
      <h1>Double:{double}</h1>
      <h1>Half:{half}</h1>
    </div>
  );
}
```

#### useCallback

```js
useCallback(()=>{},[])
//等价
useMemo(()=>()=>{},[])
```

例子

```js
const Counter = memo(function Counter(props) {
  console.log("Counter渲染");
  const { double } = props;

  return (
    <div onClick={props.onClick}>
      <h1>Double:{double}</h1>
    </div>
  );
});
export default function App() {
  const [count, setCount] = useState(0);
  const double = useMemo(() => {
    return count * 2;
  }, [count === 3]);
  const onClick = function () {
    setCount(count + 1);
  };
  const onClick1 = () => {
    console.log("传入的事件");
  };

   const onClick1 = useMemo(() => {
    return ()=>{
      console.log("传入的事件");
    }
  }, []);
  const onClick1=useCallback(()=>{
    console.log("传入的事件");
  },[])
  return (
    <div className="App">
      <button
        onClick={() => {
          onClick();
        }}
      >
        Count:{count}
      </button>
      <Counter double={double} onClick={onClick1} />
    </div>
  );
}
```

解析： 由于`double`不是每次都会变化的，因此`Counter`也不会每次被渲染。但是如果我们给`Counter`传入一个方法(当前为事件),那么每当`App`渲染时，传递的事件回调方法都是新的，所以导致`Counter`在我们点击事件后也会被渲染，所以我们使用`useMemo`的特性进行优化，当然`useCallback`在这个场景下就可以代替`useMemo`了。

### useRef

+ 获取子组件或DOM节点的句柄
+ 渲染周期之间共享数据的存储

```js
import {,useState,useRef,useCallback,useEffect,PureComponent} from 'reac'
class Counter extends PureComponent {
  render() {
    const { props } = this;
    return (
      <div onClick={props.onClick}>
        
      </div>
    );
  }
}
function App(){
  const [count,setCount]=useState(0)
  const counterRef=useRef()//注意使用类组件
  const it;
  useEffect(()=>{
    setInterval(()=>{
      setCount(count=>count+1)
    },1000)
  },[])
  useEffect(()=>{
    if(count>10){
      clearInterval(it)
    }
  })
  const onClick1=useCallback(()=>{
    //这里能拿到Counter组件的句柄
    console.log(counterRef.current);
  },[])
  return (
    <div>
      <Counter ref={counterRef} onClick={onClick1}></Counter>
    </div>
  )
}
```

```js
 let it;
  useEffect(()=>{
    it=setInterval(()=>{
      setCount(count=>count+1)
    },1000)
  },[])
  useEffect(()=>{
    if(count>10){
      clearInterval(it)
    }
  })
```
以上代码目的是没秒`count`加1，满足条件`count>=10`时停止。但是表现却没那么顺利；我们改造成如下代码就可以了
```js
 const it=useRef();
  useEffect(()=>{
   it.current=setInterval(()=>{
      setCount(count=>count+1)
    },1000)
  },[])
  useEffect(()=>{
    if(count>10){
      clearInterval(it.current)
    }
  })
```



