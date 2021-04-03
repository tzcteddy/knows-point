
## window.addEventListener & window.dispatchEvent

>标准浏览器

#### 创建和初始化
```js
document.createEvent();
event.initEvent();
element.dispatchEvent();
```
|参数|事件接口|初始化方法|
|:---|---|:---|
|HTMLEvents|HTMLEvent|initEvent()|
|MouseEvents|MouseEvent|initMouseEvent()|
|UIEvents|UIEvent|initUIEvent()|

```js
window.addEventListener('hhh',function(){
	console.log('who dispatch THIS event?')
}, false);

var res = window.dispatchEvent(new Event('hhh'))
```


## CustomEvent()

```js
// add an appropriate event listener
obj.addEventListener("cat", function(e) { process(e.detail) });

// create and dispatch the event
var event = new CustomEvent("cat", {
  detail: {
    hazcheeseburger: true
  }
});
obj.dispatchEvent(event);
```
[参考](https://www.zhangxinxu.com/wordpress/2012/04/js-dom%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BA%8B%E4%BB%B6/)