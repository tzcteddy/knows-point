## 介绍PWA

>PWA(Progressive Web App):渐进式网页应用<br>使用多种技术来增强web app的功能，可以让网站的体验变得更好，能够模拟一些原生功能，比如通知推送。在移动端利用标准化框架，让网页应用呈现和原生应用相似的体验。

一个 PWA 应用首先是一个网页, 可以通过 Web 技术编写出一个网页应用. 随后添加上 App Manifest 和 Service Worker 来实现 PWA 的安装和离线等功能

+ 可以添加至主屏幕，点击主屏幕图标可以实现启动动画以及隐藏地址栏
+ 实现离线缓存功能，即使用户手机没有网络，依然可以使用一些离线功能
+ 实现了消息推送

### 组成技术

+ Service Worker
+ Promise
+ fetch
+ catch API
+ Notification API


### Service Worker
Service worker运行在worker上下文，它运行在其他线程中，它设计为完全异步；

特性：
+ 常驻内存运行
+ 代理网络请求

注意：
+ 不能访问DOM、window
+ 不能使用XHR localStorage
+ 只能由HTTPS承载

#### 创建一个项目

```shell
mkdir pwa-study
cd pwa-study

touch index.html
touch sw.js
```
启用一个http协议的服务。推荐工具 [serve](https://www.npmjs.com/package/serve)、[http-server](https://www.npmjs.com/package/http-server)

`npm install serve -g` 

执行`serve`命令

index.html:
```html
<!DOCTYPE html>
<html  lang='en'>
    <head>
        <meta charset='UTF-8'>
    </head>
    <body>
        Hello World
        <script>
            navigator.serviceWorker.register('/sw.js',{
                scope:'/'//scope可控制的相对路径
            }).then(registration=>{console.log(registration)},error=>{console.log(error)})
        </script>
    </body>
</html>
```

sw.js
```js
//self
//install事件 被安装后触发 有新的版本就会被下载安装，但不会立即生效
self.addEventListener('install', event=>{
    console.log('install',event)
    //waitUntil 接受Promise对象 推迟acticate的执行 5秒后执行
    event.waitUntil(new Promise(resolve=>{
        setTimeout(resolve,5000)
    }))
})
self.addEventListener('activate',event=>{
    console.log('activate',event)
})
self.addEventListener('fetch',   event=>{
    console.log('fetch',event)
})
```
配合特定行为
```js
self.addEventListener('install', event=>{
    console.log('install',event)
    //waitUntil 配合特定行为
    //强制停止旧的sw 并执行新的sw
    event.waitUntil(self.skipWaiting())
})
self.addEventListener('activate',event=>{
    console.log('activate',event)
    event.waitUntil(self.clients.claim())
})
```

`Service Worker`除了以上事件还有其他的一些事件 `push`、`sync`





### catch API

+ 缓存资源(css/scripts/image)
+ 依赖service worker代理网络请求
+ 支持离线程序运行

创建一个样式文件`index.css`

index.html
```html
<head>
        <meta charset='UTF-8'>
        <style src='./index.css'></style>
</head>
```

sw.js
```js
const CACHE_NAME='cache-v1';
self.addEventListener('install', event=>{
    console.log('install',event)
    event.waitUntil(caches.open(CACHE_NAME).then(cache=>{
        cache.addAll(['/','./index.css'])
    }))
})
self.addEventListener('activate',event=>{
    console.log('activate',event)
    //升级版本后清除不用的缓存空间
    event.waitUntil(caches.keys().then(cacheNames=>{
        return Promise.all(cacheNames.map(cacheName=>{
            if(cacheName!==CACHE_NAME){
               return  caches.delete(cacheName)
            }
        }))
    }))
})
self.addEventListener('fetch',   event=>{
    console.log('fetch',event)
    event.respondWith(caches.open(CACHE_NAME).then(cache=>{
        return cache.match(event.request).then(response=>{
            if(response){//命中缓存
                return response
            }
            return fetch(event.request).then(response=>{
                //增量添加缓存 key:request value:response
                cache.put(event.request,event.response.clone());
                return response
            })
        })
    }))
})
```

### Notification API

+ 依赖用户授权 
+ 适合在service worker中推送

Notification 是一个构造函数

#### 属性
`Notification.permission`： 获取权限状态 default

#### 方法

Notification.requestPermission() 这个方法在service worker中不存在  所以需要在页面上下文中授权
```js
Notification.requestPermission().then(permission=>{console.log(permission)}) //granted 允许  denied禁止
```

#### 实例化 推送
```js
/**
 * @param string 通知的title
 * @param object 
 *   {
 *      body:''//通知的副标题
 *  }
*/
new Notification('hello world',{body:'一个推送'})
```

service worker 推送
```js
self.registration.showNotification('hello world',{body:'一个推送'})
```
