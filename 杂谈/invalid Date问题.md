## invalid Date

+ 问题
`new Date('2020-07-01 10:00:00')`谷歌浏览器可解析，有些却返回这个值`Invalid Date`，转换失败

+ 解决方案：
`new Date('2020/07/01 10:00:00')`


+ 所有浏览器都能解析的参数
```js
var d = new Date(2011, 01, 07); // yyyy, mm-1, dd  
var d = new Date(2011, 01, 07, 11, 05, 00); // yyyy, mm-1, dd, hh, mm, ss  
var d = new Date("02/07/2011"); // "mm/dd/yyyy"  
var d = new Date("02/07/2011 11:05:00"); // "mm/dd/yyyy hh:mm:ss"  
var d = new Date(1297076700000); // milliseconds  
var d = new Date("Mon Feb 07 2011 11:05:00 GMT"); // ""Day Mon dd yyyy hh:mm:ss GMT/UTC
```

