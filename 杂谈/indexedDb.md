## indexedDb


IndexedDB 是一个内置的数据库，它比 localStorage 强大得多。

+ 键/值 储存：值（几乎）可以是任何类型，键有多种类型。
+ 支撑事务的可靠性。
+ 支持键范围查询、索引。
+ 和 localStorage 相比，它可以存储更多数据。

### 打开数据库
```js
let openRequest = indexedDB.open(name,version);
```
+ name：字符串，数据库名称
+ version：一个正整数，默认 1；版本

创建数据库后需要监听`openRequest`对象上的事件
+ success：数据库准备就绪，`openRequest.result` 中有了一个数据库对象`Database Object`，使用它进行进一步的调用。
+ error：打开失败
+ upgradeneeded：数据库准备就绪，但是版本过时

IndexedDB 具有内建的“模式（scheme）版本控制”机制，这在服务器端数据库中是不存在的。

与服务器端数据库不同，IndexedDB 存在于客户端，数据存储在浏览器中。因此开发人员不能直接访问它。但当新版本的应用程序发布之后，我们可能需要更新数据库。

如果本地数据库版本低于 open 中指定的版本，会触发一个特殊事件 `upgradeneeded`。我们可以根据需要比较版本并升级数据结构。

当数据库还不存在的时候，也会触发这个事件。因此，我们应该先执行初始化。

```js
let openRequest = indexedDB.open('myDb',1);
openRequest.onupgradeneeded=function(){
  //初始化
  console.log('本地没有数据库')
}
openRequest.onsuccess=function(){
  console.log('数据库已创建')
  const db=openRequest.result
}
openRequest.onerror=function(){
  console.error('error',openRequest.error)
}
```
发布下一版时
```js
let openRequest = indexedDB.open('myDb',2);
openRequest.onupgradeneeded=function(){
  const db=openRequest.result;
  switch(db.version){
    case 0:
      //版本为0表示客户端没有数据库
      //初始化
    case 1:
      //客户端当前版本 1
      //需要更新
  }
}
openRequest.onsuccess=function(){console.log('数据库已创建')}
openRequest.onerror=function(){
  console.error('error',openRequest.error)
}
```

### 删除数据库
```js
let deleteResult=indexedDb.deleteDatabase(name)
```

**并行刷新问题**

用户在网页中打开了数据库为版本 1 的网站。

这时网站更新到版本 2，这个用户在另一网页下打开了网站。

这两个网页都是我们的网站，但一个与数据库版本 1 有开放连接，而另一个试图在 upgradeneeded 处理程序中更新

!> 这两个网页是同一个站点，同一个来源，共享同一个数据库。而数据库不能同时为版本 1 和版本 2。要执行版本 2 的更新，必须关闭版本 1 的所有连接。

为了完成这些，当尝试并行更新时，versionchange 事件会触发一个打开的数据库对象。我们应该监听这个对象，关闭数据库（还应该建议访问者重新加载页面，获取最新的代码）。

如果旧连接不关闭，新连接会被 blocked 事件阻塞，而不是 success。

```js
let openRequest = indexedDB.open('myDb',2);
openRequest.onupgradeneeded=function(){
  console.log('本地没有数据库')
}

openRequest.onerror=function(){}
openRequest.onsuccess=function(){
  console.log('数据库已创建')
  let db=openRequest.result;
  db.onversionchange=function(){
    db.close();
    alert('刷新页面')
  }
}
openRequest.onblocked=function(){
  // 到同一数据库的另一个开放连接
  // 触发 db.onversionchange 后没有关闭
  console.log('呃呃呃')
}
```

在这我们做两件事：
+ 成功打开后添加 db.onversionchange 监听器，以得到尝试并行更新的消息。
+ 添加 openRequest.onblocked 监听器来处理旧连接未关闭的情况。如果在 db.onversionchange 中关闭，就不会发生这种情况。

