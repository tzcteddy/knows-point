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