## Iframe高度自适应内容

项目中使用iframe嵌套页面，为了优雅的显示子页面，需要使`iframe`高度自适应内容的高度，vue下代码如下：
```js
const setHeight = () => {
      const iframeWin = iframeRef.value.contentWindow || iframeRef.value.contentDocument.parentWindow
      target.value = iframeWin.document.querySelector(props.selector)
      if (iframeWin && target.value) {
        iframeRef.value.contentWindow.modal = modal
        const config = {
          attributes: true,
          childList: true,
          subtree: true,
        }
        const observer = new MutationObserver(() => {
          iframeRef.value.height = target.value?.offsetHeight || 'auto'
        })
        observer.observe(target.value, config)
        iframeRef.value.height = target.value?.offsetHeight || 'auto'
      } else {
        setTimeout(() => {
          setHeight()
        }, 100)
      }
    }
```

使用了`MutationObserver`API来实现动态计算高度的时机，当子页面内容发生变化时就重新计算。

### 问题
我们基础组计算高度的方法是这样的
```js
setInterval(function() {
  frameList.forEach(function(frame, index) {
      try {
          var currentHeight;
          frame.contentWindow && frame.contentWindow.document && frame.offsetHeight && (frame._indexFlag++,
          currentHeight = frame.contentWindow.document.body.scrollHeight,
          $(frame).height(currentHeight),
          -1 === frame._heightGroup.indexOf(currentHeight) && frame._heightGroup.push(currentHeight)),
          4 === frame._indexFlag && 3 < frame._heightGroup.length && frameList.splice(index, 1)
      } catch (e) {}
  })
}, 1500)
```

!>问题：当我的页面嵌到基础页面中，发现分页时切换到较少内容时，容器高度并没有减小，导致留下太多空白

分析：我的页面中body的样式给了min-height:100vh; 目的是给页面一个默认高度

基础的自适应实现： 使用子页面的`body.scrollHeight`, 高度设置了`style`;

此时子页面的`body`的高度会继承`iframe`的高度

**解决方案**：
  1. 去掉子页面`body`和`#app`根元素的高度设置
  2. 在询问 `iframe` 内文档的高度之前，应该将 `iframe` 对象的高度设置为`'auto'`
  3. 尝试使用内容的`offsetHeight`询问 `iframe` 内文档的高度

参考：(https://stackoverflow.com/questions/3053072/iframe-resizing-with-scrollheight-in-chrome-safari)

### 复习盒模型

到底什么是`scrollHeight`

![盒模型](../static/images/css/box.png)