### 对象库(object store)

对象库是 IndexedDB 的核心概念，在其他数据库中对应的对象称为“表”或“集合”。它是储存数据的地方。一个数据库可能有多个存储区：一个用于存储用户数据，另一个用于商品，等等。

IndexedDB 使用标准序列化算法来克隆和存储对象。类似于 JSON.stringify，不过功能更加强大，能够存储更多的数据类型。

!> 有一种对象不能被存储：循环引用的对象。此类对象不可序列化，也不能进行 JSON.stringify。

 键的类型必须为`数字`、`日期`、`字符串`、`二进制`或`数组`。它是唯一的标识符：通过键来 搜索/删除/更新 值

 #### 创建对象库
 ```js
db.createObjectStore(name[,keyOptions]);
 ```

 **操作是同步的**
 + name是存储区名称
 + keyOptions具有一下两个属性之一的可选对象
    - keyPath 对象属性的路径，IndexedDB 将以此路径作为键，例如 id。
    - autoIncrement  如果为 true，则自动生成新存储的对象的键，键是一个不断递增的数字。

!> 在 upgradeneeded 处理程序中，只有在创建数据库版本时，对象库被才能被 创建/修改。<br>
这是技术上的限制。在 upgradeneedHandler 之外，可以 添加/删除/更新数据，但是只能在版本更新期间 创建/删除/更改对象库。

```js
let openRequest = indexedDB.open('myDb',1);
openRequest.onupgradeneeded=function(){
  console.log('本地没有数据库')
  let db=openRequest.result;
  if(!db.objectStoreNames.contains('books')){//没有books
    db.createObjectStore('books',{keyPath:'id'})
  }
}

openRequest.onerror=function(){}
openRequest.onsuccess=function(){
  console.log('数据库已创建')
}
```

#### 删除对象库
```js
db.deleteObjectStore('books')
```

### 事务
术语“事务”是通用的，许多数据库中都有用到。

事务是一组操作，`要么全部成功，要么全部失败`。

例如，当一个人买东西时，我们需要：

1、从他们的账户中扣除这笔钱。

2、将该项目添加到他们的清单中。

如果完成了第一个操作，但是出了问题，比如停电。这时无法完成第二个操作，这非常糟糕。两件时应该要么都成功（购买完成，好！）或同时失败（这个人保留了钱，可以重新尝试）。

事务可以保证同时完成。

所有数据操作都必须在 IndexedDB 中的事务内进行

**启动事务**
```js
db.transaction(store[,type])
```

+ store是事务要访问的库名称，例如‘books’，如果我们要访问多个库，则是库名称的数组
+ type事务类型
  - readonly：只读 默认值
  - readwrite：只能读取和写入数据，而不能 创建/删除/更改 对象库。

还有 versionchange 事务类型：这种事务可以做任何事情，但不能被手动创建。IndexedDB 在打开数据库时，会自动为 updateneeded 处理程序创建 versionchange 事务。这就是它为什么可以更新数据库结构、创建/删除 对象库的原因。

```js
  let transaction = db.transaction('books','readwrite');//创建一个事务 表明要访问的所有存储
  let books=transaction.objectStore('books')//获取存储对象。
  let book={
    id:1,
    name:'时间',
    createTime:new Date()
  }
  let request=books.add(book)
  request.onsuccess=function(){
    console.log('ok')
  }
  requesr.onerror=function(){}
```

对象库支持两种存储值的方法：
+ put(value, [key]) 将 value 添加到存储区。仅当对象库没有 keyPath 或 autoIncrement 时，才提供 key。如果已经存在具有相同键的值，则将替换该值。
+ add(value, [key]) 与 put 相同，但是如果已经有一个值具有相同的键，则请求失败，并生成一个名为 "ConstraInterror" 的错误。

与打开数据库类似，我们可以发送一个请求：books.add(book)，然后等待 success/error 事件。

