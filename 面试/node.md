



# node
## 说说 Node.js 有哪些全局对象
- Class:Buffer
- process
- console
- clearInterval、setInterval
- clearTimeout、setTimeout
- global
## 说说对 Node 中的 process 的理解？有哪些常用方法
process 对象是一个全局变量，提供了有关当前 Node.js进程的信息并对其进行控制，作为一个全局变量
我们都知道，进程计算机系统进行资源分配和调度的基本单位，是操作系统结构的基础，是线程的容器

当我们启动一个js文件，实际就是开启了一个服务进程，每个进程都拥有自己的独立空间地址、数据栈，像另一个进程无法访问当前进程的变量、数据结构，只有数据通信后，进程之间才可以数据共享

由于JavaScript是一个单线程语言，所以通过node xxx启动一个文件后，只有一条主线程

属性与方法：

- process.env：环境变量，例如通过 `process.env.NODE_ENV 获取不同环境项目配置信息
- process.nextTick：这个在谈及 EventLoop 时经常为会提到
- process.pid：获取当前进程id
- process.ppid：当前进程对应的父进程
- process.cwd()：获取当前进程工作目录，
- process.platform：获取当前进程运行的操作系统平台
- process.uptime()：当前进程已运行时间，例如：pm2 守护进程的 uptime 值
- 进程事件： process.on(‘uncaughtException’,cb) 捕获异常信息、 process.on(‘exit’,cb）进程推出监听
- 三个标准流： process.stdout 标准输出、 process.stdin 标准输入、 process.stderr 标准错误输出
process.title 指定进程名称，有的时候需要给进程指定一个名称

## 说说对 Node 中的 fs模块的理解? 有哪些常用方法
fs（filesystem），该模块提供本地文件的读写能力，基本上是POSIX文件操作命令的简单包装

方法：
- 文件读取
    - fs.readFileSync
    - fs.readFile
- 文件写入
    - fs.writeFileSync
    - fs.writeFile
- 文件追加写入
    - fs.appendFileSync
    - fs.appendFile
- 文件拷贝
    - fs.copyFileSync
    - fs.copyFile
- 创建目录
    - fs.mkdirSync
    - fs.mkdir
## 说说对 Node 中的 Buffer 的理解？应用场景？
在Node应用中，需要处理网络协议、操作数据库、处理图片、接收上传文件等，在网络流和文件的操作中，要处理大量二进制数据，而Buffer就是在内存中开辟一片区域（初次初始化为8KB），用来存放二进制数据

如果数据到达的速度比进程消耗的速度快，那么少数早到达的数据会处于等待区等候被处理。反之，如果数据到达的速度比进程消耗的数据慢，那么早先到达的数据需要等待一定量的数据到达之后才能被处理

这里的等待区就指的缓冲区（Buffer），它是计算机中的一个小物理单位

应用场景

- I/O操作
- 加密解密
- zlib.js

## 说说对 Node 中的 Stream 的理解？应用场景？
流（Stream），是一个数据传输手段，是端到端信息交换的一种方式，而且是有顺序的,是逐块读取数据、处理内容，用于顺序读取输入或写入输出

它的独特之处在于，它不像传统的程序那样一次将一个文件读入内存，而是逐块读取数据、处理其内容，而不是将其全部保存在内存中

流可以分成三部分：source、dest、pipe


应用场景：
- get请求返回文件给客户端
- 文件操作
- 一些打包工具的底层操作

## 说说Node中的EventEmitter? 如何实现一个EventEmitter

我们了解到，Node采用了事件驱动机制，而EventEmitter就是Node实现事件驱动的基础

在EventEmitter的基础上，Node几乎所有的模块都继承了这个类，这些模块拥有了自己的事件，可以绑定／触发监听器，实现了异步操作

## 说说对Nodejs中的事件循环机制理解?
- timers阶段：这个阶段执行timer（setTimeout、setInterval）的回调
- 定时器检测阶段(timers)：本阶段执行 timer 的回调，即 setTimeout、setInterval 里面的回调函数
- I/O事件回调阶段(I/O callbacks)：执行延迟到下一个循环迭代的 I/O 回调，即上一轮循环中未被执行的一些I/O回调
- 闲置阶段(idle, prepare)：仅系统内部使用
- 轮询阶段(poll)：检索新的 I/O 事件;执行与 I/O 相关的回调（几乎所有情况下，除了关闭的回调函数，那些由计时器和 setImmediate() 调度的之外），其余情况 node 将在适当的时候在此阻塞
- 检查阶段(check)：setImmediate() 回调函数在这里执行
- 关闭事件回调阶段(close callback)：一些关闭的回调函数，如：socket.on('close', ...)

还存在process.nextTick，其不属于事件循环的任何一个阶段，它属于该阶段与下阶段之间的过渡, 即本阶段执行结束, 进入下一个阶段前, 所要执行的回调，类似插队

## 说说 Node 文件查找的优先级以及 Require 方法的文件查找策略?
require方法接收一下几种参数的传递：

- 原生模块：http、fs、path等
- 相对路径的文件模块：./mod或../mod
- 绝对路径的文件模块：/pathtomodule/mod
- 目录作为模块：./dirname
- 非原生模块的文件模块：mod

缓存的模块优先级最高

原生模块：

而像原生模块这些，通过require方法在解析文件名之后，优先检查模块是否在原生模块列表中，如果在则从原生模块中加载

绝对路径、相对路径：

- 如果require绝对路径的文件，则直接查找对应的路径，速度最快

- 相对路径的模块则相对于当前调用require的文件去查找

- 如果按确切的文件名没有找到模块，则 NodeJs 会尝试带上 .js、.json或 .node拓展名再加载

目录作为模块：

- 默认情况是根据根目录中package.json文件的main来指定目录模块
- 如果目录里没有 package.json文件，或者 main入口不存在或无法解析，则会试图加载目录下的 index.js 或 index.node 文件

非原生模块：
在每个文件中都存在module.paths，表示模块的搜索路径，可以看出module path的生成规则为：从当前文件目录开始查找node_modules目录；然后依次进入父目录，查找父目录下的node_modules目录，依次迭代，直到根目录下的node_modules目录

当都找不到的时候，则会从系统NODE_PATH环境变量查找

## 如何实现jwt鉴权机制？说说你的思路
JWT（JSON Web Token），本质就是一个字符串书写规范，如下图，作用是用来在用户和服务器之间传递安全可靠的信息

在目前前后端分离的开发过程中，使用token鉴权机制用于身份验证是最常见的方案

Token，分成了三部分，头部（Header）、载荷（Payload）、签名（Signature），并以.进行拼接。其中头部和载荷都是以JSON格式存放数据，只是进行了编码

Token的使用分成了两部分：

- 生成token：登录成功的时候，颁发token
- 验证token：访问某些资源或者接口时，验证token

生成 token

借助第三方库jsonwebtoken，通过jsonwebtoken 的 sign 方法生成一个 token：

- 第一个参数指的是 Payload
- 第二个是秘钥，服务端特有
- 第三个参数是 option，可以定义 token 过期时间

校验token
使用 koa-jwt 中间件进行验证，方式比较简单
```js
/ 注意：放在路由前面
app.use(koajwt({
  secret: 'test_token'
}).unless({ // 配置白名单
  path: [/\/api\/register/, /\/api\/login/]
}))
```

- secret 必须和 sign 时候保持一致
- 可以通过 unless 配置接口白名单，也就是哪些 URL 可以不用经过校验，像登陆/注册都可以不用校验
- 校验的中间件需要放在需要校验的路由前面，无法对前面的 URL 进行校验

获取token用户的信息方法如下：
```js
router.get('/api/userInfo',async (ctx,next) =>{
    const authorization =  ctx.header.authorization // 获取jwt
    const token = authorization.replace('Beraer ','')
    const result = jwt.verify(token,'test_token')
    ctx.body = result
```

## 实现文件上传
我们需要设置请求头为content-type:multipart/form-data

```html
<form action="http://localhost:8080/api/upload" method="post" enctype="multipart/form-data">
    <input type="file" name="file" id="file" value="" multiple="multiple" />
    <input type="submit" value="提交"/>
</form>
```

文件解析

在服务器中，这里采用koa2中间件的形式解析上传的文件数据，分别有下面两种形式：

koa-body
koa-multe

## 设计分页
返回数据
```js
{
 "totalCount": 1836,   // 总的条数
 "totalPages": 92,  // 总页数
 "currentPage": 1   // 当前页数
 "data": [     // 当前页的数据
   {
 ...
   }
]
}
```
```js
const start = (page - 1) * pageSize
```
```js
const sql = `SELECT * FROM record limit ${pageSize} OFFSET ${start};`
```
关于查询数据总数的SQL语句为，record为表名：

```SELECT COUNT(*) FROM record```

## Node性能如何进行监控以及优化
Node作为一门服务端语言，性能方面尤为重要，其衡量指标一般有如下：

- CPU
- 内存
- I/O
- 网络

CPU
- CPU负载：在某个时间段内，占用以及等待CPU的进程总数
- CPU使用率：CPU时间占用状况，等于 1 - 空闲CPU时间(idle time) / CPU总时间

内存指标
```js
// /app/lib/memory.js
const os = require('os');
// 获取当前Node内存堆栈情况
const { rss, heapUsed, heapTotal } = process.memoryUsage();
// 获取系统空闲内存
const sysFree = os.freemem();
// 获取系统总内存
const sysTotal = os.totalmem();

module.exports = {
  memory: () => {
    return {
      sys: 1 - sysFree / sysTotal,  // 系统内存占用率
      heap: heapUsed / headTotal,   // Node堆内存占用率
      node: rss / sysTotal,         // Node占用系统内存的比例
    }
  }
}
```
- rss：表示node进程占用的内存总量。
- heapTotal：表示堆内存的总量。
- heapUsed：实际堆内存的使用量。
- external ：外部程序的内存使用量，包含Node核心的C++程序的内存使用量

在Node中，一个进程的最大内存容量为1.5GB。因此我们需要减少内存泄露

磁盘IO:

硬盘的IO 开销是非常昂贵的，硬盘 IO 花费的 CPU 时钟周期是内存的 164000 倍

内存 IO比磁盘IO 快非常多，所以使用内存缓存数据是有效的优化方法。常用的工具如 redis、memcached等

并不是所有数据都需要缓存，访问频率高，生成代价比较高的才考虑是否缓存，也就是说影响你性能瓶颈的考虑去缓存，并且而且缓存还有缓存雪崩、缓存穿透等问题要解决

使用('easy-monitor')监控
```js
const easyMonitor = require('easy-monitor');
easyMonitor('你的项目名称');
```
打开你的浏览器，访问 http://localhost:12333 ，即可看到进程界面
## 服务端怎么做统一的状态处理
## 如何对相对路径引⽤进行优化
## npm2和npm3+有什么区别

## 有没有涉及到Cluster

## 如何和MySQL进行通信



# Koa
## koa2中间件原理
```js
//洋葱模型
function compose(middleware){
    if(!Array.isArray(middleware)) throw new TypeError()
    for (const fn of middleware){
        if(typeof fn !== 'function') throw new TypeError()
    }
    return function(context,next){
        let index = -1
        return dispatch(0)
        function dispatch(i){
            if(i <= index){return Promsie.reject()}
            index = i
            let fn = middleware[i]
            if(i === middleware.length) fn = next
            if(!fn) return Promise.resolve()
            try{
                return Promise.resolve(fn(context,dispatch.bind(null,i+1)))
            }catch(err){
                return Promise.reject(err)
            }
        }
    }
}
```
## 常⽤的中间件
## 使⽤过的koa2中间件
‌- koa-bodyparser‌：用于处理POST请求的数据，帮助解析JSON和表单数据‌12。
‌- koa-router‌：作为路由中间件，用于定义和处理不同的路由请求‌12。
‌- koa-views‌：用于模板渲染，支持EJS等模板引擎，方便前端页面的生成‌13。
‌- koa-session‌：用于处理会话管理，保存用户会话信息‌2。
‌- koa-logger‌：用于记录日志，帮助调试和追踪请求的处理过程‌1。
## koa-body原理
一个接受option配置的方法，返回一个中间件
处理的数据类型：
- application/json  常见于post请求 未经过任何处理 以json的格式通过body传输
- application/x-www-form-urlencoded 提交的表单数据会转换为键值对并按照key1=val&key2=val2的方式进行编码，常见于POST提交表单以及原生的处理方式。
- multipart/form-data 多媒体类型 多用于上传图片文件等 以boundary作为分隔。
- text/xml 以xml的格式传输数据 多用于文本传输

核心主要依赖于co-body 做上述4种不同的数据格式的转换。通过patchNodeAndKoa 进行不同数据格式的判断。最终返回响应体。
## 介绍⾃自己写过的中间件

## koa中response.send、response.rounded、response.json发⽣了什么事，浏览器器为什么能识别到它是⼀个json结构或是html
- response.send()‌：用于发送响应给客户端。它可以接受一个字符串参数，用于直接发送文本响应。例如，ctx.response.send('Hello, world!')会将"Hello, world!"发送给客户端‌。

- response.rounded()‌：这个方法在搜索结果中没有直接提到，可能是输入错误或特定上下文中的方法。根据上下文推测，可能是指设置响应头或其他相关操作，但需要更多信息来准确解释。

- ‌response.json()‌：用于发送JSON格式的响应数据。这个方法会自动设置Content-Type为application/json，并将传入的对象序列化为JSON字符串发送给客户端。例如，ctx.response.json({message: 'success'})会将{message: 'success'}序列化为JSON并发送‌。

‌具体使用示例和说明‌：

‌response.send()‌：用于发送简单的文本响应。例如，ctx.response.send('Hello, world!')会将"Hello, world!"作为文本响应发送给客户端‌。

‌response.json()‌：用于发送JSON格式的响应数据。例如，ctx.response.json({message: 'success'})会将{message: 'success'}序列化为JSON并发送给客户端，自动设置Content-Type为application/json‌。

‌response.rounded()‌（假设为设置响应头或其他相关操作）：可能需要更多上下文信息来准确解释其具体作用。通常，这类方法可能用于设置响应的相关头部信息或其他配置‌1。

通过这些方法，Koa提供了灵活的方式来处理HTTP响应，支持文本、JSON等多种格式的数据传输，便于开发高效的Web应用‌
## koa-bodyparser怎么来解析request

# pm2
## 介绍pm2
PM2是常用的node进程管理工具，它可以提供node.js应用管理，如自动重载、性能监控、负载均衡等。同类工具有Supervisor、Forever等。
- 内建负载均衡（使用node cluster集群模块，可以使用服务器上的所有cpu）
- 后台运行（node app.js 这种命令是直接在前台运行的，不稳定，很容易断）
- 0秒停机重载（应该是上线升级的时候 不需要停机）
- 停止不稳定的进程（避免无限循环）
- 控制台检测
直接启动参数说明：

- --watch：监听应用目录的变化，一旦发生变化，自动重启。如果要精确监听、不见听的目录，最好通过配置文件。
- -i --instances：启用多少个实例，可用于负载均衡。如果-i 0或者-i max，则根据当前机器核数确定实例数目。
- --ignore-watch：排除监听的目录/文件，可以是特定的文件名，也可以是正则。比如--ignore-watch="test node_modules "some scripts""
- -n --name：应用的名称。查看应用信息的时候可以用到。
- -o --output <path>：标准输出日志文件的路径。
- -e --error <path>：错误输出日志文件的路径。
- --interpreter <interpreter>：the interpreter pm2 should use for executing app (bash, python...)。比如你用的coffee script来编写应用。

通过配置文件管理应用
PM2还支持通过配置文件管理应用，这种方式可以提供更丰富的配置，支持的配置格式是Javascript，JSON和YAML，具体可以查看文档。

文件夹结构，PM2启动后，它将自动创建这些文件夹：
- $HOME/.pm2：将包含所有PM2相关文件
- $HOME/.pm2/logs：将包含所有应用程序日志
- $HOME/.pm2/pids：将包含所有应用程序pids
- $HOME/.pm2/pm2.log：PM2 日志
- $HOME/.pm2/pm2.pid：PM2 pid
- $HOME/.pm2/rpc.sock：远程命令的套接字文件
- $HOME/.pm2/pub.sock：可发布事件的套接字文件
- $HOME/.pm2/conf.js：PM2配置

查看应用列表： `pm2 list/ls/`
查看某个应用详情： `pm2 show app_name|app_id`或者`pm2 describe app_name|app_id`
重启： `pm2 restart app.js`或者`pm2 restart app_name|app_id`
停止 `pm2 stop app_name|app_id`或者停止所有`pm2 stop all`
删除 `pm2 delete app_name|app_id`或者删除所有`pm2 delete all`
日志查看 `pm2 logs app_name|app_id` 或者查看所有应用日志`pm2 logs` [强大的日志](https://pm2.keymetrics.io/docs/usage/log-management/#log-management)
负载均衡 `pm2 start app.js -i 3`开启三个进程;`pm2 start app.js -i max `根据机器CPU核数，开启对应数目的进程
监控内存 `pm2 monit`
内存使用超过上限自动重启 `pm2 start big-array.js --max-memory-restart 20M`
监听代码变化/自动重启 `pm2 start app.js --watch`
保存/冻结进程 `pm2 save`

## master挂了了的话pm2怎么处理
如果 PM2 的 master 进程挂了，PM2 本身会尝试自动重启。这是因为在 PM2 的架构中，master 进程负责监控和管理所有的子进程，当 master 进程挂掉时，PM2 会尝试自动重启一个新的 master 进程来恢复整个系统的正常运行。这种设计可以确保即使发生意外情况，PM2 仍然能够保持应用程序的高可用性。

此外，PM2 还提供了一些高可用性和故障恢复的机制，比如集群模式和进程守护。在集群模式下，PM2 可以在多个实例上运行相同的应用程序，当一个实例挂掉时，其他实例仍然可以继续提供服务。而进程守护则可以确保即使某个进程挂了，PM2 也能够自动重新启动它，从而保证应用程序的稳定运行。

## pm2守护进程的原理
PM2 守护进程的原理主要是通过创建一个子进程来执行你的应用程序，然后父进程会监控子进程的运行状态，一旦子进程挂掉，父进程就会立即重新启动一个新的子进程，这样就可以保证应用程序一直处于运行状态。

