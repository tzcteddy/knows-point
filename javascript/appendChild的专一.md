## appendChild 自带remove和append两个功能

其实appendChild除了这个功能之外，他还有一个功能:如果子节点不是动态创建的元素，而是在某个元素下的子元素，那么他还会自动执行一次removeChild功能。

例子：第一组ul中的第一个li移动到第二个ul中

```js
  let li=document.getElementById('ul1').childNodes[0]
  let ul2=document.getElementById('ul2')
  ul2.appendChild(li)
```
以上代码`ul1`会自动`remove`第一个`li`

来自`MDN`的描述：

Node.appendChild() 方法将一个节点附加到指定父节点的子节点列表的末尾处。如果将被插入的节点已经存在于当前文档的文档树中，那么 appendChild() 只会将它从原先的位置移动到新的位置（不需要事先移除要移动的节点）。

这意味着，一个节点不可能同时出现在文档的不同位置。所以，如果某个节点已经拥有父节点，在被传递给此方法后，它首先会被移除，再被插入到新的位置。若要保留已在文档中的节点，可以先使用  Node.cloneNode() 方法来为它创建一个副本，再将副本附加到目标父节点下。请注意，用 cloneNode 制作的副本不会自动保持同步。

如果给定的子节点是 DocumentFragment，那么 DocumentFragment 的全部内容将转移到指定父节点的子节点列表中。