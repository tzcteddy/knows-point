## qiankun的使用

<details><summary>registerMicroApps(apps, lifeCycles?)</summary><br>

```js
import { registerMicroApps } from 'qiankun';
registerMicroApps([
    {
        name:'subapp',//必选
        entry:'',//必选
        container:'#root',////必选 document.querySelector('#root')
        activeRule:'/app1',////必选 location => location.pathname.startsWith('/app1')或['/app1', '/app2']
        loader:()=>{}
        props:{}//可选，主应用需要传递给微应用的数据。
    }
],{
    //可选 Lifecycle | Array<Lifecycle> 
    beforeLoad: app => console.log('before load', app.name),//Function或数组
    beforeMount: [
      app => console.log('before mount', app.name),
    ],
    afterMount: app => console.log('after mount', app.name),
    beforeUnmount: app => console.log('before unmount', app.name),
    afterUnmount: app => console.log('after unmount', app.name),
})
```

</details>

<details><summary>start(opts?)</summary><br>

```js
import { start } from 'qiankun';
//参数可选
start({
    /**
    * 配置为 true 则会在第一个微应用 mount 完成后开始预加载其他微应用的静态资源
    * 配置为 'all' 则主应用 start 后即开始预加载所有微应用静态资源
    * 配置为 string[] 则会在第一个微应用 mounted 后开始加载数组内的微应用资源
    * 配置为 function 则可完全自定义应用的资源加载时机 (首屏应用及次屏应用)**/
    prefetch:true,//boolean | 'all' | string[] | (( apps: RegistrableApp[] ) => { criticalAppNames: string[]; minorAppsName: string[] }) - 可选，是否开启预加载，默认为 true。
    /**
     * { strictStyleIsolation: true }表示开启严格的样式隔离模式。这种模式下 qiankun 会为每个微应用的容器包裹上一个 shadow dom 节点，从而确保微应用的样式不会对全局造成影响
     * { experimentalStyleIsolation: true }qiankun 将会通过动态改写一个特殊的选择器约束来限制 css 的生效范围，应用的样式会按照如下模式改写
     * **/
    sandbox :true,//boolean | { strictStyleIsolation?: boolean, experimentalStyleIsolation?: boolean } - 可选，是否开启沙箱，默认为 true
    singular :true,//boolean | ((app: RegistrableApp<any>) => Promise<boolean>); - 可选，是否为单实例场景，单实例指的是同一时间只会渲染一个微应用。默认为 true。
    fetch:()=>{},//Function - 可选，自定义的 fetch 方法。
    getPublicPath:(url)=>url,//(url: string) => string - 可选
    getTemplate :(tpl)=>tpl,//(tpl: string) => string - 可选
    excludeAssetFilter:(assetUrl)=>true,//(assetUrl: string) => boolean - 可选，指定部分特殊的动态加载的微应用资源（css/js) 不被qiankun 劫持处理
})
```

</details>

<details><summary>setDefaultMountApp</summary><br>

```js
//设置主应用启动后默认进入的微应用。
import { setDefaultMountApp } from 'qiankun';
setDefaultMountApp('/homeApp');
```

</details>

<details><summary>runAfterFirstMounted(effect)</summary><br>

```js
//第一个微应用 mount 后需要调用的方法，比如开启一些监控或者埋点脚本。
import { runAfterFirstMounted } from 'qiankun';
runAfterFirstMounted(() => startMonitor());
```

</details>

<details><summary>手动加载微应用</summary><br>
<details><summary>loadMicroApp(app, configuration?)</summary><br>

```js
import { loadMicroApp } from 'qiankun';
loadMicroApp({//必选
    name:'',
    entry:'',
    container:'',
    props:{}
},{//可选
    sandbox:true,
    singular:false,
    fetch:()=>{},
    getPublicPath:()=>{},
    getTemplate:()=>{},
    excludeAssetFilter:()=>{}
})
```
**返回值 - MicroApp - 微应用实例**
+ mount(): Promise`<null>`;
+ unmount(): Promise`<null>`;
+ update(customProps: object): Promise`<any>`;
+ getStatus(): | "NOT_LOADED" | "LOADING_SOURCE_CODE" | "NOT_BOOTSTRAPPED" | "BOOTSTRAPPING" | "NOT_MOUNTED" | "MOUNTING" | "MOUNTED" | "UPDATING" | "UNMOUNTING" | "UNLOADING" | "SKIP_BECAUSE_BROKEN" | "LOAD_ERROR";
+ loadPromise: Promise`<null>`;
+ bootstrapPromise: Promise`<null>`;
+ mountPromise: Promise`<null>`;
+ unmountPromise: Promise`<null>`;

如果需要能支持主应用手动 update 微应用，需要微应用 entry 再多导出一个 update 钩子：

```js
export async function mount(props) {
  renderApp(props);
}
// 增加 update 钩子以便主应用手动更新微应用
export async function update(props) {
  renderPatch(props);
}
```

</details>

<details><summary>prefetchApps(apps, importEntryOpts?)</summary><br>

手动预加载指定的微应用静态资源。仅手动加载微应用场景需要，基于路由自动激活场景直接配置 prefetch 属性即可。

```js
import { prefetchApps } from 'qiankun';
prefetchApps([
    {
        name:'',
        entry :''
    }
],{//可选  加载配置

})
```

</details>

</details>


<details><summary>addGlobalUncaughtErrorHandler(handler)</summary><br>

添加全局的未捕获异常处理器。

```js
import { addGlobalUncaughtErrorHandler } from 'qiankun';
/**
 *@param handler - (...args: any[]) => void - 必选
 * **/
addGlobalUncaughtErrorHandler(event => console.log(event));
```

</details>

<details><summary>removeGlobalUncaughtErrorHandler(handler)</summary><br>

移除全局的未捕获异常处理器。

```js
import { removeGlobalUncaughtErrorHandler } from 'qiankun';
/**
 *@param handler - (...args: any[]) => void - 必选
 * **/
removeGlobalUncaughtErrorHandler(event => console.log(event));
```
</details>

<details><summary>initGlobalState(state)</summary><br>

定义全局状态，并返回通信方法，建议在主应用使用，微应用通过 props 获取通信方法。

**返回**
+ MicroAppStateActions
    - onGlobalStateChange: (callback: OnGlobalStateChangeCallback, fireImmediately?: boolean) => void， 在当前应用监听全局状态，有变更触发 callback，fireImmediately = true 立即触发 callback
    - setGlobalState: (state: Record<string, any>) => boolean， 按一级属性设置全局状态，微应用中只能修改已存在的一级属性
    - offGlobalStateChange: () => boolean，移除当前应用的状态监听，微应用 umount 时会默认调用

**主应用**
```js
import { initGlobalState, MicroAppStateActions } from 'qiankun';
// 初始化 state
const actions: MicroAppStateActions = initGlobalState(state);
actions.onGlobalStateChange((state, prev) => {
  // state: 变更后的状态; prev 变更前的状态
  console.log(state, prev);
});
actions.setGlobalState(state);
actions.offGlobalStateChange();
```
**子应用**
```js
// 从生命周期 mount 中获取通信方法，使用方式和 master 一致
export function mount(props) {
  props.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log(state, prev);
  });
  props.setGlobalState(state);
}
```

</details>
