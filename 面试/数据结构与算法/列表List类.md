## 列表的抽象数据类型定义

列表是一组有序的数据，每个列表中的数据项称为**元素**，列表中的元素可以是任意数据类型，列表中可以保存多少元素并没有事先限定，实际使用时元素的数量受到程序内存的限制。

列表的抽象数据类型定义

|属性/方法|功能描述|
|---|---|
|listSize(属性)|列表的元素个数|
|pos(属性)|列表的当前位置|
|length(属性)|返回列表中元素的个数|
|clear(方法)|清除列表中所有的元素|
|toString(方法)|返回列表的字符串形式|
|getElement(方法)|返回当前位置的元素|
|insert(方法)|在现有元素后插入新元素|
|append(方法)|在列表的末尾添加新元素|
|remove(方法)|从列表中删除元素|
|front(方法)|将列表的当前位置移动到第一个元素|
|end(方法)|将列表的当前位置移动到最后一个元素|
|prev(方法)|将当前位置后移一位|
|next(方法)|将当前位置前移一位|
|currPos(方法)|返回列表的当前位置|
|moveTo(方法)|将当前位置移动到指定位置|

## 实现列表类

### 我们从构造函数开始
```js
function List(){
    this.listSize=0;
    this.pos=0;
    this.dataStore=[];//初始化一个空数组来保存列表元素
    this.clear=clear;
    this.find=find;
    this.toString=toString;
    this.insert=insert;
    this.append=append;
    this.remove=remove;
    this.front=front;
    this.end=end;
    this.prev=prev;
    this.next=next;
    this.length=length;
    this.currPos=currPos;
    this.moveTo=moveTo;
    this.getElement=getElement;
    this.contains=contains;
}
```
### append:给列表添加元素
该方法给列表的下一个位置添加一个元素，这个位置刚好等于变量listSize的值
```js
function append(element){
    this.dataStore[this.listSize++]=element;//放心元素就位后listSize加1
}
```
### remove:从列表中删除元素
要从列表中删除元素，首先要找到这个元素，然后删除它，并且调整底层的数组对象以填补删除该元素留下的空白
#### 辅助函数find
```js
function find(element){
    for(var i=0;i<this.dataStore.length;i++){
        if(this.dataStore[i]==element){
            return i;
        }
    }
    return -1;
}
```
#### remove
使用find方法返回的位置对数组dataStore进行截取。数组改变后将变量listSize的值减1，以反映列表的最新长度，如果元素删除成功返回true,否则返回false。
```js
function remove(element){
    var foundAt=this.find(element);
    if(foundAt>-1){
        this.dataStore.splice(foundAt,1);
        --this.listSize;
        return true
    }
    return false;
}
```
### length：列表中有多少元素
返回列表中元素的个数
```js
function length(){
    return this.listSize;
}
```

### toString:显示列表中的元素
```js
function toString(){
    return this.dataStore;
}
```
### insert:向列表中插入元素
```js
function insert(element,after){
    var insertPos=this.find(after);
    if(insertPos>-1){
        this.dataStore.splice(inserPos+1,0,element);
        ++this.listSize;
        return true;
    }
    return false;
}
```
### clear:清空列表中所有元素
```js
function clear(){
    delete this.dataStore;
    this.dataStore=[];
    this.listSize=this.pos=0;
}
```
### contains:判断给定值是否在数组中
```js
function contains(element){
    for(var i=0;i<this.dataStore.length;++i){
        if(this.dataStore[i]==element){
            return true;
        }
    }
    return false;
}
```
### 遍历列表
```js
function front(){
    this.pos=0;
}
function end(){
    this.pos=this.listSize-1;
}
function prev(){
    if(this.pos>0){
        --this.pos
    }
}
function next(){
    if(this.pos<this.listSize-1>){
        ++this.pos;
    }
}
function currPos(){
    return this.pos;
}
function moveTo(position){
    this.pos=position;
}
function getElement(){
    return this.dataStore[this.pos];
}
```
### 使用迭代器访问列表
使用迭代器，不必关心数据的内部存储方式，以实现对列表的遍历
```js
for(names.front();names.currPos<names.length();names.next()){
    print(names.getElement());
}
```

