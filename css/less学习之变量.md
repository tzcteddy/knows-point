## less学习 变量
>Less是一门向后兼容的 CSS 扩展语言

### 定义变量 @
很简单：
```less
@main-color:#e60000;
@width:100px;
.main{
    width:@width;
    color:@main-color;
}
```

### 变量的使用
>使用变量来控制值，但是它们也可以在其他地方使用，比如选择器名称、属性名称、url和@import语句。

#### 选择器
```less
@selector:main;
.@{selector}{
    font-size:14px;
    color:#333333;
}
//输出
.main{
    font-size:14px;
    color:#333333;
}
```

#### URL
```less
@images: "../img";
body {
  color: #444;
  background: url("@{images}/white-sand.png");
}


@themes: "../../src/themes";
@import "@{themes}/tidal-wave.less";
```
#### 属性变量

```less
@property: color;

.widget {
  @{property}: #0ee;
  background-@{property}: #999;
}
//输出
.widget {
  color: #0ee;
  background-color: #999;
}
```

### 作用域
>Less 中的作用域与 CSS 中的作用域非常类似。首先在本地查找变量和混合（mixins），如果找不到，则从“父”级作用域继承。
`混合（mixin）和变量的定义不必在引用之前事先定义`。
```less
@var: red;

#page {
  #header {
    color: @var; // white
  }
  @var: white;
}
```
