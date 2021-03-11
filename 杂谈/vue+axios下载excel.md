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


### 原生实现下：
```js
function downloadFile(url, filename) {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.responseType = 'blob'
  // xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('token', token)
  xhr.onload = function() {
    if (xhr.status === 200) {
      // const data = xhr.response;
      // const blob = new Blob([data]);
      // const blobUrl = window.URL.createObjectURL(blob);
      download(xhr.response, filename)
    }
  }
  xhr.send()
}
//实现 download方法
function download(blob, filename) {
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(blob, filename)
  } else {
    var link = document.createElement('a')
    var body = document.querySelector('body')
    window.URL = window.URL || window.webkitURL;
    link.href = window.URL.createObjectURL(blob)
    link.download = filename
    // fix Firefox
    link.style.display = 'none'
    body.appendChild(link)
    link.click()
    body.removeChild(link)
    window.URL.revokeObjectURL(link.href)
  }
}
```

`Internet Explorer 10` 的 `msSaveBlob` 和 `msSaveOrOpenBlob` 方法允许用户在客户端上保存文件，方法如同从 Internet 下载文件，这是此类文件保存到“下载”文件夹的原因。
+ msSaveBlob：保存
+ msSaveOrOpenBlob：保存打开



