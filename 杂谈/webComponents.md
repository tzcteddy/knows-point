## web components
Web Components旨在解决这些问题 — 它由三项主要技术组成，它们可以一起使用来创建封装功能的定制元素:

+ Custom elements（自定义元素）：一组`JavaScript API`，允许您定义`custom elements`及其行为，然后可以在您的用户界面中按照需要使用它们。
+ Shadow DOM（影子DOM）：一组`JavaScript API`，用于将封装的“影子”DOM树附加到元素（与主文档DOM分开呈现）并控制其关联的功能。通过这种方式，您可以保持元素的功能私有，这样它们就可以被脚本化和样式化，而不用担心与文档的其他部分发生冲突。
+ HTML templates（HTML模板）： `<template>` 和 `<slot>` 元素使您可以编写不在呈现页面中显示的标记模板。然后它们可以作为自定义元素结构的基础被多次重用。

### CustomElementRegistry
`CustomElementRegistry`包含自定义元素相关功能，使用` CustomElementRegistry.define() `来注册新的自定义元素，这样就可以在文档中使用它们

**window.customElements**
返回 `CustomElementRegistry` 对象的引用。

#### define方法
define:方法定义了一个自定义元素，可以创建两种类型的自定义元素：

1. **自主定制元素**：独立元素; 它们不会从内置HTML元素继承。
2. **自定义内置元素**：这些元素继承自 - 并扩展 - 内置HTML元素

参数
+ name:自定义元素名
+ constructor:自定义元素构造器.
+ options:可选，值为`extends` 指定继承的已创建的元素. 被用于创建自定义元素.

**自定义元素**
```js
class StaticText extends HTMLElement{
  constructor(){
    super();
    var shadow=this.attachShadow({mode:'open'});
    var wrapper = document.createElement('span');
    wrapper.setAttribute('class','wrapper');
     var style = document.createElement('style');
     wrapper.innerText='123'
    style.textContent = `.wrapper{
      color:red;
      border:1px solid green;
    }`
     shadow.appendChild(style);
    shadow.appendChild(wrapper);
  }
}
customElements.define('static-text', StaticText);
```

!> 自主自定义元素的构造函数必须扩展HTMLElement。

**自定义内置元素**

```js
class WordCount extends HTMLParagraphElement{
  constructor(){
    super();
    var wcParent = this.parentNode;
    console.log('wcParent',wcParent)
    function countWords(node){
      var text = node.innerText || node.textContent
      return text.split(/\s+/g).length;
    }

    var count = 'Words: ' + countWords(wcParent);
    var shadow = this.attachShadow({mode: 'open'});
    var text = document.createElement('span');
    text.textContent = count;
    shadow.appendChild(text);
    setInterval(function() {
      var count = 'Words: ' + countWords(wcParent);
      text.textContent = count;
    }, 200)
  }
}
customElements.define('word-count', WordCount, { extends: 'p' });
```

更多方法查看[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CustomElementRegistry)

#### 生命周期
+ connectedCallback: 当自定义元素第一次被连接到文档DOM时被调用。
+ disconnectedCallback: 当自定义元素与文档DOM断开连接时被调用。
+ adoptedCallback: 当自定义元素被移动到新文档时被调用。
+ attributeChangedCallback: 当自定义元素的一个属性被增加、移除或更改时被调用。

```js
class StaticText extends HTMLElement{
  constructor(){
    super();
    var shadow=this.attachShadow({mode:'open'});
    var wrapper = document.createElement('span');
    wrapper.setAttribute('class','wrapper');
     var style = document.createElement('style');
     wrapper.innerText='123'
    style.textContent = `.wrapper{
      color:red;
      border:1px solid green;
    }`
     shadow.appendChild(style);
    shadow.appendChild(wrapper);
  }
  connectedCallback(){
    comsole.log('connectedCallback')
  }
  disconnectedCallback(){
    console.log('disconnectedCallback')
  }
  adoptedCallback(){
    console.log('adoptedCallback')
  }
  attributeChangedCallback(){
    console.log('attributeChangedCallback')
  }

}
customElements.define('static-text', StaticText);
```