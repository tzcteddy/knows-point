## 配置vue.config.js

### 配置选项

#### `publicPath`
>   Type:string<br>
    Default:'/' <br>
    部署应用包时的基本URL，用法和webpack的output.publicPath一致<br>
    这个值也可以是`空字符串`或`'./'`,这样所有的资源都会被链接为相对路径，这样打包出来的包可以部署再任意路径

```js
module.exports={
    publicPath:process.env.NODE_ENV==='production'?'production_path':'./'
}
```

#### `outputDir`
>   Type:string <br>
    Default:'dist' <br>
    输出文件目录，当运行`vue-cli-server build`时生成的生产环境构建文件的目录。注意目标目录在构建之前会被清除，构建时传入(--no-clean)可关闭该行为

#### `assetsDir`
>   Type:string<br>
    Default:''<br>
    放置生成的静态资源 (js、css、img、fonts) 的目录。

```js
module.exports={
    //基本路径
    publicPath:'./',
    //构建时输出目录
    outputDir:'dist',
    //放置静态资源目录
    assetsDir:'static'
}

//注：从生成的资源覆写 filename 或 chunkFilename 时，assetsDir 会被忽略。
```

#### `indexPath`
>   Type:string <br>
    Default:'index.html' <br>
    指定的index.html的输出路径(相对于outputDir),也可以是绝对路径

#### `filenameHashing`
>   Type:boolean<br>
    Default:true
    默认情况下，生成的静态资源在他们的文件中包含了hash以便更好地控制缓存。然而这也要求index的HTML是被vue cli自动生成的。如果无法使用vue cli生成的index HTML，可以通过这个选项设为false来关闭文件hash

#### `pages`
>   Type:object<br>
    Default:undefined <br>
    在 multi-page（多页）模式下构建应用。每个“page”应该有一个对应的 JavaScript 入口文件。<br>
    其值应该是一个对象，对象的 key 是入口的名字，value 是：<br>
    一个指定了 entry, template, filename, title 和 chunks 的对象 (除了 entry 之外都是可选的)；<br>
    或一个指定其 entry 的字符串。

```js
module.exports={
    pages:{
        index:{
            //page的入口文件
            entry:'src/index/main.js',
            //模板文件
            template:'public/index.html',
            //在dist/index.html输出文件
            filename:'index.html',
            //当使用页面title选项时
            //template中的title标签需要 <title><%=htmlWebpackPlugin.options.title %></title>
            title:'首页',
            //在这个页面中包含的块 默认包含
            //提取出来的通用chunk和vendor chunk
            chunks:['chunk-vendors','chunk-common','index']
        }
    }
}
```
注：当在 多页应用 模式下构建时，webpack 配置会包含不一样的插件 (这时会存在多个 html-webpack-plugin 和 preload-webpack-plugin 的实例)。如果你试图修改这些插件的选项，请确认运行 vue inspect。

#### `lintOnSave`
>   Type:boolean|'error'<br>
    Default:true <br>
    是否保存的时候使用`eslint-loader`进行检查。有效值：`true`|`false`|`'error'`,`'error'`检查错误会编译失败

#### `runtimeCompiler`
>   Type:boolean<br>
    Default:false <br>
    是否使用包含运行时编译器的Vue构建版本，设置为`true`可以在vue中使用`template选项`了，应用会增加10kb左右

#### `transpileDependencies`
>   Type:Array<string|RegExp><br>
    Default:[]<br>
    默认情况下 `babel-loader`会忽略node_modules中的文件。如果想通过Babel显示转译一个依赖，可以在这个选中列出来

#### `productionSourceMap`
>   Type:boolean<br>
    Default:true<br>
    如果不想生产环境的sourceMap 可以将其设置为false `加速生产环境构建`

#### `crossorigin`
>   Type:string<br>
    Default:undefined<br>
    设置生产环境HTML中`<link rel="stylesheet">`和`<script>`标签的crossorigin属性

#### `integrity`
>   Type:boolean<br>
    Default:false<br>
    在生成的 HTML 中的 `<link rel="stylesheet">` 和 `<script>` 标签上启用 `Subresource Integrity (SRI)`。如果你构建后的文件是部署在 CDN 上的，启用该选项可以提供额外的安全性。

### webpack相关配置

#### `configureWebpack`
>   Type:object|function<br>
    如果这个值是一个对象，则会通过`webpack-merge`合并到最终的配置中<br>
    如果这个值是一个函数，则会接受被解析的配置作为参数。该函数及可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本

#### `chainWebpack`
>   Type:function
    函数会接受一个基于`webpack-chain`的ChainableConfig实例，允许对内部的webpack配置进行更细粒度的修改

### CSS相关配置

#### `css.modules`
>   Type:boolean<br>
    Default:false<br>
    默认情况下，只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块。设置为 true 后你就可以去掉文件名中的 .module 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块。

#### `css.extract`
>   Type:boolean|object<br>
    Default:生产环境true，开发环境false<br>
    是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。

#### `css.sourceMap`
>   Type:boolean<br>
    Default:false<br>
    是否为 CSS 开启 source map。`设置为 true 之后可能会影响构建的性能`

#### `css.loaderOptions`
>   Type:object<br>
    Default:{}<br>
    向 CSS 相关的 loader 传递选项。<br>
    支持`css-loader`、`post-loader`、`sass-loader`、`less-loader`、`stylus-loader`

#### `devServer`
>   Type:object<br>
    所有 webpack-dev-server 的选项都支持。注意：<br>
    有些值像 host、port 和 https 可能会被命令行参数覆写。<br>
    有些值像 publicPath 和 historyApiFallback 不应该被修改，因为它们需要和开发服务器的 publicPath 同步以保障正常的工作。<br>

#### `devServer.proxy`
>   Type:string|object<br>
    如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到 API 服务器。这个问题可以通过 vue.config.js 中的 devServer.proxy 选项来配置。

#### `parallel`
>   Type:boolean<br>
    Default:`require('os').cups().length>1`<br>
    是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建

#### `pluginOptions`
>   Type:object<br>
    这是一个不进行任何 schema 验证的对象，因此它可以用来传递任何第三方插件选项。

```js
 pluginOptions: {
        "style-resources-loader": {
          preProcessor: "less",
          patterns: [path.resolve(__dirname, "src/assets/css/mixins.less")]
        }
    }
```



