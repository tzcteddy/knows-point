```js
class HistoryRoute{
    constructor(){
        this.current=null;
    }
}

class vueRouter{
    constructor(options){
        this.mode=options.mode||'hash';
        this.history=new HistoryRoute();
        this.routes=options.routes||[];
        this.routerMap=this.createdMap(this.routes);
        this.init();
    }
    init(){
        if(this.mode==='hash'){
            this.location.hash?"":this.location.hash='/';
            window.addEventListener('load',function(params){
                this.history.current=location.hash.slice(1);
            })
            window.addEventListener('hashChange',function(params){
                this.history.current=location.hash.slice(1);
            })
        }else{
            window.addEventListener('load',function(params){
                this.history.current=location.pathname;
            })
            window.addEventListener('popstate',function(params){
                this.history.current=location.pathname;
            })
        }
    }
    createdMap(routes){
        return routes.reduce((memo,current)=>{
            memo[current.path]=current.component;
            return memo;
        },{})
    }
};
//Vue.use(param:Function||Object)方法 typeof param.install===function  typeof param==='function'
vueRouter.install=function(Vue){
    vueRouter.mixin({
        beforCreated(){
            //this.$options是new Vue()时的参数
            if(this.$options&&this.$options.router){
                this._root=this;
                this._router=this.$options.router;
                //definedReactive：监听到变化后渲染
                vueRouter.unit.definedReactive(this,'current',this._router.history);
            }else{
                this._root=this.$parent._root;
            }
            
        }
    })
    vue.component('router-view',{
        render(h){
            //拿到当前路由对应的组件，然后把组件渲染出去
            let current=this._self._root._router.history.current;
            let routeMap=this._self._root._router.routeMap;
            return h(routeMap[current])
        }
    })
}
export default vueRouter
```