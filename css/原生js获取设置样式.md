## 原生js获取设置样式


### 获取样式

1. `dom.style.样式属性`

+ 作用：获取内联样式，如果获取的样式没有设置或者不是内联样式，则输出空字符串""；
+ 缺点：获取不到嵌入样式和外部样式。

2. `dom.currentStyle.样式属性`

+ 作用：获取元素渲染之后的样式；
+ 缺点：只能在IE浏览器使用。

3. `window.getComputedStyle(dom).样式属性`

+ 作用：获取元素样式的最终计算值；
+ 缺点：不兼容IE8及以下版本。

4. `dom.style.getPropertyValue(属性名)`

```js
var declaration = document.styleSheets[0].cssRules[0].style;
var value = declaration.getPropertyValue('margin'); // "1px 2px"
```
#### 设置样式

1. `dom.style.样式属性 = 属性值`

+ 作用：设置内联样式；
+ 缺点：无法设置!important，设置后语句会失效

2. `dom.style.setProperty(样式属性, 属性值)`

+ 作用：设置内联样式，可以设置`!important`，语法为`DOM节点.style.setProperty(样式名, 样式值, 'important')`。

3. `dom.setAttribute("style",样式值)`

+ 作用：可以设置多条内联样式，可以设置`!important`。

4. `dom.style.cssText = 样式值`

+ 作用：设置多个内联样式，可以设置!important。

5. `document.styleSheets[数字].insertRule(样式)`

+ 作用：在样式表中添加样式；
+ 注意：`document.styleSheets`用于获取应用在文档的所有样式表，获取到的结果会以数组返回，因此需要添加下标来表示`document.styleSheets[数字]`来表示某个样式表；
+ 缺点：不支持IE，文档需要有外部样式表或者嵌入样式表至少一个。

6. `document.styleSheets[数字].addRule(选择器,样式)`

+ 作用：在样式表中添加样式；
+ 缺点：只能在IE浏览器使用，文档需要有外部样式表或者嵌入样式表至少一个。
