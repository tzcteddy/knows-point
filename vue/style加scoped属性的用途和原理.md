## style加scoped属性的用途和原理

#### 用途
防止全局同名CSS污染
#### 原理
在标签加上`data-v-something`属性，再在选择器时加上对应`[data-v-something]`，即CSS带属性选择器，以此完成类似作用域的选择方式

##### 缺点
+ 由于只是通过属性限制，类还是原来的类，所以在其他地方对类设置样式还是可以造成污染。
+ 添加了属性选择器，对于CSS选择器的权重加重了。
+ 外层组件包裹子组件，会给子组件的根节点添加data属性。在外层组件中无法修改子组件中除了根节点以外的节点的样式。比如子组件中有box类，在父节点中设置样式，会被编译为`.box[data-v-x]`的形式，但是box类所在的节点上没有添加data属性，因此无法修改样式。

##### 样式穿透

**stylus**的样式穿透 使用 `>>>`
**less**的样式穿透 使用 `/deep/`
**sass**的样式穿透 使用`::v-deep`

**如果我们使用bootstrap的话，因为bootstrap是设置的全局属性，可能会有冲突，**