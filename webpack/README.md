# 简介

## 何为webpack?
webpack 是一个开源的JavaScript模块打包工具，最核心的功能是解决模块之间的依赖，把各个模块按照特定的规则和顺序组织在一起，最终合并为一个JS文件（有时会有多个），这个过程也叫模块打包。

## 模块化思想
按照特定的功能将代码拆分为多个代码段，每个代码段实现一个特定的目的。我们可以对其进行独立的设计、开发和测试，最终通过接口来讲它们组合在一起，这就是基本的模块化思想。 

## 为什么选择webpack
目前社区比较流行的模块打包工具有webpack、parcel、rollup等
1、webpack默认支持多种模块，包括AMD CommonJs ES6
2、webpack有完备的代码分割
3、webpack可以处理各种类型的资源
4、webpack拥有庞大的社区支持

文档整理主要参照：

* [Webpack官方文档](https://www.webpackjs.com/)
* 《Webpack实战：入门、进阶与调优》  —— 居玉皓 著