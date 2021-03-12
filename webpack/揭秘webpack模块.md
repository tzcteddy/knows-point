## 揭秘webpack模块

### webpack模块化

demo:
```js
//main.js
import {add} from './source.js'
console.log(add(1,2))
export default add
```

```js
//source.js
export const add=function(x,y){
  return x+y
}
export const getName=function(){
  return 'name'
}
export default function setName(name){
  console.log(name)
}
```
```js
//webpack
module.export={
  entry:{
    main:path.resolve(__dirname,'../src/main.js')
  },
  output:{
    filename:'[name].js',
    path:path.resolve(__dirname,'dist')
  },
}
```
```js

(() => { // webpackBootstrap
  "use strict";
  //模块对象
  var __webpack_modules__ = ({
    "./src/main.js": ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        //一下内容是在eval('...')展开后
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */
        var _source_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./source.js */ "./src/source.js");
        console.log((0,_source_js__WEBPACK_IMPORTED_MODULE_0__.add)(1,2));
        import ('./css/index.css')
        const __WEBPACK_DEFAULT_EXPORT__ = (_source_js__WEBPACK_IMPORTED_MODULE_0__.add);
        # sourceURL=webpack://demo-webpack/./src/main.js?
    }),
    "./src/source.js": ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
      //eval()
        __webpack_require__.r(__webpack_exports__);
         __webpack_require__.d(__webpack_exports__,{
           /* harmony export */
           "add":()=>(add)
         })
         const add=function(x,y){
           return x+y
         }
         # sourceURL=webpack://demo-webpack/./src/source.js?
    })
  });

 	// The module cache 缓存对象
  var __webpack_module_cache__ = {};

  // The require 方法
  function __webpack_require__ (moduleId) {
    // 检查缓存里是否有当前模块
    if (__webpack_module_cache__[moduleId]) {
      return __webpack_module_cache__[moduleId].exports;
    }
    // 创建一个新的模块 并放进缓存
    var module = __webpack_module_cache__[moduleId] = {
      // no module.id needed
      // no module.loaded needed
      exports: {}
    };
    // 执行对应模块方法
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    // Return the exports of the module
    return module.exports;
  }

  /* webpack/runtime/define property getters */
  (() => {
    // 定义一个方法导出
    __webpack_require__.d = (exports, definition) => {
      for (var key in definition) {
        if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
          Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
        }
      }
    };
  })();

  /* webpack/runtime/hasOwnProperty shorthand */
  (() => {
    //判断对象是否存在某个属性
    __webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
  })();

  /* webpack/runtime/make namespace object */
  (() => {
    // 给导出对象定义是否为ESModule
    __webpack_require__.r = (exports) => {
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      }
      Object.defineProperty(exports, '__esModule', { value: true });
    };
  })();
  // startup
  // Load entry module and return exports
  // This entry module can't be inlined because the eval devtool is used.
  var __webpack_exports__ = __webpack_require__("./src/main.js");

})();

```


https://blog.csdn.net/gwdgwd123/article/details/104626274?spm=1001.2014.3001.5502
