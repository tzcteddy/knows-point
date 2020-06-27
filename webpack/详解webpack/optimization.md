## optimization (since 4.0.0)

### optimization.minimize `boolean`
告诉webpack使用TerserPlugin或optimize .minimizer中指定的插件最小化包。
```js
module.exports = {
  //...
  optimization: {
    minimize: false
  }
};
```
### optimization.minimizer `TerserPlugin | function(compiler)`
允许您通过提供不同的一个或多个自定义TerserPlugin实例来覆盖默认最小化器。
```js

Module
Resolve
Optimization
optimization.minimize
optimization.minimizer
optimization.splitChunks
optimization.runtimeChunk
optimization.noEmitOnErrors
optimization.namedModules
optimization.namedChunks
optimization.moduleIds
optimization.chunkIds
optimization.nodeEnv
optimization.mangleWasmImports
optimization.removeAvailableModules
optimization.removeEmptyChunks
optimization.mergeDuplicateChunks
optimization.flagIncludedChunks
optimization.occurrenceOrder
optimization.providedExports
optimization.usedExports
optimization.concatenateModules
optimization.sideEffects
optimization.portableRecords
optimization.mangleExports
optimization.innerGraph
Plugins
DevServer
Devtool
Target
Watch and WatchOptions
Externals
Performance
Node
Stats
Experiments
Other Options
You are reading webpack 5 documentation. Change here to:
webpack 4 documentation
EDIT DOCUMENT
|Print Document
Optimization
Since version 4 webpack runs optimizations for you depending on the chosen mode, still all optimizations are available for manual configuration and overrides.

optimization.minimize
boolean

Tell webpack to minimize the bundle using the TerserPlugin or the plugin(s) specified in optimization.minimizer.

This is true by default in production mode.

webpack.config.js

module.exports = {
  //...
  optimization: {
    minimize: false
  }
};
Learn how mode works.

optimization.minimizer
[TerserPlugin] and or [function (compiler)]

Allows you to override the default minimizer by providing a different one or more customized TerserPlugin instances.

webpack.config.js

const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        }
      }),
    ],
  }
};
```
or
```js
module.exports = {
  optimization: {
    minimizer: [
      (compiler) => {
        const TerserPlugin = require('terser-webpack-plugin');
        new TerserPlugin({ /* your config */ }).apply(compiler);
      }
    ],
  }
};
```
### optimization.splitChunks `object`
默认情况下，webpack v4+为动态导入的模块提供了新的通用块策略
### optimization.runtimeChunk `object | string | boolean`
将optimiz.com . runtimechunk设置为true或'multiple'会向每个只包含运行时的入口点添加额外的块。此设置别名
```js
module.exports = {
  //...
  optimization: {
    runtimeChunk: {
      name: entrypoint => `runtime~${entrypoint.name}`
    }
  }
};
```
值'single'会创建一个运行时文件，供所有生成的块共享。此设置是别名:
```js
module.exports = {
  //...
  optimization: {
    runtimeChunk: {
      name: 'runtime'
    }
  }
};
```

### optimization.