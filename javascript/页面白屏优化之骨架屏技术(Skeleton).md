## 页面白屏优化之骨架屏技术(Skeleton)

### 什么是骨架屏
骨架屏(Skeleton Screen)是指在页面数据加载完成前，先给用户展示出页面的大致结构（灰色占位图），在拿到接口数据后渲染出实际页面内容然后替换掉。Skeleton Screen 是近两年开始流行的加载控件，本质上是界面加载过程中的过渡效果。

Skeleton Screen 能给人一种页面内容“已经渲染出一部分”的感觉，相较于传统的 loading 效果，在一定程度上可提升用户体验。

### 实现方案
目前生成骨架屏的技术方案大概有三种：

**1、使用图片、svg 或者手动编写骨架屏代码**

使用 HTML + CSS 的方式，我们可以很快的完成骨架屏效果，但是面对视觉设计的改版以及需求的更迭，我们对骨架屏的跟进修改会非常被动，这种机械化重复劳作的方式此时未免显得有些机动性不足；

**2、 通过预渲染手动书写的代码生成相应的骨架屏**

该方案做的比较成熟的是 vue-skeleton-webpack-plugin，通过 vueSSR 结合 webpack 在构建时渲染写好的 vue 骨架屏组件，将预渲染生成的 DOM 节点和相关样式插入到最终输出的 html 中。
```js
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin');
module.exports={
   modules:{
    plugins: [
    //...
    new SkeletonWebpackPlugin({
      webpackConfig: {
        entry: {
          app: resolve('./src/entry-skeleton.js')
        }
      }
    })
  ]
 }
}
```
该方案的前提同样是编写相应页面的骨架屏组件，然后预渲染生成骨架屏所需的 DOM 节点，但由于该方案与 vue 相关技术直接关联，在当今前端框架三分天下的大环境下，我们可能需要一个更加灵活、可控的方案;

**3、饿了么内部的生成骨架页面的工具**
该方案通过一个 webpack 插件 page-skeleton-webpack-plugin 的方式与项目开发无缝集成，属于在自动生成骨架屏方面做的非常强大的了，并且可以启动 UI 界面专门调整骨架屏，但是在面对复杂的页面也会有不尽如人意的地方，而且生成的骨架屏节点是基于页面本身的结构和 CSS，存在嵌套比较深的情况，体积不会太小，并且只支持 history 模式。
```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { SkeletonPlugin } = require('page-skeleton-webpack-plugin')
const path = require('path')

module.exports={
   modules:{
    plugins: [
      //...
      new HtmlWebpackPlugin({
        // Your HtmlWebpackPlugin config
      }),
      new SkeletonPlugin({
        pathname: path.resolve(__dirname, `${customPath}`), // 用来存储 shell 文件的地址
        staticDir: path.resolve(__dirname, './dist'), // 最好和 `output.path` 相同
        routes: ['/', '/search'], // 将需要生成骨架屏的路由添加到数组中
      })
    ]
  }
}
```

### 我们也来实现一个
规则：<br>
1、遍历可见元素：非隐藏、宽高大于零、非透明元素、内容不是空格、位于浏览器窗口的元素<br>
2、针对背景图片、文字、表单项、音频视频、canvas、自动逸特征的区域来生成颜色<br>
3、页面节点使用的样式不可控，所以不可取style的尺寸相关的值，可通过getBoundingClientRect获取节点宽高距离视口距离的绝对值，计算出与当前设备宽高对应的百分比作为颜色块的单位，来适配不同设备；

首先，确定一个 rootNode 作为入口节点，比如 document.body，同时方便以后扩展到生成页面内局部的骨架屏，由此入口进行递归遍历和筛选，初步排除不可见节点。

```js
function isHideStyle(node) {
    return getStyle(node, 'display') === 'none' || 
        getStyle(node, 'visibility') === 'hidden' || 
        getStyle(node, 'opacity') == 0 ||
        node.hidden;
}
```
接下来判断元素特征，确定是否符合生成条件，对于符合条件的区域，”一视同仁”生成相应区域的颜色块。”一视同仁”即对于符合条件的区域不区分具体元素、不考虑结构层级、不考虑样式，统一根据该区域与视口的绝对距离值生成 div 的颜色块。之所以这样是因为生成的节点是扁平的，体积比较小，同时避免额外的读取样式表、通过抽离样式维持骨架屏的外观，这种统一生成的方式使得骨架屏的节点更可控。基于那上述“走捷径”的想法，该方法生成的骨架屏是由纯 DOM 颜色块拼成的。

生成颜色块的方法：
```js
const blocks = [];
// width,height,top,left 都是算好的百分比
function drawBlock({width, height, top, left, zIndex = 9999999, background, radius} = {}) {
  const styles = [
    'position: fixed',
    'z-index: '+ zIndex,
    'top: '+ top +'%',
    'left: '+ left +'%',
    'width: '+ width +'%',
    'height: '+ height +'%',
    'background: '+ background
  ];
  radius && radius != '0px' && styles.push('border-radius: ' + radius);
  // animation && styles.push('animation: ' + animation);
  blocks.push(`<div style="${ styles.join(';') }"></div>`);
}
```

绘制颜色块并不难，绘制之前的分析确认才是这个方案真正的核心和难点。比如，对于页面结构比较复杂或者大图片比较多的页面，由图片拼接的区域没有边界，生成的颜色块就会紧挨着，出现不尽如人意的地方。再比如，一个包含很多符合生成条件的小块的 card 块区域，是以 card 块为准还是以里面的小块为准来生成颜色块呢？如果以小块为准，绘制结果可能给人的感觉压根就不是一个 card 块，再加上布局方式和样式的可能性太多，大大增加了不确定因素。而如果以 card 块为准生成颜色块的话还要对 card 块做专门的规则。


**饿了么**<br>
[page-skeleton-webpack-plugin](https://github.com/ElemeFE/page-skeleton-webpack-plugin)

**Vue**<br>
[Vue-content-loader](https://github.com/egoist/vue-content-loader)

**React**<br>
[React-content-loader](https://github.com/danilowoz/react-content-loader)

**小程序**<br>
[skeleton](https://github.com/jayZOU/skeleton)