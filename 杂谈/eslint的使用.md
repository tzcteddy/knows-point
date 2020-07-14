## eslint的使用

### 使用的方式
1、 使用 JavaScript 注释把配置信息直接嵌入到一个代码源文件中<br>
2、 使用 JavaScript、JSON 或者 YAML 文件为整个目录（处理你的主目录）和它的子目录指定配置信息。可以配置一个独立的 [`.eslintrc.*`](https://eslint.bootcss.com/docs/user-guide/configuring#configuration-file-formats) 文件，或者直接在 [`package.json`](https://docs.npmjs.com/files/package.json) 文件里的 `eslintConfig` 字段指定配置，ESLint 会查找和自动读取它们，再者，你可以在命令行运行时指定一个任意的配置文件。

如果你在你的主目录（通常 ~/）有一个配置文件，ESLint 只有在无法找到其他配置文件时才使用它。

多配置信息
+ Environments - 指定脚本的运行环境。每种环境都有一组特定的预定义全局变量。
+ Globals - 脚本在执行期间访问的额外的全局变量。
+ Rules - 启用的规则及其各自的错误级别。

所有这些选项让你可以细粒度地控制 ESLint 如何对待你的代码。

### 指定解析器选项
ESLint允许指定要支持的javascript语言选项，默认支持ECMAScript5语法。当然我们可以覆盖这个默认设置，启用对ESMAScript其他版本和JSX的支持

react：建议使用[eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)。

ES6：支持ES6语法并不意味着同时支持新的全局变量或者类型(如`Set`)<br>
 对于ES6语法
 ```js
 {
     "parserOptions":{
         "ecmaVersion":6
    }
 }
 ```

 对于新的ES6全局变量
 ```js
 //自动启用es6全局变量
{
    "env":{
        "es6":true
    }
}
 ```

 解析器选项可以在`.eslintrc.*`文件使用parserOptions属性设置，可用的选项有：<br>
 + `ecmaVersion` - 默认设置为 3，5（默认）， 你可以使用 6、7、8、9 或 10 来指定你想要使用的 ECMAScript 版本。你也可以用使用年份命名的版本号指定为 2015（同 6），2016（同 7），或 2017（同 8）或 2018（同 9）或 2019 (same as 10)
 + `sourceType` - 设置为 "script" (默认) 或 "module"（如果你的代码是 ECMAScript 模块)。
 + `ecmaFeatures` - 这是个对象，表示你想使用的额外的语言特性:
    - `globalReturn` - 允许在全局作用域下使用 return 语句
    - `impliedStrict` - 启用全局 strict mode (如果 ecmaVersion 是 5 或更高)
    - `jsx` - 启用 JSX
    - `experimentalObjectRestSpread` - 启用实验性的 object rest/spread properties 支持。(重要：这是一个实验性的功能,在未来可能会有明显改变。 建议你写的规则 不要 依赖该功能，除非当它发生改变时你愿意承担维护成本。)

**.eslintrc.json样例**：

```js
{
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {
        "semi": "error"
    }
}
```

### 指定解析器

