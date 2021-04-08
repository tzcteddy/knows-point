## 算法

### 去重

```js
function qc(ary){
    var obj={};
    for (var i=0;i<ary.length;i++){
        var cur=ary[i];
        if(obj[cur]==cur){
            ary[i]=ary[ary.length-1];
            ary.length--;
            i--;
            continue;
        }
        obj[cur]=cur;
    }
    return ary;
}
```
### 冒泡排序
```js
function mp(ary){
  var flag=false;
  for(var i=0;i<ary.length-1;i++){
    for(var j=0;j<ary.length-1-i;j++){
       if(ary[j]>ary[j+1]){
          var val=ary[j];
          ary[j]=ary[j+1];
          ary[j+1]=val;
          flag=true;
       }
    }
    if(flag){
       flag=false;
    }else{
      break;
    }
  }
  return ary
}
```

### 快速排序
```js
function qs(n){
  if(n.length<=1){
    return n;
  }
  var val=n.splice(0,1)[0];
  var left=[],right=[];
  for(var i=0;i<n.length;i++){
     if(val<n[i]){
       right.push(n[i]);
     }else{
      left.push(n[i]);
     }
  }
  return qs(left).concat(val,qs(right));
}
```
### 波菲那契
```js
Fn(1)=1 Fn(2)=1 Fn(n)=Fn(n-1)+fn(n-2)
//递归实现
function bf(n){
    if(n==1||n==2){
        return 1
    }else{
      return bf(n-1)+bf(n-2)
    }
}
//循环实现
function bf(n){
    var num1=1,num2=1,sum;
    for(var i=3;i<=n;i++){
        sum=num1+num2;
        num1=num2;
        num2=sum;
    }
    if(n==1||n==2){
        return 1
    }
    return sum;
}
```

### 给定一个整数数组和一个目标值，找出数组中和为目标值的两个数、判断一个整数是否是回文数

```js
<!--
给定一个整数数组和一个目标值，找出数组中和为目标值的两个数。
你可以假设每个输入只对应一种答案，且同样的元素不能被重复利用。

示例：
给定 nums = [2, 7, 11, 15], target = 9
因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
-->
function twoSun(nums,target){
    const hash={};
    for(let i=0;i<nums.length;i++){
        if(hash[nums[i]]!==undefined){
            return[hash[nums[i]],i]
        }else{
            let newKey=target-nums[i];
            hash[newKey]=i;
        }
    }
    return [-1,-1]
}
```

### 判断一个整数是否是回文  即正序倒序一样

```js
function isPalindrom(x){
    if(x<0||(x%10==0&&x!==0)){
        return false;
    }
    let rev=0;
    while(x>=10){
        let cur=x%10;
        rev=rev*10+cur;
        if(x===rev) return true;
        x=~~(x/10);
        if(x===rev) return true;
        if(x<rev) return false;
    }
    return false;
}
```

### 结构化数据
```js
    var data=[
        {id:1,pid:null,name:'a'},
        {id:2,pid:1,name:'a-2'},
        {id:3,pid:1,name:'a-3'},
        {id:4,pid:2,name:'a-2-4'},
        {id:5,pid:null,name:'b'},
        {id:6,pid:5,name:'b-6'},
        {id:7,pid:5,name:'b-7'},
        {id:8,pid:7,name:'b-7-8'},
    ]
    //数组=>树
    function getTree(data, pid) {
    let result = []
    let temp
    for (let i = 0; i < data.length; i++) {
        if (data[i].pid == pid) {
            temp = getTree(data, data[i].id)
            if (temp.length > 0) {
                data[i].children = temp
            }
            result.push(data[i])
        }
    }
    return result
}
//树=>数组
function readTree(data, val) {
    val.push({
        id: data.id,
        name: data.name,
        pid: data.pid
    })
    if (data.children) {
        for (let i = 0; i < data.children.length; i++) {
            readTree(data.children[i], val)
        }
        return val
    }

}
console.log(readTree(getTree(data)[0],[]));
function toTreeData(data) {
	var pos = {};
	var tree = [];
	var i = 0;
	while(data.length != 0) {
		if(data[i].pid == null) {
			tree.push({
				id: data[i].id,
				name: data[i].text,
				children: []
			});
			pos[data[i].id] = [tree.length - 1];
			data.splice(i, 1);
			i--;
		} else {
			var posArr = pos[data[i].pid];
			if(posArr != undefined) {
 
				var obj = tree[posArr[0]];
				for(var j = 1; j < posArr.length; j++) {
					obj = obj.children[posArr[j]];
				}
 
				obj.children.push({
					id: data[i].id,
					name: data[i].text,
					children: []
				});
				pos[data[i].id] = posArr.concat([obj.children.length - 1]);
				data.splice(i, 1);
				i--;
			}
		}
		i++;
		if(i > data.length - 1) {
			i = 0;
		}
	}
	return tree;
}

function lookupPath(all, func, path = []) {
      if (!all) return [];
      for (const item of all) {
        path.push(item);
        if (func(item)) return path;
        if (item.children) {
          const findChildren = this.getNavs(item.children, func, path);
          if (findChildren.length) return findChildren;
        }
        path.pop();
      }
      return [];
    }
lookupPath(tree,(data)=>data.name==='b-7-8')
```

