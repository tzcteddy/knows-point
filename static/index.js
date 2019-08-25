window.onload=function(){
    function getCookie(e) {
        var t = document.cookie.match(new RegExp("(^| )" + e + "=([^;]*)(;|$)"));
        return null != t ? unescape(t[2]) : null
    }
    function scret(){
        var isScret=getCookie('dotcom_user')=='tzcteddy';
        var sidebar=document.getElementsByClassName('sidebar')[0];
        var appBar=sidebar.getElementsByClassName('sidebar-nav')[0];
        console.log(appBar.getElementsByTagName('ul')[0])
        var listAry=appBar.getElementsByTagName('ul')[0].children;
        for(var i=0;i<listAry.length;i++){
            var a=listAry[i].getElementsByTagName('a')[0];
            var href=a.getAttribute('href');
        var isScret=getCookie('dotcom_user')=='tzcteddy';
            if(href=='#/面试/'&&!isScret){
                listAry[i].parentNode.removeChild(listAry[i]);
            }
        }
    }
    var count=0;
    var timer=setInterval(function(){
        count+=1;
        if(document.getElementsByClassName('sidebar-nav')[0]&&document.getElementsByClassName('sidebar-nav')[0].getElementsByTagName('ul')[0]){
           clearInterval(timer);
           scret();
        }else if(count==5){
            clearInterval(timer);
        }
    },200)
}

// * ![对点](static/logo.png)
// * ![对点儿](static/logo_text.png)