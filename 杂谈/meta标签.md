## meta标签

> MDN中介绍HTML `<meta>` 元素表示那些不能由其它HTML元相关元素` (<base>, <link>, <script>, <style> 或 <title>) `之一表示的任何元数据信息。

|特性|描述|
|:--|:--|
|内容分类|元数据内容，如果 itemprop 属性存在：流数据，表述内容|
|允许的内容|无，这是一个 空元素|
|标签省略|因为这是一个void元素，必须有开始标签而闭合标签可以省略|
|允许的父元素|`<meta charset>, <meta http-equiv>:  <head> `元素.  如果 http-equiv 不是编码声明, 它也可以放在`<noscript>`元素内，它本身在 `<head>`元素内部。|
|默认无障碍语义|没有相应的语义|
|允许的无障碍语义|没有允许的语义（role）|
|DOM 接口|HTMLMetaElement|

**meta元素定义的元数据的类型包括以下几种**
+ 如果设置了name属性，meta元素提供的是文档级别的元数据，应用于整个页面
+ 如果设置了http-equiv属性，meta元素则是编译命令，提供的信息与类似命名的HTTP头部相同
+ 如果设置了charset属性，meta元素是一个字符集声明，告诉文档用哪种字符编码
+ 如果设置了itemprop属性，meta元素提供用户定义的元数据

### 属性

> 注意: 全局属性 name 在 <meta> 元素中具有特殊的语义；另外， 在同一个 <meta> 标签中，name, http-equiv 或者 charset 三者中任何一个属性存在时，itemprop 属性不能被使用。

**charset**<br>
这个属性声明了文档的字符编码。如果使用了这个属性，其值必须是与ASCII大小写无关（ASCII case-insensitive）的"utf-8"。

**content**<br>
此属性包含http-equiv 或name 属性的值，具体取决于所使用的值。

**http-equiv**<br>
属性定义了一个编译指示指令。这个属性叫做 http-equiv(alent) 是因为所有允许的值都是特定HTTP头部的名称，如下：
+ content-security-policy <br>
它允许页面作者定义当前页的 内容策略。 内容策略主要指定允许的服务器源和脚本端点，这有助于防止跨站点脚本攻击。
+ content-type<br>
如果使用这个属性，其值必须是"text/html; charset=utf-8"。注意：该属性只能用于MIME type为 text/html 的文档，不能用于MIME类型为XML的文档。
+ default-style<br>
设置默认CSS样式表组的名称。

+ x-ua-compatible<br>

If specified, the content attribute must have the value "IE=edge". User agents are required to ignore this pragma.

+ refresh<br>
这个属性指定:
    - 如果 content 只包含一个正整数,则是重新载入页面的时间间隔(秒);
    - 如果 content 包含一个正整数并且跟着一个字符串 ';url=' 和一个合法的 URL，则是重定向到指定链接的时间间隔(秒)

设置了 refresh 值的页面可能有时间间隔太短的风险。使用诸如屏幕朗读这样的辅助技术来浏览网页的人可能会由于自动跳转而来不及读完或理解网页的内容。这样不经提示而突然进行的页面刷新也可能会让有视力障碍的人群感到迷惑。

**name**<br>
name 和 content 属性可以一起使用，以名-值对的方式给文档提供元数据，其中 name 作为元数据的名称，content 作为元数据的值。

+ `author`，就是这个文档的作者名称，可以用自由的格式去定义；
+ `description`，其中包含页面内容的简短和精确的描述。 一些浏览器，如Firefox和Opera，将其用作书签页面的默认描述。
+ `generator`, 包含生成页面的软件的标识符。
+ `keywords`, 包含与逗号分隔的页面内容相关的单词。
+ `referrer`  控制所有从该文档发出的 HTTP 请求中HTTP Referer 首部的内容：
<meta name="referrer"> content 属性可取的值：

