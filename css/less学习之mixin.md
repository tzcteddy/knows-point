## less学习 mixin

>定义一个
```less
.block,#main{
    position:relative;
    width:300px;
    height:200px;
}
```

**使用**
```less
.container{
    .block();
}
.main{
    #main();
}
```
>如果您想创建一个mixin，但又不希望这个mixin出现在您的CSS输出中，那么在mixin定义之后加上括号。 官网案例：
**输入:**
```less
.my-mixin {
  color: black;
}
.my-other-mixin() {
  background: white;
}
.class {
  .my-mixin();
  .my-other-mixin();
}
```
**输出:**
```less
.my-mixin {
  color: black;
}
.class {
  color: black;
  background: white;
}
```

>命名空间和访问符

**定义:**
```less
#bundle() {
  .button {
    display: block;
    border: 1px solid black;
    background-color: grey;
    &:hover {
      background-color: white;
    }
  }
```
**使用:**
```less
#header a {
  color: orange;
  #bundle.button();  // 还可以书写为 #bundle > .button 形式
}
```

>传递参数

**定义:**
```less
.border-radius(@radius) {
  -webkit-border-radius: @radius;
     -moz-border-radius: @radius;
          border-radius: @radius;
}
```
**使用:**
```less
#header {
  .border-radius(4px);
}
.button {
  .border-radius(6px);
}
```
>也可以传入默认值
```less
.border-radius(@radius:5px) {
  -webkit-border-radius: @radius;
     -moz-border-radius: @radius;
          border-radius: @radius;
}
```
>传多个参数，以分号或逗号分隔。建议使用分号。逗号符号有双重含义:它可以解释为`mixin参数分隔符`或`css列表分隔符`

+ 两个参数，每个包含逗号分隔的列表:`.name(1, 2, 3; something, else) `
+ 三个参数，每个参数都包含一个数字:`.name(1, 2, 3)`
+ 使用伪分号创建mixin调用，其中一个参数包含逗号分隔的css列表`.name(1, 2, 3;)`
+ 逗号分隔的默认值:`.name(@param1: red, blue;)`

>命名参数: mixin引用可以根据参数的名称提供参数值，而不仅仅是位置。任何参数都可以通过它的名字来引用，它们不需要有任何特殊的顺序

```less
.mixin(@color: black; @margin: 10px; @padding: 20px) {
  color: @color;
  margin: @margin;
  padding: @padding;
}
.class1 {
  .mixin(@margin: 20px; @color: #33acfe);
}
.class2 {
  .mixin(#efca44; @padding: 40px);
}
//输出
.class1 {
  color: #33acfe;
  margin: 20px;
  padding: 20px;
}
.class2 {
  color: #efca44;
  margin: 10px;
  padding: 40px;
}
```

>递归mixin

**创建递归**

当与保护表达式和模式匹配相结合时，这种递归混合可以用于创建各种迭代/循环结构。
```less
.loop(@counter) when (@counter > 0) {
  .loop((@counter - 1));    // next iteration
  width: (10px * @counter); // code for each iteration
}
div {
  .loop(5); // launch the loop
}
```

一个使用递归循环生成CSS网格类的通用示例:
```less
.generate-columns(4);

.generate-columns(@n, @i: 1) when (@i =< @n) {
  .column-@{i} {
    width: (@i * 100% / @n);
  }
  .generate-columns(@n, (@i + 1));
}
//输出
.column-1 {
  width: 25%;
}
.column-2 {
  width: 50%;
}
.column-3 {
  width: 75%;
}
.column-4 {
  width: 100%;
}
```

>mixin 守卫

```js
.mixin(@a) when (lightness(@a) >= 50%) {
  background-color: black;
}
.mixin(@a) when (lightness(@a) < 50%) {
  background-color: white;
}
.mixin(@a) {
  color: @a;
}
```

[more](https://less.bootcss.com/features/#mixins-parametric-mixins)

