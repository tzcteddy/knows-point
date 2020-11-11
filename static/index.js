window.onload=function(){
    function getCookie(e) {
        var t = document.cookie.match(new RegExp("(^| )" + e + "=([^;]*)(;|$)"));
        return null != t ? unescape(t[2]) : null
    }
    function hideVueInit(){
        let aList=document.getElementsByTagName("a");
        let li;
        for(var i=0;i<aList.length;i++){
            if(aList[i].href.indexOf('#/vue/init')>=0){
                li=aList[i].parentNode;
                li.style.display="none"
                break
            }
        }
    }
    setTimeout(()=>{
        hideVueInit()
        console.clear();
        console.log('%c 对点','color:#e60000;font-size:32px;text-shadow:2px 2px orange;')
    },0)
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

// * ![对点](static/logo.png)
// * ![对点儿](static/logo_text.png)