|值|描述|
|:--|:--|
|no-referrer|不要发送 HTTP Referer 首部。|
|origin|发送当前文档的 origin。|
|no-referrer-when-downgrade|当目的地是先验安全的(https->https)则发送 origin 作为 referrer ，但是当目的地是较不安全的 (https->http)时则不发送 referrer 。这个是默认的行为。|
|origin-when-crossorigin|在同源请求下，发送完整的URL (不含查询参数) ，其他情况下则仅发送当前文档的 origin。|
|unsafe-URL|在同源请求下，发送完整的URL (不含查询参数)。|

> 注意：动态地插入<meta name="referrer"> (通过 document.write 或者 appendChild) 是不起作用的。同样注意如果同时有多个彼此冲突的策略被定义，那么 no-referrer 策略会生效。


+ `viewport`, 它提供有关视口初始大小的提示，仅供移动设备使用

|Value|可能值|描述|
|:--|---|:--|
|width|一个正整数或者字符串 device-width|以pixels（像素）为单位， 定义viewport（视口）的宽度|
|height|一个正整数或者字符串 device-height|以pixels（像素）为单位， 定义viewport（视口）的高度。|
|initial-scale|一个0.0 到10.0之间的正数|定义设备宽度（纵向模式下的设备宽度或横向模式下的设备高度）与视口大小之间的缩放比率。|
|maximum-scale|一个0.0 到10.0之间的正数|定义缩放的最大值；它必须大于或等于minimum-scale的值，不然会导致不确定的行为发生。|
|minimum-scale|一个0.0 到10.0之间的正数|定义缩放的最小值；它必须小于或等于maximum-scale的值，不然会导致不确定的行为发生。|
|user-scalable|一个布尔值（yes 或者no）|如果设置为 no，用户将不能放大或缩小网页。默认值为 yes。|



### 一些meta的使用

```html

<meta charset=’utf-8′>    //声明文档使用的字符编码

<meta http-equiv=”X-UA-Compatible” content=”IE=edge,chrome=1″/>   优先使用 IE 最新版本和 Chrome 指定IE和Chrome使用最新版本渲染当前页面

<meta name=”description” content=”不超过150个字符”/>       页面描述

<meta name=”keywords” content=””/>      页面关键词

<meta name=”author” content=”name, email@gmail.com”/>    网页作者

<meta name=”robots” content=”index,follow”/>      搜索引擎抓取

<meta name=”viewport” content=”initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no”> 为移动设备添加 viewport

<meta name=”apple-mobile-web-app-title” content=”标题”> iOS 设备 begin

<meta name=”apple-mobile-web-app-capable” content=”yes”/>  添加到主屏后的标题（iOS 6 新增）

是否启用 WebApp 全屏模式，删除苹果默认的工具栏和菜单栏

<meta name=”apple-itunes-app” content=”app-id=myAppStoreID, affiliate-data=myAffiliateData, app-argument=myURL”>

添加智能 App 广告条 Smart App Banner（iOS 6+ Safari）

<meta name=”apple-mobile-web-app-status-bar-style” content=”black”/>

<meta name=”format-detection” content=”telphone=no, email=no”/>  设置苹果工具栏颜色

<meta name=”renderer” content=”webkit”>  启用360浏览器的极速模式(webkit)

<meta http-equiv=”X-UA-Compatible” content=”IE=edge”>     避免IE使用兼容模式

<meta http-equiv=”Cache-Control” content=”no-siteapp” />    不让百度转码

<meta name=”HandheldFriendly” content=”true”>     针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓

<meta name=”screen-orientation” content=”portrait”>   uc强制竖屏

<meta name=”x5-orientation” content=”portrait”>    QQ强制竖屏

<meta name=”full-screen” content=”yes”>              UC强制全屏

<meta name=”x5-fullscreen” content=”true”>       QQ强制全屏

<meta name=”browsermode” content=”application”>   UC应用模式

<meta name=”x5-page-mode” content=”app”>    QQ应用模式

设置页面不缓存

<meta http-equiv=”pragma” content=”no-cache”>

<meta http-equiv=”cache-control” content=”no-cache”>

<meta http-equiv=”expires” content=”0″>

页面应用链接强制转换为https协议
<meta http-equiv="Content-Security-Policy" Content="upgrade-insecure-requests">

```

