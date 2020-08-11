## sass学习之基础

>变量 $
```scss
$main-color:#e60000;
```
变量支持块级作用域，嵌套规则内定义的变量只能在嵌套规则内使用（局部变量），不在嵌套规则内定义的变量则可在任何地方使用（全局变量）。将局部变量转换为全局变量可以添加 `!global` 声明：
```scss
#main {
  $width: 5em !global;
  width: $width;
}

#sidebar {
  width: $width;
}

//输出
#main {
  width: 5em;
}

#sidebar {
  width: 5em;
}
```

