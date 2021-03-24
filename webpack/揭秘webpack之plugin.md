## 揭秘webpack之plugin

插件是 webpack 生态的关键部分， 它为社区用户提供了一种强有力的方式来直接触及 webpack 的编译过程(compilation process)。 插件能够 hook 到每一个编译(compilation)中发出的关键事件中。 在编译的每个阶段中，插件都拥有对 compiler 对象的完全访问能力， 并且在合适的时机，还可以访问当前的 compilation 对象

compiler 对象(负责编译)和compilation 对象(负责创建bundles)

### Tapable


```js
module.exports = class TextPlugin {
  constructor(){

  }
  apply(compiler){
    compiler.hooks.compilation.tap('MyWebpackPluginDemo', compilation => {
      // 注册compilation的optimizeChunkAssets钩子，这是一个异步钩子
      // console.log(compilation)
      compilation.hooks.optimizeChunkAssets.tapAsync(
          'MyWebpackPluginDemo',
          (chunks, callback) => {
            // console.log(chunks)
              // 遍历所有chunk文件输出其内容，仅为举例，没有实际意义
              chunks.forEach(chunk => {
                  chunk.files.forEach(file => {
                      // console.log(compilation.assets[file].source())
                  });
              });
              // 异步钩子操作完成后，调用callback方法
              callback();
          }
      );
  });
  }
}
```
