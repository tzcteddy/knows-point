## less学习 mixin

### 定义一个
```less
.block,#main{
    position:relative;
    width:300px;
    height:200px;
}
```

### 使用
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

### 命名空间和访问符

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

### 传递参数
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
>传多个参数，以分号或逗号分隔。建议使用分号。逗号符号有双重含义:它可以解释为mixin参数分隔符或css列表分隔符