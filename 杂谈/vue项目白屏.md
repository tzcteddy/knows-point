## vue项目白屏

使用vue开发的项目调试阶段很顺畅，上线后就有反应白屏的情况。为了纪念马拉多纳(2020-11-26)，今天记录一下集中白屏的原因。

导致白屏有以下原因：
+ 引用文件路径错误，包括：静态文件的引用失败
+ 兼容问题,这个就有很多方面了
+ IP访问时
+ 针对性的白屏 比如IOS10及其以下

### npm run build打包页面空白
我们会发现页面head中引用的js和css文件是出现了路径错误，这里修改如下：

解决位置：config/index.js文件：把assetsPublicPath: '/'改为assetsPublicPath: './'
```js
build: {
    assetsPublicPath: './',
}
```
或<br>
vue.config.js
```js
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
```

### IOS的Safari下无法打开
webpack-dev-server >= 2.8.0 的版本在 iOS Safari 下无法打开网页，效果为白屏。

控制台报错：Can't find variable: SockJS 应该是 Safari 的 BUG，比如下面的代码就会抛出 

`Error eval("const a = function () {}; function b() { a(); }; b();")`

1、使用老版本

`yarn add webpack-dev-server@~2.7.0 -D`

2、

`yarn add babel-plugin-transform-es2015-block-scoping -D`

修改webpack配置：
```js
{
  test: /\.js$/,
  loader: 'babel-loader',
  include: [
    ...,
    /node_modules\/webpack-dev-server/
  ]
}
```

### Vue2+ 部分手机白屏
npm run dev后可能出现无法加载到路由模板的信息。

解决位置：config/index.js文件：把 devtool: '#eval-source-map'  改为`devtool:'inline-source-map'`
```js
dev:{
  devtool:'inline-source-map'
}
```

### IP访问页面

```js
dev:{
  host:'0.0.0.0'//或者电脑IP
}
```

### 低版本IE,Andriod兼容性
babel支持了es6+的语法。并没有转化API，Promise、Symbol等新的方法时报错

    npm install babel-polyfill
    npm install es6-promise

main.js
```js
import 'babel-polyfill'
import Vue from 'vue'
import Es6Promise from 'es6-promise'
Es6Promise.polyfill()
```

webpack.config.js
```js
module.exports = {
     entry: {
     app: ["babel-polyfill", "./src/main.js"]
     }
};
```

### 只在IOS10 出现
1、出现变量定义两次的错误描述，如下：

`SyntaxError: Cannot declare a let variable twice`

原因是由于ios 10中Safari中错误描述如下:当你定义一个与参数同名的for循环迭代变量时，我们错误地认为这是一个语法错误。解决方法如下：

找到webpack.prod.conf.js文件，在UglifyPlugin的定义里添加关于mangle的选项
```js
new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        },
        mangle: {
          safari10: true//重要
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
}),
```
2、使用Swiper插件：这是由于Swiper插件中用到了ES6的语法 `a = b ** c`，a是b的c次方，而iOS 10的Safari里不认识这样的语法，认为这是一个错误，所以你需要让Swiper经过babel的包装，而默认状态下`babel是不对node_modules里的模块进行编译的`。解决方法是在项目根目录下新建一个文件vue.config.js，在里面添加如下语句：
```js
module.exports = {
  chainWebpack: config => {
    config.rule('js').include.add(/node_modules\/(dom7|swiper)\/.*/)
  }
}
```
或<br>
vue.config.js
```js
module.export={
  transpileDependencies: [
    'swiper',
    'dom7',
    'ssr-window'
  ]
}
```
**如果打包出的dist文件中存在箭头函数、let、count**在低版本也是会出现白屏，`IOS8.3`中遇到的 main.js都不会执行，是因为vue等也没有被babel转译。粗暴处理将node_modules都经过babel

### vue项目配置 autoprefixer 报出警告问题
原因是版本高了，引用有修改
postcss.config.js
```js
//更改前
module.exports = {
  plugins: {
    'autoprefixer': {
      browsers: ['Android >= 4.0', 'iOS >= 7']
    },
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*']
    }
  }
}
//更改后
module.exports = {
  plugins: {
    'autoprefixer': {
      overrideBrowserslist: [
        "Android 4.1",
        "iOS 7.1",
        "Chrome > 31",
        "ff > 31",
        "ie >= 8"
      ]
    },
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*']
    }
  }
}
```
