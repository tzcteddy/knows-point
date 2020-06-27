## entry

> entry 对象是用于 webpack 查找启动并构建 bundle。其上下文是入口文件所处的目录的绝对路径的字符串。

### context
基础`目录`，**`绝对路径`**从配置中解析入口的起点,默认为当前目录
```
context:path.resolve(__dirname,'app')
```

### entry
> 类型：`string` | `[string]` | `object{<key>:string|[string]}` | `function:()=>string | [string] | object{<key>:string|[string]}`

起点或是应用程序的起点入口。从这个起点开始，应用程序启动执行。如果传递一个数组，那么数组的每一项都会执行。
**动态加载的模块不是入口的起点**

#### 命名
如果传入一个字符串或字符串数组，chunk 会被命名为 main。如果传入一个对象，则每个键(key)会是 chunk 的名称，该值描述了 chunk 的入口起点。

#### 动态入口
 `entry:()=>'./demo'`
 或
 `entry:()=>new Promise(resolve=>{resolve(['./demo','./demo2'])}) `