### 根据路径取对象上的值
```js
var bailRE = /[^\w.$]/;  //匹配任何字符 已点结束的字符串

function parsePath(path) {
    if (bailRE.test(path)) {  //匹配上 返回 true
        return
    }
    //匹配不上  path在已点分割
    var segments = path.split('.');
    return function (obj) {

        for (var i = 0; i < segments.length; i++) {
            //如果有参数则返回真
            if (!obj) {
                return
            }
            //将对象中的一个key值 赋值给该对象 相当于 obj = obj[segments[segments.length-1]];
            obj = obj[segments[i]];
        }
        //否则返回一个对象
        return obj
    }
}
```

### 二分法
```js
let ary=[1,23,46,68,83,89]
function get(arr,target){
  let minIndex=0;
  let maxIndex=arr.length-1;
  while(minIndex<=maxIndex){
    let midIndex=Math.floor((maxIndex+minIndex)/2);
    if(arr[midIndex]<target){
      minIndex=midIndex+1
    }else if(arr[midIndex]>target){
      maxIndex=midIndex-1
    }else{
      return midIndex
    }
  }
  return -1
}
console.log(get(ary,1))
```

```js
let obj={
  key:123,
  name:'a',
  child:[
    {
      key:123,
      name:'b',
      child:[
        {
          key:321,
          name:'c'
        },
        {
          key:321,
          name:'d'
        }
      ]
    },
    {
      key:234,
      name:'e',
      child:[
        {
          key:123,
          name:'f'
        }
      ]
    }
  ]
}
```
### 深度优先

```js
function dfs(node){
  console.log(node.name)
  if(!node.child||!node.child.length)return
  node.child.forEach(dfs)
}

```
### 广度优先

```js
function bfs(node){
  const queue=[node]
  while(queue.length>0){
    const n=queue.shift();
    console.log(n.name)
    if(!n.child||!n.child.length)continue
    n.child.forEach(child=>{
      queue.push(child)
    })
  }
}
```

### 最大公约数
```js
function getGCD(a, b) {
  // get greatest common divisor(GCD)
  //欧几里得算法
  // GCD(a, b) = GCD(b, a % b)
  a = Math.abs(a);
  b = Math.abs(b);
  let mod = a % b;

  while (mod !== 0) {
    a = b;
    b = mod;
    mod = a % b;
  }

  return b;
}
```

### 最小公倍数
      对于两个数a, b, 如果gcd是他们的最大公约数(如上)，那么存在另外两个互质的数字x, y：
      a = x * gcd
      b = y * gcd
      所以他们的最小公倍数就是 x * y * gcd，也就是
      (x * gcd) * (y * gcd) / gcd
      = a * b / gcd

### 区间交集

```js
//[2,5],[4,6]
//getIntersection([5,2],[4,9],[3,6]) //[4,5]
function getIntersection(){

}
```

### 数组全排列

```js
function permute(input) {
  var permArr = [],
  usedChars = [];
  function main(input){
    var i, ch;
    for (i = 0; i < input.length; i++) {
      ch = input.splice(i, 1)[0];
      usedChars.push(ch);
      if (input.length == 0) {
        permArr.push(usedChars.slice());
      }
      main(input);
      input.splice(i, 0, ch);
      usedChars.pop();
    }
    return permArr
  }
  return main(input);
};
console.log(permute([5, 3, 7, 1]))
```