+ add 的 request.result 是新对象的键。
+ 错误在 request.error（如果有的话）中。

**事务的自动提交**

!> 事务自动提交原则有一个重要的副作用。不能在事务中间插入 fetch, setTimeout 等异步操作。IndexedDB 不会让事务等待这些操作完成。<br>

```js
let request1=books.add(book);
request1.onsuccess=function(){
  fetch('/').then(res=>{
    let request2=books.add(anotherBook);
    request2.onerror=function(){console.log(request2.error.name)}
  })
}
```
request2将会执行失败，这是因为 fetch 是一个异步操作，一个宏任务。`事务在浏览器开始执行宏任务之前关闭`。

如果需要在一个事务中把所有操作保持一致，更好的做法是将 IndexedDB 事务和“其他”异步内容分开。

首先，执行 fetch，并根据需要准备数据。然后创建事务并执行所有数据库请求，然后就正常了。

为了检测到成功完成的时刻，我们可以监听 transaction.oncomplete 事件:

```js
let transaction=db.transaction('books','readwrite');
transaction.oncomplete=function(){}
```

只有 complete 才能保证将事务作为一个整体保存。个别请求可能会成功，但最终的写入操作可能会出错（例如 I/O 错误或其他错误）。

**手动终止事务**
```js
transaction.abort()
```
取消请求里所做的所有修改，并触发 `transaction.onabort` 事件。

### 错误处理

?> 失败的请求将自动中止事务，并取消所有的更改。

在一些情况下，我们会想自己去处理失败事务（例如尝试另一个请求）并让它继续执行，而不是取消现有的更改。可以调用 request.onerror 处理程序，在其中调用 event.preventDefault() 防止事务中止。

```js
  let transaction = db.transaction('books','readwrite');//创建一个事务 表明要访问的所有存储
  let books=transaction.objectStore('books')//获取存储对象。
  let book={
    id:1,
    name:'时间',
    createTime:new Date()
  }
  let request=books.add(book)
  request.onsuccess=function(){console.log('ok')}
  requesr.onerror=function(event){
    if(request.error.name==='ConstraintError'){
      event.preventDefault();//不终止事务
    }else{
      //意外错误 将会终止事务
    }
  }
  transaction.onabort=function(){}
```

### 事件委托
不用每个请求都调用`onsuccess/onerror`，IndexedDB 事件冒泡：请求 → 事务 → 数据库。
```js
db.onerror=function(event){
  let request=event.target;//导致错误的请求
}
```
我们也可以使用`event.stopPropagation()`来停止冒泡
```js
requesr.onerror=function(event){
    if(request.error.name==='ConstraintError'){
      event.preventDefault();//不终止事务
      event.stopPropagation()
    }else{
      //意外错误 将会终止事务
    }
  }
```

### 通过键搜索

涉及到的搜索方法，包括支持精确键，也包括所谓的“范围查询” —— `IDBKeyRange` 对象指定一个“键范围”。

使用以下调用函数创建范围：

+ IDBKeyRange.lowerBound(lower, [open]) 表示：≥lower（如果 open 是 true，表示 >lower）
+ IDBKeyRange.upperBound(upper, [open]) 表示：≤upper（如果 open 是 true，表示
+ IDBKeyRange.bound(lower, upper, [lowerOpen], [upperOpen]) 表示: 在 lower 和 upper 之间。如果 open 为 true，则相应的键不包括在范围中。
+ IDBKeyRange.only(key) —— 仅包含一个键的范围 key，很少使用。

所有搜索方法都接受一个查询参数 query，该参数可以是精确键或者键范围：

+ store.get(query) —— 按键或范围搜索第一个值。
+ store.getAll([query], [count]) —— 搜索所有值。如果 count 给定，则按 count 进行限制。
+ store.getKey(query) —— 搜索满足查询的第一个键，通常是一个范围。
+ store.getAllKeys([query], [count]) —— 搜索满足查询的所有键，通常是一个范围。如果 count 给定，则最多为 count。
+ store.count([query]) —— 获取满足查询的键的总数，通常是一个范围。

