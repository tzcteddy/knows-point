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

唤起键盘后 IOS的可视窗口变小 ，导致元素偏移
```js
Vue.directive('title', {
  inserted: (el, binding) => {
    document.title = binding.value
  },
  update: (el, binding) => {
    document.title = binding.value
  }
})
Vue.directive('focus',{
    inserted:(el)=>{
        el.onfocus=function(){
            if(el.timer){
                clearTimeout(el.timer)
            }
        }
        el.onblur=function(){
            clearTimeout(el.timer)
            el.timer = setTimeout(function() {
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
      }, 200)
        }
    }
})
```

【IOS】axios请求兼容
+ get：使用简单请求，避免option请求后不在发送数据请求 例如（iphone7p）