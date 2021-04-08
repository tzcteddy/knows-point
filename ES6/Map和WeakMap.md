## Map和WeakMap

对象本质上是键值对的集合，但是键值`key`只能是字符串。`Map`支持其他类型作为键值。

```js
var map=new Map()
var user={name:'对点'};
var type={name:'net'};
map.set(user,type);
console.log(map.get(user));//{name:'net'}
```

```js
map.size         //1
map.has(user)    //true
map.delete(user) //删除
map.clear()      //清空
```


Map接受一个数组作为参数
```js
var  map = new Map([[user,type],[type,user]])
```

Map可遍历
```js
map.keys();     //返回键名的遍历器 [key,key,key]
map.values();   //返回键值的遍历器  [value,value,value]
map.entries();  //返回所有成员的遍历器  [[key,value],[key,value],[key,value]]
map.forEach();  //遍历Map的所有成员 
```

WeakMap

WeakMap和Map的区别

+ `WeakMap`只接受对象作为键名(null除外)
+ `WeakMap`的键名都是弱引用，不计入垃圾回收机制，只要对象的其他引用被删除，垃圾回收机制就会释放该对象占用的内存，从而避免内存泄漏。
+ 由于`WeakMap`的成员随时可能被垃圾回收机制回收，成员的数量不稳定，所以没有size属性。
+ 没有`clear`方法
+ 不能遍历