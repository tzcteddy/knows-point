## vue渲染模板

### Vue:[text-parser.js](https://github.com/vuejs/vue/blob/dev/src/compiler/parser/text-parser.js)

定义了两个正则<br>
`const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g`<br>
`const regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g`<br>

创建缓存对象<br>

```js
const buildRegex = cached(delimiters => {
  const open = delimiters[0].replace(regexEscapeRE, '\\$&')
  const close = delimiters[1].replace(regexEscapeRE, '\\$&')
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
})
```
cached接受一个回调函数，返回也是一个函数。内部创建一个空对象，实现以返回函数的参数为key,回调函数的返回为其值的功能,并将值返回
```js
export function cached<F: Function> (fn: F): F {
  const cache = Object.create(null)
  return (function cachedFn (str: string) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }: any)
}
```

创建两个集合 
`const tokens = []`
`const rawTokens = []`


### [Mustache](http://mustache.github.io/)
>[Mustache](https://github.com/janl/mustache.js)是一种没有逻辑的模板语法。它可以应用于HTML、配置文件、源代码等任何地方。 它通过使用散列或对象中提供的值在模板中展开标记来工作。

没有if语句、else子句和for循环，它只有标签。任何可以使用javascript的地方都能使用 `web浏览器`、`node.js`<br>
语法
+ 模板以包裹住内容，格式中写入的是模板的内容。 被替换的内容字段使用双花括号包裹起来"{{}}"
+ 插值表达式：双花括号{{}} 包裹替换的字段
+ {{#prop-name}}{{/prop-name}}用作for循环渲染，当prop-name的值为非空数组时，mustach会遍历该数组，渲染出个数和该数组长度相等的DOM元素
+ 也可以用作if-else判断。{{#prop-name}}{{/prop-name}}和{{prop-name}}{{/prop-name}}两组标签结合使用，当prop-name的值存在且不为false时，会渲染{{#prop-name}}{{/prop-name}}的内容，否则渲染{{prop-name}}{{/prop-name}}的内容。

####$ 使用方法
用一个唯一id的script标签包裹模板内容，type类型为text/template
```js
<script id="template" type="text/template"></script>
```

使用原生javascript方法或者jquery方法获得唯一id的script标签的html内容
```js
var template = document.getElementById('template').innerHTML.trim();
//或
var template = $("#template").html();
```

使用mustache的render方法处理模板后填充到目标位置
```js
var rendered = Mustache.render(template,obj);
$('#target').html(rendered)
```

##### Mustache.render(template,param)

两个参数：
+ `template` -模板内容
+ `param` - 对象、数组、字符串、数字

**对象**
```js
<script id="template" type="x-tmpl-mustache">
    {{name}}
</script>
<script type="text/javascript">
    var template = $("#template").html();
    //name值为函数返回值
    var r = Mustache.render(template,{
        name:function(){
            return 'abc'            //abc会替换双花括号内name
        }
    })
    //name值为字符串
    var r = Mustache.render(template,{name:'wan'})  //字符串wan会替换双花括号内的name
</script>
```
**其他类型**

```js
<script id="template" type="x-tmpl-mustache">
    {{.}}
</script>
<script type="text/javascript">
    function loadUser(){
        var template = $("#template").html();
        var r = Mustache.render(template,'wan')         //渲染出wan
        //或
        var r = Mustache.render(template,[1,d,3])       //渲染出1,d,3
        //或    
        var r = Mustache.render(template,1)             //渲染出1
    }
</script>
```

**遍历**
```js
//页面部分
<div id="target">Loading</div>
//模板
<script id="template" type="x-tmpl-mustache">
    <ul>
        {{#list}}
        <li>
            <span>{{name}}</span>
            <span>{{age}}</span>
            <span>{{job}}</span>
        </li>
        {{/list}}
    </ul>
</script>
//js部分
<script type="text/javascript">
    var template = $("#template").html();
    var r = Mustache.render(template,{
        list:[
            {name:'wannianqing',age:18,job:'The Front End'},
            {name:'wangxiaosan',age:19,job:'java'},
            {name:'lixiaosi',age:20,job:'The Front End'},
            {name:'sunxiaowu',age:21,job:'java'}
        ]
    })
    $("#target").html(r)
</script>
```
**判断**
```js
//页面部分
<div id="target">Loading</div>
//模板
<script id="template" type="x-tmpl-mustache">
    {{#isShow}}一{{/isShow}}
    {{^isShow}}二{{/isShow}}
</script>
//js部分
<script type="text/javascript">
    var template = $("#template").html();
    
    var r = Mustache.render(template,{isShow:true}); //isShow存在且为布尔值true时，显示 “一”
    var r = Mustache.render(template,{isShow:false}); //isShow存在且为布尔值true时，显示 “二”
    var r = Mustache.render(template,{}); //isShow不存在时，显示 “二”
    var r = Mustache.render(template,{isShow:[]}); //isShow存在，为空数组时，显示 “二”
    var r = Mustache.render(template,{isShow:undefined}); //isShow存在，为undefined时，显示 “二”
    var r = Mustache.render(template,{isShow:null}); //isShow存在，为null时，显示 “二”
    
    $("#target").html(r)
</script>
```


[参考](https://www.cnblogs.com/isme-zjh/p/12018141.html)

其他模板引擎
+ [Pug](https://www.pugjs.cn/api/getting-started.html)