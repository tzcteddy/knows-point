## referer请求头

### Referrer Policy
>Referrer-Policy 首部用来监管哪些访问来源信息

**no-referrer**
整个 Referer  首部会被移除。访问来源信息不随着请求一起发送。

**no-referrer-when-downgrade** （默认值）
在没有指定任何策略的情况下用户代理的默认行为。在同等安全级别的情况下，引用页面的地址会被发送(HTTPS->HTTPS)，但是在降级的情况下不会被发送 (HTTPS->HTTP)。

**origin**
在任何情况下，仅发送文件的源作为引用地址。例如  https://example.com/page.html 会将 https://example.com/ 作为引用地址。

**origin-when-cross-origin**
对于同源的请求，会发送完整的URL作为引用地址，但是对于非同源请求仅发送文件的源。

**same-origin**
对于同源的请求会发送引用地址，但是对于非同源请求则不发送引用地址信息。

**strict-origin**
在同等安全级别的情况下，发送文件的源作为引用地址(HTTPS->HTTPS)，但是在降级的情况下不会发送 (HTTPS->HTTP)。

**strict-origin-when-cross-origin**
对于同源的请求，会发送完整的URL作为引用地址；在同等安全级别的情况下，发送文件的源作为引用地址(HTTPS->HTTPS)；在降级的情况下不发送此首部 (HTTPS->HTTP)。

**unsafe-url**
无论是同源请求还是非同源请求，都发送完整的 URL（移除参数信息之后）作为引用地址。
这项设置会将受 TLS 安全协议保护的资源的源和路径信息泄露给非安全的源服务器。进行此项设置的时候要慎重考虑。

### referer请求头
>Referer 请求头包含了当前请求页面的来源页面的地址，即表示当前页面是通过此来源页面里的链接进入的。服务端一般使用 Referer 请求头识别访问来源，可能会以此进行统计分析、日志记录以及缓存优化等。
———— Referer - MDN - Mozilla

除了请求页面，页面里如果有图片等静态资源和接口请求，这些请求的referer就会是当前页面。比如`www.a.com`请求了`api.a.com/login`这个接口，`api.a.com/login`请求头中的referer就是`www.a.com`。如果`www.a.com`后面带了查询字符串，如`www.a.com?test=1`，则请求参数也会被referer带上，如:

        // request header
        content-length: 4408
        content-type: application/json; charset=UTF-8
        referer: www.a.com?test=1


### Chrome85 的 referer 策略修改

原本默认的 referer 策略（policy）是no-referrer-when-downgrade，即允许referer带上来源页面地址上的请求参数，Chrome85将策略修改为strict-origin-when-cross-origin，即如果请求地址与请求页面非同源，将只携带请求的域名，不会再带上来源页面地址的请求参数。

#### 为什么使用strict-origin-when-cross-origin
增强隐私：使用strict-origin-when-cross-origin将在请求非同源资源的时候，让referer只带上来源页面的源域名，不会暴露链接上的其他参数

#### 如何开启/关闭no-referrer-when-downgrade
目前只有Chrome85主动使用了no-referrer-when-downgrade这个策略，如果要在其他浏览器开启这个策略，可以分别在前后端做配置：

前端设置:
```html
<meta name="referrer" content="strict-origin-when-cross-origin" />
```

服务端可以在请求头上加上 Referer Policy 这个请求头：
```
Referer Policy: strict-origin-when-cross-origin
```

#### 关闭strict-origin-when-cross-origin

前端设置:
```html
<meta name="referrer" content="no-referrer-when-downgrade"" />
<!-- 对某个特定资源设置 referer 策略 -->
<img src="…" referrerpolicy="no-referrer-when-downgrade" />
```
服务端将Referer Policy设置为no-referrer-when-downgrade:
```
Referer Policy: no-referrer-when-downgrade
```
