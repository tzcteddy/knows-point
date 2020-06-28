## css动画与display

>css在display:none和display:block之间的动画是无效的，height:0和height:auto也是无效的

### 原因
display:none会引起页面的重绘，所以是一个延时的事件，display:none是在浏览器解析动画之后执行的

### 占据空间的方式
使用`opacity`、`visibility`替代`display:none`
```js
opacity: 0;
visibility: hidden;
```
### 不占据空间的方式

不占据空间需要将元素独立出去。使用**绝对定位**

### 出现时占据空间，隐藏不占据空间
jquery里面也有淡入淡出的方法，它是怎么实现的呢？通过查资料可以知道，它是通过deferred对象通过延时display: none来实现的。好处是能够适用于出现时占据空间，消失时又不占据空间的情况。实例如下：
```js
//css
.div {
    display: none;
}
.div-animate1 {
    display: block;
    visibility: hidden;
    opacity: 0;
    transform: translate3d(100px, 0, 0);
    transition: 1s;
}
.div-animate2 {
    visibility: visible;
    opacity: 1;
    transform: translate3d(0, 0, 0);
}

//js
function divAnimate1($div, divClass1, divClass2) {
    $div.addClass(divClass1);

    setTimeout(function(){
        $div.addClass(divClass2);
    });
}
function divAnimate2($div, divClass1, divClass2) {
    $div.removeClass(divClass2);

    setTimeout(function(){
        $div.removeClass(divClass1);
    }, 1000); //1s是动画时间。
}
```

### other
还可以使用transitionend事件，window.requestanimationframe来实现