## 从0到1实现虚拟dom

先了解概念：
+ Virtual DOM是真实DOM的映射
+ 当虚拟DOM树中的某些节点改变时，会得到一个新的虚拟树，算法对两棵树进行比较，找出差异，然后在真实DOM上做出相应的改变。

### Js对象模拟DOM树
假如有这样一棵树
```html
<ul class="list">
    <li class="item">item 1</li>
    <li class="item">item 2</li>
</ul>
```
用js对象来表示就是下面这样
```js
{
    type:'ul',
    props:{'class':'list'},
    children:[
        {
            type:'li',
            props:{'class':'item'},
            children:[
                'item 1'
            ]
        },{
            type:'li',
            props:{'class':'item'},
            children:[
                'item 2'
            ]
        }
    ]
}
```

如果将上面的对象放到一个方法中更容易理解.类似这样：
```js
function h(type, props, …children) {
  return { type, props, children };
}
//dom对象变成这样
h('ul', { 'class': 'list' },
  h('li', {'class':'item'}, 'item 1'),
  h('li', {'class':'item'}, 'item 2'),
);
```

继续我们用jsx来写，先看`React`的编译：
```jsx
<ul className="list">
    <li className="item">item 1</li>
    <li className="item">item 2</li>
</ul>
```
将编译出：
```js
React.createElement('ul', { className: 'list' },
  React.createElement('li', {className:'item'}, 'item 1'),
  React.createElement('li', {className:'item'}, 'item 2'),
);
```
`React.createElement`和我们上面定义的`h`方法太像了。那么我们能不能使用jsx呢？当然可以<br>
`其实，只需要在源文件头部加上这么一句注释：`他会告诉`Babel`编译 JSX 语法，用 `h(...)` 函数代替 `React.createElement(…)`
```js
/** @jsx h */ const a = (
<ul class="list">
    <li class="item">item 1</li>
    <li class="item">item 2</li>
</ul>
);
```
Babel编译后
```js
const a = (
  h('ul', { class: 'list' },
    h('li', {class:'item'}, 'item 1'),
    h('li', {class:'item'}, 'item 2'),
  );
);
```
`h`执行后就返回我们开始定义的表示DOM树的对象。

### Virtual DOM映射真实DOM
我们现在有了一棵用js对象表示的DOM树

让我们给这个树进一步规范下
+ 使用`$`开头的变量表示真正的DOM节点(元素、文本),因此`$parent`将会是一个真实的DOM元素；
+ 虚拟DOM使用名为`node`的变量表示；

**React中只能有一个根节点，所有其他节点都在根节点中**

接下来就是映射这是DOM节点了

首先创建一个`createdElement`方法，它获取一个虚拟DOM并返回一个真实的DOM节点。
```js
//可以创建文本节点和元素节点
function createElement(node){
    if(typeof node==='string'){
        return document.createTextNode(node);
    }
    return document.createdElement(node.type);
}
//现在考虑子节点
function createElement(node){
    if(typeof node==='string'){
        return document.createTextNode(node);
    }
    const $el=document.createElement(node.type);
    node.children.map(createElement).forEach($el.appendChild.bind($el));
    return $el;
}
```

完整代码：
```jsx
/** @jsx h */

function h(type, props, ...children) {
    return { type, props, children };
}

function createElement(node) {
    if (typeof node === "string") {
        return document.createTextNode(node);
    }
    const $el = document.createElement(node.type);
    node.children.map(createElement).forEach($el.appendChild.bind($el));
    return $el;
}

const a = (
    <ul class='list'>
        <li class="item">item 1</li>
        <li class="item">item 2</li>
    </ul>
);

const $root = document.getElementById("root");
$root.appendChild(createElement(a));
```

### 比较两棵树的差异

上面我们将虚拟DOM转换为真实DOM了，我们还需要比较两棵树的差异；

首先了解下操作DOM的方法
+ 添加新节点：`appendChild`
+ 移除节点：`removeChild`
+ 替换节点：`replaceChild`

我们需要一个函数，接受`$parent`、`newNode`、`oldNode`

#### 添加节点
```js
function updateElement($parent,newNode,oldNode){
    if(oldNode){
        $parent.appendChild(createElement(newNode));
    }
}
```
#### 移除节点
这里遇到了一个问题——如果在新虚拟树的当前位置没有节点——我们应该从实际的 DOM 中删除它—— 这要如何做呢?<br>
如果我们已知父元素(通过参数传递)，我们就能调用 `$parent.removeChild(…)` 方法把变化映射到真实的 DOM 上。但前提是我们得知道我们的节点在父元素上的索引，我们才能通过`$parent.childNodes[index]` 得到该节点的引用。
```js
function updateElement($parent,newNode,oldNode,idnex=0){
    if (!oldNode) {
        $parent.appendChild(createElement(newNode));
    } else if (!newNode) {
        $parent.removeChild($parent.childNodes[index]);
    }
}
```
#### 替换节点
```js
function changed(node1, node2) {
  return typeof node1 !== typeof node2 ||
         typeof node1 === ‘string’ && node1 !== node2 ||
         node1.type !== node2.type
}
```

```js
function updateElement($parent, newNode, oldNode, index = 0) {
    if (!oldNode) {
        $parent.appendChild(createElement(newNode));
    } else if (!newNode) {
        $parent.removeChild($parent.childNodes[index]);
    } else if (changed(newNode, oldNode)) {
        $parent.replaceChild(createElement(newNode), $parent.childNodes[index]);
    }
}
```

#### 比较子节点
最后，但并非最不重要的是——我们应该遍历这两个节点的每一个子节点并比较它们——实际上为每个节点调用updateElement(…)方法，同样需要用到递归。
+ 当节点是 DOM 元素时我们才需要比较( 文本节点没有子节点 )
+ 我们需要传递当前的节点的引用作为父节点
+ 我们应该一个一个的比较所有的子节点，即使它是 undefined 也没有关系，我们的函数也会正确处理它。
+ 最后是 index，它是子数组中子节点的 index

```js
function updateElement($parent, newNode, oldNode, index = 0) {
    if (!oldNode) {
        $parent.appendChild(createElement(newNode));
    } else if (!newNode) {
        $parent.removeChild($parent.childNodes[index]);
    } else if (changed(newNode, oldNode)) {
        $parent.replaceChild(createElement(newNode), $parent.childNodes[index]);
    } else if (newNode.type) {
        const newLength = newNode.children.length;
        const oldLength = oldNode.children.length;
        for (let i = 0; i < newLength || i < oldLength; i++) {
            updateElement(
                $parent.childNodes[index],
                newNode.children[i],
                oldNode.children[i],
                i
            );
        }
    }
}
```

一个简单的虚拟DOM就完成了，当然其中没考虑属性、事件等等。