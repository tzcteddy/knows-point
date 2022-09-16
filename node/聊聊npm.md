## 聊聊npm

说到npm，大家都想起`package.json`,接下来我们就聊聊这个json文件

### 生成一个package.json

`npm init`命令可以生成一个简单的`package.json`文件。当然我们也可以自己定义一个`npm init`行为

#### 自定义npm init

`npm init`就是调用了shell脚本，输出一个初始化的`package.json`文件。我们在npm-study目录创建一个`.npm-init.js`,该文件的`module.exports`就是`package.json`配置内容，需要获取用户输入的时候，使用`prompt()`方法

### package.js常见属性

#### 依赖包

**dependenices**: 通过`npm install/i packageName -S 或 --save`
从`npm 5.x`开始，可以不用手动添加`-S/--save`指令，直接执行`npm i packageName`把依赖包添加到dependencies中去。

**devDependenices**: 通过`npm install/i packageName -D或--save-dev`

#### bin
```js
"bin": {
    "vm2": "./bin/vm2"
  },
```
`bin` 字段指定了各个内部命令对应的可执行文件的位置。如果全局安装模块报，`npm` 会使用符号链接把可执行文件链接到 `/usr/local/bin`，如果项目中安装，会链接到 `./node_modules/.bin/`。<br>
上面的这种当你的包安装到全局时：`npm` 会在 `/usr/local/bin` 下创建一个以 `vm2` 为名字的软链接，指向全局安装下来的 `vm2` 包下面的 "`./bin/index.js`"。这时你在命令行执行 `vm2` 则会调用链接到的这个 `js` 文件。

#### main
```js
{
    "main":"lib/index.js"
}
```
项目入口

#### script

生成的package.json文件中，有一个`scripts`对象,npm允许使用其字段定义脚本命令
```js
"scripts":{
    "build":'node build.js'
}
```
`scripts`中每一个属性对应一个脚本。

**原理**

我们每次在运行 `scripts` 中的一个属性时候(`npm run`),**实际系统都会自动新建一个shell(一般是Bash)，在这个shell里面执行指定的脚本命令。因此 `凡是能在 shell 中允许的脚本，都可以写在npm scripts中`。

>`npm run` 新建的 shell，会在当前目录的 `node_modules/.bin` 子目录加入到 `PATH` 变量，执行结束后，再将 `PATH` 变量恢复原样。也就是说，当前项目目录 `node_modules/.bin` 子目录中所有的脚本，都可以直接用脚本名称调用，不需要增加路径.（简单总结：通过 npm 启动的脚本，会默认把 `node_modules/.bin` 加到 `PATH` 环境变量中。）

那么这个`node_modules/.bin`是哪里来的呢？

`npm install` 安装的某个模块，如果模块在 `package.json` 中配置了 `bin` 属性，在安装时候会自动软链接到 `node_modules/.bin`

**默认值**

```js
"start": "node server.js"
"install": "node-gyp rebuild"
```
+ `npm run start` 的默认值是 `node server.js` ，前提是根目录下有 `server.js` 这个脚本
+ `npm run install` 的默认值是 `node-gyp rebuild`，前提是根目录下有 `binding.gyp` 文件

**生命周期**

`npm` 脚本有两个钩子，`pre` 和 `post`，当我们执行`start`脚本时候，`start` 的钩子就是 `prestart` 和 `poststart`。<br>
执行`npm run start` 会自动执行`npm run prestart && npm run start && npm run poststart`

>注意：在 prestart 里面设置了一个环境变量，在项目 start 的时候，无法拿到设置的环境变量，因为 script 的属性运行的时候都会新启动一个 shell，所以在 prestart中设置的环境变量只对应了那个shell的运行时。

### env环境变量

我们在执行 `npm run` 脚本时候, `npm` 会设置一些特殊的`env`环境变量。其中`package.json`中的所有字段，都会被设置为以`npm_package_`开头的环境变量。看个简单的例子
```js
{
  "name": "npm-demo",
  "version": "1.0.0",
  "script": {
    "build": "webpack --mode=production"
  },
  "files": ["src"]
}
```
可以得到 `npm_package_name`、`npm_package_version`、`npm_package_script_build`、`npm_package_files_0`等变量。注意上面 package.json 中对象和数组中每个字段都会有对应的环境变量。

同时，npm 相关的所有配置也会被设置为以npm_config_开头的环境变量。此外，还会设置一个比较特殊的环境变量npm_lifecycle_event，表示正在运行的脚本名称。比如执行npm run serve 的时候，`process.env.npm_lifecycle_event`值为serve，通过判断这个变量，可以将一个脚本使用在不同的npm scripts中。这里还要提一下上面说的钩子，`npm_lifecycle_event`可以和钩子配合使用，利用这个变量，在同一个脚本文件里面，为不同的 npm scripts 命令编写代码。

> 强调：这些环境变量只能在 npm run 的脚本执行环境内拿到，正常执行的 node 脚本是获取不到的。所以，不能直接通过 env $npm_package_name 的形式访问，但可以在 scripts 中定义脚本"scripts": {"bundle": "echo $npm_package_name"}来访问。

#### 脚本传入参数
说到脚本传入参数，需要再次提到前面说的 pacakge.json 中的 bin 字段，bin 字段指定了各个内部命令对应的可执行文件的位置。前面已经说了 bin 文件的产生，有了 bin 字段，在安装这个模块的时候，node_modules 下面的 .bin/文件夹 下会有对应模块的文件，和模块中的文件相同，然后我们就可以通过调用这个文件脚本中的方法传入参数了,看一个例子

