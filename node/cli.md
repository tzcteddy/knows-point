## cli

### 必备模块
```markdown
commander ：参数解析 --help
inquirer ：交互式命令行工具，可以实现命令行的选择功能
download-git-repo ：在git中下载模板
metalsmith ：读取所有文件，实现模板渲染
consolidate ：统一模板引擎
chalk: 打印
execa: 改进了child_process方法
globby: glob的增强
ora:loading状态
figlet:大字体

```
<a name="xoScB"></a>

### 工程创建
```git
npm init -y # 初始化package.json
npm install eslint # eslint是负责代码校验工作，husky提供了git钩子功能


npx eslint --init # 初始化eslint配置文件
选择的顺序：
To check syntax, find problems, and enforce code style    回车
CommonJS (require/exports)    回车
None of these   回车
NO    回车
Node  回车
Use a popular style guide  回车
Airbnb: https://github.com/airbnb/javascript  回车
JavaScript     回车
yes  回车  等待安装好包！



npm link  //在命令行中使用zhu-cli命令，并且执行main.js文件

npm i commander  //安装commander包 自动生成help 解析选项参数
npm i axios  //ajax数据
npm i ora inquirer  //loading的样式 选择模板
npm i download-git-repo //选择好项目模板名称和对应的版本，直接下载
npm i ncp     //实现文件的拷贝功能
npm i metalsmith ejs consolidate    //遍历文件夹  借用ejs模板  使用多种模板引擎统一
```

### 创建文件夹
```git
├── bin
│   └── www  // 全局命令执行的根文件
├── package.json
├── src
│   ├── main.js // 入口文件
│── .eslintrc.json // 代码规范校验
```

## babel版本的

## 起步阶段

- 新建bin文件夹和www文件  bin/www
- 新建src文件夹和main.js文件   src/main.js
- 初始化  npm init  -y
- npm install babel-cli babel-env -D

```less
//.babelrc文件
{
  "presets": [
    [
      "env",
      {
        "targets": {
          "node": "current"
        }
      }
    ]
  ]
}
```

- 修改package.json文件
```less
"scripts": {
 "compile": "babel src -d dist",//只能生成一次
  "watch": "npm run compile -- -watch",//持续生成
},
"bin":{//bin字段,设置脚手架的入口
  "teddy":"./bin/www"
},
```
- npm run compile  生成相对应的dis文件夹的文件  npm run watch   [常用这个命令]
- bin/www文件
```less
#!/usr/bin/env node
//使用main作为入口文件，并且以node环境执行此文件
require('../dist/main.js')
```