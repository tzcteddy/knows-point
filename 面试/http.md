## HTTP1.0和HTTP1.1的一些区别
1、缓存处理<br>
    在HTTP1.0中主要使用header里的if-Modified-Since、Expires来做缓存判断的标准；HTTP1.1引入了缓存控制策略Etag、if-None-Match<br>
2、带宽优化及网络连接的使用<br>
    1.0中不支持断点续传功能，1.1则在请求头引入了range头域，它允许只请求资源的某一部分，返回206。<br>
3、错误通道的管理<br>
    1.1中新增了24个错误状态响应码<br>
4、Host头处理<br>
    1.1的请求消息和响应消息都支持Host头域，且请求消息中如果没有host会报400<br>
5、长连接<br>
    1.1支持长连接和请求的流水线处理，在一个TCP连接上可以传送多个HTTP请求和响应。减少了建立和关闭的消耗和延迟。默认开启Connection:keep-alive。

## HTTP1.0和HTTP2.0
1、http支持多路复用，同一个连接可以并发处理多个请求，方法是把http数据包拆为多个帧并发有序的发送<br>
2、HTTP2.0支持服务端推送<br>
3、HTTP2.0压缩了请求头<br>
4、HTTP2.0只适用于HTTPS场景，因为在HTTP和TCP中间加了一层SSL

## HTTP和HTTPS的区别
1、HTTPS协议需要到CA申请证书<br>
2、HTTP协议运行在TCP之上，所有传输都是明文；HTTPS运行在SSL/TLS之上，SSL/TLS运行在TCP之上，所以传输内容都经过加密<br>
3、HTTP和HTTPS使用的是完全不同的连接方式，端口也不一样HTTP->80 HTTPS->443<br>
4、HTTPS可以有效防止运营商劫持

## TCP

## GET和POST的区别

+ 表面区别<br>
    1、GET在浏览器回退时是无害的，而POST会再次请求；<br>
    2、GET请求会被浏览器主动cache，而POST不会，除非手动设置；<br>
    3、GET只能进行URL编码，而POST支持多种编码方式；<br>
    4、GET方式提交数据长度有限；<br>
    5、GET只接受ASCLL字符；<br>
    6、POST相对GET安全；<br>
    7、GET通过url参数传递，POST通过Request body
+ 重大区别<br>
    1、GET产生一个TCP数据包，POST产生两个TCP数据包；<br>
    2、GET浏览器会把header和data一起发送出去；POST先发送header服务器响应，再发送data(Firefox发送一次);<br>
    3、POST时间上消耗多一点；

## 常见的状态码

|状态码|描述|
|---|---|
|200|OK：表示从客户端发送给服务器的请求被正常处理并返回|
|204|No Content：表示客户端发送给客户端的请求得到了成功处理，但在返回的响应报文中不含实体的主体部分（没有资源可以返回）|
|206|Patial Content：表示客户端进行了范围请求，并且服务器成功执行了这部分的GET请求，响应报文中包含由Content-Range指定范围的实体内容。|
|301|Moved Permanently：永久性重定向，表示请求的资源被分配了新的URL，之后应使用更改的URL；|
|302|Found：临时性重定向，表示请求的资源被分配了新的URL，希望本次访问使用新的URL；|
|303|See Other：表示请求的资源被分配了新的URL，应使用GET方法定向获取请求的资源；|
|304|Not Modified：表示客户端发送附带条件（是指采用GET方法的请求报文中包含if-Match、If-Modified-Since、If-None-Match、If-Range、If-Unmodified-Since中任一首部）的请求时，服务器端允许访问资源，但是请求为满足条件的情况下返回改状态码；|
|400|Bad Request：表示请求报文中存在语法错误；|
|401|Unauthorized：未经许可，需要通过HTTP认证；|
|403|Forbidden：服务器拒绝该次访问（访问权限出现问题）|
|404|Not Found：表示服务器上无法找到请求的资源，除此之外，也可以在服务器拒绝请求但不想给拒绝原因时使用；|
|500|Inter Server Error：表示服务器在执行请求时发生了错误，也有可能是web应用存在的bug或某些临时的错误时；|
|503|Server Unavailable：表示服务器暂时处于超负载或正在进行停机维护，无法处理请求；|

**注意**<br>
1、301与302的区别：前者是永久移动，后者是临时移动（之后可能还会更改URL）<br>
2、302与303的区别：后者明确表示客户端应当采用GET方式获取资源

## Header有哪些

|header|描述|
|---|---|
|Accept|客户端可以接受的Body格式|
|Accept-Encoding|指定浏览器可以支持的web服务器返回内容压缩编码类型。|
|Accept-Language|浏览器可接受的自然语言的类型。|
|Accept-Control-Allow-Origin|跨域|
|Content-Type|表示请求或响应体的格式。|
|Connection|设置HTTP连接的持久化，通常都是Keep-Alive。Connection: close 表示在响应结束后，结束连接。|
|User-Agent|主要用于统计和追踪信息，用处不大。可以包含很多信息。|

## 用户输入url回车发生了什么？
URL解析- DNS解析-TCP连接-处理请求-接受响应-渲染页面
[详细](https://www.cnblogs.com/jin-zhe/p/11586327.html)