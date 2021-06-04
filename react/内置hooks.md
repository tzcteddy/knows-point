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
