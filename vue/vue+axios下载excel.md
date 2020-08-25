## vue+axios下载excel


我们使用`vue`+`axios`
```js
axios.get('/statistic/export').then(res=>{})
```
我们可以拿到后台返回的数据
后台返回的数据流,响应头`Content-Type: application/octet-stream;charset=UTF-8`,长这个样子
```
��ࡱ�;��	
��������������
Џ�{���RKmՋN�1	�
Џ�{���RKmՋN�2	�
Џ�{���RKmՋ�N�1	�
Џ�{���RKmՋ�N�2	�100�N�Q�R�Q�l�1
�
�
�
�
```

然后我们使用blob
```js
export default function(data,filename){
    let blob = new Blob([data], {type: 'application/vnd.ms-excel;charset=utf-8'})
    window.URL = window.URL || window.webkitURL;
    let href = URL.createObjectURL(blob);
    let downA = document.createElement("a");
    downA.href =  href;//
    downA.download = filename;
    downA.click();
    window.URL.revokeObjectURL(href);
}
```

此时就可以下载了

> 问题1：下载后打不开 或者 错误乱码

**解决**
```js
//添加 responseType: 'blob' 配置
axios.get('/statistic/export',{responseType: 'blob'}).then(res=>{})
```

>问题2：mac下载的后缀为`xlw`

**解决**
`download`方法的filename加上`.xls`强制转换

