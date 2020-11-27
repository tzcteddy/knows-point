window.onload=function(){
  var weiboHotReg = /<a href="(\/weibo\?q=[^"]+)".*?>(.+)<\/a>/g;
  var weiboHotApi='https://s.weibo.com/top/summary'
  var KnowsPoint={
    getCookie:function(e) {
      var t = document.cookie.match(new RegExp("(^| )" + e + "=([^;]*)(;|$)"));
      return null != t ? unescape(t[2]) : null
    },
    hideVueInit:function(){
      let aList=document.getElementsByTagName("a");
      let li;
      for(var i=0;i<aList.length;i++){
          if(aList[i].href.indexOf('#/vue/init')>=0){
              li=aList[i].parentNode;
              li.style.display="none"
              break
          }
      }
    },
    console:function(){
      setTimeout(()=>{
        this.hideVueInit()
        // console.clear();
        console.log('%c 对点','color:#e60000;font-size:32px;text-shadow:2px 2px orange;')
      },0)
    },
    swiper:function(){
      var swiper = new Swiper('.swiper-container', {
        autoplay:true,
        delay:1000,
        loop:true,
        speed:300,
        direction:'vertical',
        pagination: {
            el: '.swiper-pagination',
        },
      });
    }
  }
  Object.keys(KnowsPoint).forEach(fn=>{
    if(typeof KnowsPoint[fn]==='function'){
      KnowsPoint[fn]()
    }
  })
 
  window.onpopstate=function(){
    if (document.readyState === "complete") {
      setTimeout(()=>{
        var script=document.getElementById('built-in');
      if(script){
        eval(console.log('内置页面js执行'))
        eval(script.innerText)
      }
      },0)
    }
  }
}

// * ![对点](static/logo.png)
// * ![对点儿](static/logo_text.png)