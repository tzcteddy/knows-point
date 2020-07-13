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








[eslint中文](https://eslint.bootcss.com/)