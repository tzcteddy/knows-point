## redux
![](https://zos.alipayobjects.com/rmsportal/PPrerEAKbIoDZYr.png)

### 简单的Redux
**state**

一个普通的`state`状态树
```js
{
  todos:[
    {
      text:'write',
      complete:false
    },{
      text:'read',
      complete:false
    }
  ],
  visibilityFilter:'SHOW_ALL'
}
```

**action**

这个普通对象不能够被其他代码随意修改，如果需要修改 `state`的数据，要发起一个`action`

```js
{type:'ADD_TODO',text:'run'}
{type:'TOGGO_TODO',index:1}
{type:'SET_VISIBILTTY_FILTER',filter:'SHOW_COMPLETED'}
```
使用`action`更清楚的描述发生了什么,我们也可以是使用函数来创建`action`

```js
function(text){
  return {
    type:"SHOW_ALL"
    text:text
  }
}
```
**reducer**

为了把 `action` 和 `state` 串起来，开发一些函数，这就是 `reducer`

```js
function visibilityFilter(state="SHOW_ALL",action){
  switch(action.type){
    case "SET_VISIBILTTY_FILTER":
      return action.filter
    default:
      return state
  }
}

function todos(state=[],action){
  switch(action.type){
    case "ADD_TODO":
      return [...state,{text:action.text,completed:false}]
    case "TOGGO_TODO":
      return state.map((item,index)=>{
        if(index===action.index){
          return {text:item.text,completed:!item.completed}
        }
        return item
      })
    default:
      return state
  }
}
```

我们将这两个分散的`reducer`整合到`reducers`中

```js
function reducers(state={},action){
  return {
    todos:todos(state.todos,action),
    visibilityFilter:visibilityFilter(state.visibilityFilter,action)
  }
}
```

### Redux API

`redux`提供了这些API供我们使用

+ `createStore`: [Function: createStore]
+ `applyMiddleware`: [Function: applyMiddleware],
+ `combineReducers`: [Function: combineReducers],
+ `bindActionCreators`: [Function: bindActionCreators],
+ `compose`: [Function: compose],


#### **createStore**

```js
var store=createStore(rootReducer,initState)
var store=createStore(rootReducer,applyMiddleware(thunkMiddleware))
```

返回一个Store

+ `dispatch`: [Function: dispatch],

  触发一个`action`
  ```js
    store.dispatch(action)
  ```
+ `getState`: [Function: getState],

  获取`state`
  ```js
  store.getState()
  ```

+ `subscribe`: [Function: subscribe],

  创建监听
  ```js
  var unsubscribe=store.subscribe(()=>{
    console.log(store.getState())
  })
  ```

+ `replaceReducer`: [Function: replaceReducer],


#### **combineReducers**

合并小的`reducer`，就像上面的`reducers`
```js
var reducers=combineReducers({
  todos,
  visibilityFilter
})
```
等价于
```js
function reducers(state={},action){
  return {
    todos:todos(state.todos,action),
    visibilityFilter:visibilityFilter(state.visibilityFilter,action)
  }
}
```

以上都是同步



https://www.redux.org.cn/