!> 对象库始终是有序的,对象库按键对值进行内部排序。因此，请求的返回值，是按照键的顺序排列的。

### 通过带索引的字段搜索
```js
objectStore.createIndex(name,keyPath,[options])
```
+ name —— 索引名称。
+ keyPath —— 索引应该跟踪的对象字段的路径（我们将根据该字段进行搜索）。
+ option —— 具有以下属性的可选对象：
  - unique —— 如果为true，则存储中只有一个对象在 keyPath 上具有给定值。如果我们尝试添加重复项，索引将生成错误。
  - multiEntry —— 只有 keypath 上的值是数组才时使用。这时，默认情况下，索引将默认把整个数组视为键。但是如果 multiEntry 为 true，那么索引将为该数组中的每个值保留一个存储对象的列表。所以数组成员成为了索引键。

```js
openRequest.onupgradeneeded=function(event){
  var db=event.target.result
  if(!db.objectStoreNames.contains('books')){
    let inventory=db.createObjectStore('books',{keyPath:'id'})
    let index=inventory.createIndex('name_idx','name')
  }
}
```

读取
```js
  let transaction = db.transaction('books','readwrite');
  let books=transaction.objectStore('books');
  let nameIndex=books.index('name_idx');
  let result=nameIndex.getAll();
  result.onsuccess=function(){
    console.log(result.result)
  }
```

### 从存储中删除
delete(query) —— 通过查询删除匹配的值。

```js
  let nameIndex=books.index('name_idx')
  let result=nameIndex.getKey('星空')
  result.onsuccess=function(){
    books.delete(request.result)
  }
```

```js
books.clear()//删除所有
```

### 光标
像 getAll/getAllKeys 这样的方法，会返回一个 键/值 数组。

但是一个对象库可能很大，比可用的内存还大。这时，getAll 就无法将所有记录作为一个数组获取。该怎么办呢？

?> 光标是一种特殊的对象，它在给定查询的情况下遍历对象库，一次返回一个键/值，从而节省内存。<br>
由于对象库是按键在内部排序的，因此光标按键顺序（默认为升序）遍历存储。

```js
let request=store.openCursor(query,[direction])
```
+ query 是一个键或键范围，与 getAll 相同。
+ direction 是一个可选参数，使用顺序是：
  - "next" —— 默认值，光标从有最小索引的记录向上移动。
  - "prev" —— 相反的顺序：从有最大的索引的记录开始下降。
  - "nextunique"，"prevunique" —— 同上，但是跳过键相同的记录 （仅适用于索引上的光标，例如，对于价格为 5 的书，仅返回第一本）。

  ```js
  let transaction = db.transaction('books','readwrite');
  let books=transaction.objectStore('books');
  let request=books.openCursor();
  request.onsuccess=function(){
    let cursor=request.result;
    if(cursor){
      cosnole.log(cursor.key,cursor.value)
      cursor.continue()
    }
  }
  ```
主要的光标方法有：
+ advance(count) —— 将光标向前移动 count 次，跳过值。
+ continue([key]) —— 将光标移至匹配范围中的下一个值（如果给定键，紧接键之后）。

### Promise 包装器

[IDB](https://github.com/jakearchibald/idb)

### 错误处理

```js
window.addEventListener('unhandledrejection',event=>{
  let request=event.target;//IndexedDB 本机请求对象
  let error=event.reason;//未处理的错误对象，与 request.error 相同
})
```

介绍一个工具[GoDB](https://github.com/chenstarx/GoDB.js)

[https://www.zhangxinxu.com/wordpress/2017/07/html5-indexeddb-js-example/](https://www.zhangxinxu.com/wordpress/2017/07/html5-indexeddb-js-example/)