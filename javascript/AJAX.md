# AJAX

```js
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