ESLint 默认使用[Espree](https://github.com/eslint/espree)作为其解析器，你可以在配置文件中指定一个不同的解析器，只要该解析器符合下列要求：<br>

1、它必须是一个 Node 模块，可以从它出现的配置文件中加载。通常，这意味着应该使用 npm 单独安装解析器包。<br>
2、它必须符合 [parser interface](https://eslint.bootcss.com/docs/developer-guide/working-with-plugins#working-with-custom-parsers)。<br>
表明使用node模块作为解析器，需要在`.eslintrc`文件指定`parser`
```js
{
    "parser":"esprima",
    "rules":{
        "semi":"error"
    }
}
```
与ESLint兼容的解析器：
+ [Esprima](https://www.npmjs.com/package/esprima)
+ [Babel-ESLint]() - 一个对Babel解析器的包装，使其能够与 ESLint 兼容。
+ [@typescript-eslint/parser]() - 将 TypeScript 转换成与 estree 兼容的形式，以便在ESLint中使用。

### 指定处理器
请使用 `processor` 键，并使用由插件名和处理器名组成的串接字符串加上斜杠。例如，下面的选项启用插件 a-plugin 提供的处理器 a-processor：<br>
```js
"plugins":["a-plugin"],
"processor":"a-plugin/a-processor"
```
要为特定类型的文件指定处理器，请使用 `overrides` 键和 `processor` 键的组合。例如，下面对 *.md 文件使用处理器 a-plugin/markdown<br>
```js
{
    "plugins":["a-plugin"],
    "overrides":[
        {
            "files":["*.md"],
            "processor":"a-plugin/a-processor"
        }
    ]
}
```
### 指定的环境
一个环境定义了一组预定义的全局变量。可用的环境包括：<br>
+ `browser` - 浏览器环境中的全局变量。
+ `node` - Node.js 全局变量和 Node.js 作用域。
+ `commonjs` - CommonJS 全局变量和 CommonJS 作用域 (用于 Browserify/WebPack 打包的只在浏览器中运行的代码)。
+ `shared-node-browser` - Node.js 和 Browser 通用全局变量。
+ `es6` - 启用除了 modules 以外的所有 ECMAScript 6 特性（该选项会自动设置 ecmaVersion 解析器选项为 6）。
+ `worker` - Web Workers 全局变量。
+ `amd` - 将 require() 和 define() 定义为像 amd 一样的全局变量。
+ `mocha` - 添加所有的 Mocha 测试全局变量。
+ `jasmine` - 添加所有的 Jasmine 版本 1.3 和 2.0 的测试全局变量。
+ `jest` - Jest 全局变量。
+ `phantomjs` - PhantomJS 全局变量。
+ `protractor` - Protractor 全局变量。
+ `qunit` - QUnit 全局变量。
+ `jquery` - jQuery 全局变量。
+ `prototypejs` - Prototype.js 全局变量。
+ `shelljs` - ShellJS 全局变量。
+ `meteor` - Meteor 全局变量。
+ `mongo` - MongoDB 全局变量。
+ `applescript` - AppleScript 全局变量。
+ `nashorn` - Java 8 Nashorn 全局变量。
+ `serviceworker` - Service Worker 全局变量。
+ `atomtest` - Atom 测试全局变量。
+ `embertest` - Ember 测试全局变量。
+ `webextensions` - WebExtensions 全局变量。
+ `greasemonkey` - GreaseMonkey 全局变量。

这些环境并不是互斥的，所以你可以同时定义多个。
#### 普通配置
配置文件指定环境<br>
```js
{
    "env":{
        "browser":true,
        "node":true
    }
}
```
package.json指定环境<br>
```js
{
    "name": "mypackage",
    "version": "0.0.1",
    "eslintConfig": {
        "env": {
            "browser": true,
            "node": true
        }
    }
}
```
YAML文件指定环境<br>
```js
---
  env:
    browser: true
    node: true
```
#### 插件中指定环境
确保plugins指定了插件名<br>
```js
{
    "plugins": ["example"],
    "env": {
        "example/custom": true
    }
}
```
package.json指定环境<br>
```js
{
    "name": "mypackage",
    "version": "0.0.1",
    "eslintConfig": {
        "plugins": ["example"],
        "env": {
            "example/custom": true
        }
    }
}
```
YAML文件指定环境<br>
```js
---
  plugins:
    - example
  env:
    example/custom: true
```

### 指定全局
当访问当前源文件内未定义的变量时，no-undef 规则将发出警告。<br>

javascript注释中<br>
```js
/* global var1, var2 */ 或

/* global var1:writable, var2:writable */
```
package.json中<br>
```js
{
    "globals": {
        "var1": "writable",//允许重写变量
        "var2": "readonly"//不允许重写变量
    }
}
```
YAML中<br>
```js
---
  globals:
    var1: writable
    var2: readonly
```
也可使用`off`禁止全局变量的使用
```js
{
    "env":{
        "es6":true
    },
    "Promise":"off"
}
```
### 配置插件
插件名可以省略`eslint-plugin-`
```js
{
    "plugins":[
        "plugin1",
        "eslint-plugin-plugin2"
    ]
}
```

### 配置规则
ESLint 附带有大量的[规则](https://eslint.bootcss.com/docs/rules/)
+ "off" 或 0 - 关闭规则
+ "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
+ "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)

### 配置文件

#### 支持的格式
+ JavaScript - 使用 .eslintrc.js 然后输出一个配置对象。
+ YAML - 使用 .eslintrc.yaml 或 .eslintrc.yml 去定义配置的结构。
+ JSON - 使用 .eslintrc.json 去定义配置的结构，ESLint 的 JSON 文件允许 JavaScript 风格的注释。
+ package.json - 在 package.json 里创建一个 eslintConfig属性，在那里定义你的配置。

如果同一个目录下有多个配置文件，ESLint 只会使用一个。优先级顺序如下：<br>
+ .eslintrc.js
+ .eslintrc.yaml
+ .eslintrc.yml
+ .eslintrc.json
+ .eslintrc
+ package.json

#### 使用方式

1、文件形式<br>
ESLint 将自动在要检测的文件目录里寻找它们，紧接着是父级目录，一直到文件系统的根目录（除非指定 root: true）<br>
2、使用 -c 选项传递命令行将文件保持到你喜欢的地方<br>
`eslint -c myconfig.json myfiletotest.js`


### 扩展配置文件

extends 属性值可以是：

+ 指定配置的字符串(配置文件的路径、可共享配置的名称、`eslint:recommended` 或 `eslint:all`)
+ 字符串数组：每个配置继承它前面的配置

ESLint递归地扩展配置，因此基本配置也可以具有 `extends` 属性。`extends` 属性中的相对路径和可共享配置名从配置文件中出现的位置解析。

rules 属性可以做下面的任何事情以扩展（或覆盖）规则：

+ 启用额外的规则
+ 改变继承的规则级别而不改变它的选项：
    - 基础配置：`"eqeqeq": ["error", "allow-null"]`
    - 派生的配置：`"eqeqeq": "warn"`
    - 最后生成的配置：`"eqeqeq": ["warn", "allow-null"]`
+ 覆盖基础配置中的规则的选项
    - 基础配置：`"quotes": ["error", "single", "avoid-escape"]`
    - 派生的配置：`"quotes": ["error", "single"]`
    - 最后生成的配置：`"quotes": ["error", "single"]`


##### eslint:recommended

值为 "eslint:recommended" 的 extends 属性启用一系列核心规则，这些规则报告一些常见问题，在 规则页面 中被标记



















[eslint中文](https://eslint.bootcss.com/)