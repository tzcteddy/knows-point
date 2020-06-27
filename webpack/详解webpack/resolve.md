## resolve
>这些选项能设置模块如何被解析

### resolve.alias `object`
创建 import 或 require 的别名，来确保模块引入变得更简单。例如，一些位于 src/ 文件夹下的常用模块：
```js
//配置
alias: {
  Utilities: path.resolve(__dirname, 'src/utilities/'),
  Templates: path.resolve(__dirname, 'src/templates/')
}

import Utility from '../../utilities/utility';

//你可以这样使用别名：
import Utility from 'Utilities/utility';
```
精确匹配
```js
//配置
alias: {
  xyz$: path.resolve(__dirname, 'path/to/file.js')
}
import Test1 from 'xyz'; // 精确匹配，所以 path/to/file.js 被解析和导入
import Test2 from 'xyz/file.js'; // 非精确匹配，触发普通解析
```
其他情况

| 别名 | import "xyz" | import "xyz/file.js" |
|:--|:--||
|{}|/abc/node_modules/xyz/index.js|/abc/node_modules/xyz/file.js|
|{ xyz: "/abs/path/to/file.js" }|/abs/path/to/file.js|error|
|{ xyz$: "/abs/path/to/file.js" }|/abs/path/to/file.js|/abc/node_modules/xyz/file.js|
|{ xyz: "./dir/file.js" }|/abc/dir/file.js|error|
|{ xyz$: "./dir/file.js" }|/abc/dir/file.js|/abc/node_modules/xyz/file.js|
|{ xyz: "/some/dir" }|/some/dir/index.js|/some/dir/file.js|
|{ xyz$: "/some/dir" }|/some/dir/index.js|/abc/node_modules/xyz/file.js|
|{ xyz: "./dir" }|/abc/dir/index.js|/abc/dir/file.js|
|{ xyz: "modu" }|/abc/node_modules/modu/index.js|/abc/node_modules/modu/file.js|
|{ xyz$: "modu" }|/abc/node_modules/modu/index.js|/abc/node_modules/xyz/file.js|
|{ xyz: "modu/some/file.js" }|/abc/node_modules/modu/some/file.js|error|
|{ xyz: "modu/dir" }|/abc/node_modules/modu/dir/index.js|/abc/node_modules/dir/file.js|
|{ xyz: "xyz/dir" }|/abc/node_modules/xyz/dir/index.js|/abc/node_modules/xyz/dir/file.js|
|{ xyz$: "xyz/dir" }|/abc/node_modules/xyz/dir/index.js|/abc/node_modules/xyz/file.js|

如果在 package.json 中定义，index.js 可能会被解析为另一个文件。

/abc/node_modules 也可能在 /node_modules 中解析。

### resolve.enforceExtension `boolean`
如果是 true，将不允许无扩展名(extension-less)文件。默认是false
### resolve.enforceModuleExtension `boolean`
对模块是否需要使用的扩展（例如 loader）。默认：false
### resolve.extensions `array`
自动解析确定的扩展。默认值为:
```js
extensions: [".js", ".json"]
```
### resolve.mainFiles `array`
解析目录时要使用的文件名。默认：
```js
mainFiles: ["index"]
```
### resolve.modules `array`
告诉 webpack **解析模块时**应该搜索的目录。

绝对路径和相对路径都能使用，但是要知道它们之间有一点差异。

通过查看当前目录以及祖先路径（即 ./node_modules, ../node_modules 等等），相对路径将类似于 Node 查找 'node_modules' 的方式进行查找。

使用绝对路径，将只在给定目录中搜索。

如果你想要添加一个目录到模块搜索目录，此目录优先于 node_modules/ 搜索：
```js
modules: [path.resolve(__dirname, "src"), "node_modules"]
```
### resolve.plugins `array`
应该使用的额外的解析插件列表。它允许插件，如 DirectoryNamedWebpackPlugin。
```js
plugins: [
  new DirectoryNamedWebpackPlugin()
]

```
