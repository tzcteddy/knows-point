## BFC是什么

>? Block Formatting Context（BFC | 块级格式化上下文），是Web页面中盒模型布局的CSS渲染模式，是一个隔离的独立容器。 

### 怎样形成一个BFC？
块级格式化上下文由以下之一创建：

+ 根元素或其它包含它的元素
+ 浮动 (元素的 float 不是 none)
+ 绝对定位的元素 (元素具有 position 为 absolute 或 fixed)
+ 非块级元素具有 display: inline-block，table-cell, table-caption, flex, inline-flex
+ 块级元素具有overflow ，且值不是 visible

### BFC用处

+ 清除浮动（规则6）
+ 布局：自适应两栏布局（规则4、5）
+ 防止垂直margin合并（规则5）

### BFC规则：

+ 内部的Box会在垂直方向，一个接一个地放置。
+ Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠
+ 每个元素的左外边缘（margin-left)， 与包含块的左边（contain box left）相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。除非这个元素自己形成了一个新的BFC。
+ BFC的区域不会与float box重叠。
+ BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
+ 计算BFC的高度时，浮动元素也参与计算