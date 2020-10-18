## provisional headers are show

在请求中偶尔会出现以下这种情况:

![provisional headers are show](../../static/images/zatan/provisional/provisional.jpg)

之所以会出现这个警告，是因为去获取该资源的请求其实并（还）没有真的发生，所以 Header 里显示的是`伪信息`，直到服务器真的有响应返回，这里的 Header 信息才会被更新为真实的。不过这一切也可能不会发生，因为该请求可能会被屏蔽。比如说 AdBlock 什么的，当然了不全是浏览器扩展，具体情况具体分析了,这篇谈论情况很详细:[https://segmentfault.com/q/1010000000364871](https://segmentfault.com/q/1010000000364871)

还有大佬这样说：我相信它发生在实际请求没有发送的时候。通常在加载缓存资源时发生。

可以尝试的使用[chrome://net-internals](chrome://net-internals)工具帮忙分析

总结出现场景：
+ 一个页面的 Ajax 请求未完成就离开页面（刷新或跳转），那么 Ajax 请求会被中断，就会出现这个错误
+ 添加了block
+ 查看电脑网络