```js
'use strict';
var pkg = require('./package.json');
var osName = require('./');
var argv = process.argv;

function help() {
 console.log([
  '',
  '  ' + pkg.description,
  '',
  '  Example',
  '    os-name',
  '    OS X Mavericks'
 ].join('\n'));
}

if (argv.indexOf('--help') !== -1) {
 help();
 return;
}

if (argv.indexOf('--version') !== -1) {
 console.log(pkg.version);
 return;
}

console.log(osName());
```
node 处理 scripts 中的参数，除了属性后面的第一个命令，以空格分割的任何字符串(除特别shell语法)都是参数，并且都能通过 process.argv 属性访问。

>`process.argv` 属性返回一个数组，数组包含了启动 node 进程时的命令行参数。第一个元素为启动 node 进程的可执行文件的绝对路径名 `process.execPath`,第二个元素为当前执行的 jacascript 文件路径。剩余的元素为其他命令行参数。

#### 脚本执行顺序

+ 并行任务(同时的平行执行)，使用&符号

`$ npm run script1.js & npm run script2.js`
+ 串行任务(前一个任务成功，才执行下一个任务)，使用 && 符号

`$ npm run script1.js && npm run script2.js`

### 发布npm包

#### 规范的包目录
一个 node.js 模块是基于 CommonJS 模块化规范实现的，严格按照 CommonJS 规范，模块目录下除了必须包含包描述文件 package.json 以外，还需要包含以下目录：

+ bin：存放可执行二进制文件的目录
+ lib：存放js代码的目录
+ doc：存放文档的目录
+ test：存放单元测试用例代码的目录

![好的README](https://www.zhihu.com/question/29100816)

#### 发布

+ 注册npm账号

```js
npm adduser #根据提示输入用户名密码即可
```
+ 使用命令发布

```js
npm publish
```

#### 更新

更新 npm 包也是使用 npm publish 命令发布，不过必须更改 npm 包的版本号，同时我们应该遵 Semver(语义化版本号) 规范，npm 提供了 npm version 给我们升级版本

正式发布
```
# 升级补丁版本号
$ npm version patch //# 版本号从 0.1.0 变成 0.1.1，即修订版本号加一。

# 升级小版本号
$ npm version minor //# 版本号从 0.1.1 变成 0.2.0，即子版本号加一。 

# 升级大版本号
$ npm version major //# 版本号从 0.2.0 变成 1.0.0，即主版本号加一。
```
预发布
```
$ npm version prepatch  # 版本号从 1.2.3 变成 1.2.4-0，即 1.2.4 版本的第一个预发布版本。

$ npm version preminor  # 版本号从 1.2.4-0 变成 1.3.0-0，即 1.3.0 版本的第一个预发布版本。

$ npm version premajor  # 版本号从 1.2.3 变成 2.0.0-0，即 2.0.0 版本的第一个预发布版本。

$ npm version prerelease# 版本号从 2.0.0-0 变成 2.0.0-1，即预发布版本号加1。
```

#### 版本号控制
`^`指明的版本范围，只要不修改 **[major, minor, patch]** 三元组中，**最左侧的第一个非0位**，都是可以的。也就是说，要确定 `^`版本包含的范围，先要找到 **最左侧的第一个非0位** ，只有在这一位右侧的变动，才被包含在这个 `^` 指定的范围内。举个 ：
+ ^1.2.3版本包括：>= 1.2.3 并且 < 2.0.0
+ ^0.2.3版本包括：>= 0.2.3 并且 < 0.3.0
+ ^0.0.3版本包括：>= 0.0.3 并且 < 0.0.4

|value|desc|
|--:|:--|
|~version	|~1.2.3会匹配所有1.2.x版本，但是不包括1.3.0 。 Approximately equivalent to version, i.e., only accept new patch versions|
|^version	|比如^1.2.3会匹配所有1.x.x的包，包括1.3.0，但是不包括2.0.0。 Compatible with version, i.e., accept new minor and patch versions|
|version	|Must match version exactly|
|>version	|Must be greater than version|
|>=version|	etc|
|<version	||
|<=version	||
|1.2.x	|1.2.0, 1.2.1, etc., but not 1.3.0|
|*	|Matches any version|
|latest	|Obtains latest release|

[npm](https://docs.npmjs.com/cli/v8/commands/npm-version)
[semver](https://semver.org/lang/zh-CN/)
#### 本地调试

可以使用 npm link 调试

+ 假如我的项目是 koalaNpmStudy，假如我的 npm 模块包名称是 npm-ikoala
+ 进入到 模块包 npm-ikoala 目录中，执行 npm link
+ 在自己的项目 koalaNpmStudy 中创建连接执行 npm link npm-ikoala
+ 在自己项目的 node_module 中会看到链接过来的模块包，然后就可以像使用其他的模块包一样使用它了。
+ 调试结束后可以使用 npm unlink 取消关联

> npm link 主要做了两件事：<br>
1、为目标 npm 模块创建软链接，将其链接到全局 node 模块安装路径 /usr/local/lib/node_modules/。<br>
2、为目标 npm 模块的可执行 bin 文件创建软链接，将其链接到全局 node 命令安装路径 /usr/local/bin/。