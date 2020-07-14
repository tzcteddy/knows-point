## iphone存在问题


【IOS滚动问题】`-webkit-overflow-scrolling: touch;`虽说有利于滑动的流程 但是有时会卡住，动态撑开元素是无效的
```css
.out{
 overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
}
.inner{
min-height:101%;
}
```
【IOS  textarea输入框无法输入】
添加属性 `style="-webkit-user-select:auto;" contenteditable="true"`

【IOS  图片上传】
如果使用微信API存在使用icloud云上的图片，需要用户先下载

【IOS  fixed定位问题】