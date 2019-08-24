window.onload=function(){
    setTimeout(function(){
        var str=`<li>
                <img src="/static/logo.png" data-origin="static/logo.png" alt="对点">
            </li>
            <li>
                <img src="/static/logo_text.png" data-origin="static/logo_text.png" alt="对点儿">
            </li>`;
    var navNode=document.getElementsByClassName('app-nav')[0];
    console.log(navNode)
    var targetUl=navNode.getElementsByTagName('ul')[0];
       targetUl.innerHTML=str+targetUl.innerHTML;
  
    },0)
}

// * ![对点](static/logo.png)
// * ![对点儿](static/logo_text.png)