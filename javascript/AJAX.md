# AJAX

```js
var XMLHttpRequest=window.XMLHttpRequest||window.ActiveXObject;
var xhr=new XMLHttpRequest();

  xhr.overrideMimeType('text/plain') 方法是指定一个MIME类型用于替代服务器指定的类型
  xhr.open('get','/cookie');
  xhr.timeout=2000
  xhr.ontimeout=function(){ //open之后 send之前
    console.log('请求超时')
  }
  xhr.onloadstart=function(){console.log('请求开始')}

  xhr.withCredentials=false
  xhr.responseType=''
  xhr.onreadystatechange=function(){
      if(xhr.readyState==4&&xhr.status==200){
          console.log('response',xhr.response)
          console.log('responseText',xhr.responseText)
          console.log('responseType',xhr.responseType)
          console.log('getResponseHeaders',xhr.getResponseHeaders())
          console.log('getAllResponseHeaders',xhr.getAllResponseHeaders())
      }
  }

  xhr.onabort=function(){console.log('请求被停止')}
  xhr.setRequestHeader('token','123')
  xhr.send()

  function addListeners(xhr) {
    xhr.addEventListener('loadstart', handleEvent);
    xhr.addEventListener('load', handleEvent);
    xhr.addEventListener('loadend', handleEvent);
    xhr.addEventListener('progress', handleEvent);
    xhr.addEventListener('error', handleEvent);
    xhr.addEventListener('abort', handleEvent);
}
```

### readyState
+ 0:UNSENT 未发送，刚开始创建完成，默认状态0
+ 1:OPENED 已打开,执行了open之后
+ 2:HEADERS_RECEIVED 响应头信息已成功返回并接受
+ 3:LOADING 响应主体内容正在加载
+ 4:DONE 响应主体接受成功