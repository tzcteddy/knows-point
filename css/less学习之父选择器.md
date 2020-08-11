## less学习 父选择器

### 代表符&
```less
.parent{
    & .child{

    }
}
```
### 扩展
**输入:**
```less
.parent{
    &:hover{color: green;}
    &-sure{
        background:#e60000;
    }
    &-cancel{
        background:#dddddd;
    }
    .link{
    & > &{}
    & &{}
    &&{}
    &, &active{}
}
}
.link{
    & + &{}
    & &{}
    &&{}
    &, &active{}
}
.header{
    .menu{
        .menu-item &{}
    }
}

```
**输出:**
```less
.parent:hover{}
.parent-sure{}
.parent-cancel{}
.parent .link >.parent .link{}
.parent .link .parent .link{}
.parent .link.parent .link{}
.parent .link, .parent .linkactive{}
.link + .link{}
.link .link{}
.link.link{}
.link,.linkactive{}
.header .menu{}
.memu-item .header .menu{}
```

[Extend继承](https://less.bootcss.com/features/#extend)