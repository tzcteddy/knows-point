## js现代的ObserverAPI
Observer API——也就是观察者API 释放了web隐藏的超能力以创建真正的响应式体验，从懒加载关键内容到非侵入式性能监控，在检测方面非常方便，可以创建响应式应用。

有四种类型的观察者可以观察不同的东西，从DOM到浏览器性能：
### MutationObserver
MutationObserver观察DOM树，监听DOM的变化

```js
//选择要观察的突变的节点
const targetNode=document.getElementById('element');

//观察者的选项(观察哪些变化)
const config={
    attributes:true,
    childList:true,
    subtree:true
}

//创建一个观察者实例，连接到一个回调，以便在观察到突变时执行
const observer=new MutationObserver((mutations,observer)=>{
    mutations.forEach(mutation=>{
        if(mutation.type==='childList'){
            console.log('添加或删除一个子节点')
        }else if(mutation.type==='attrbutes'){
            console.log(`${mutation.attributeName}属性被修改了`)
        }
    })
})

//开始观察目标节点的配置突变情况
observer.observe(targetNode,config)

//停止观察
observer.disconnect()

```
当元素的属性、文本或内容发生变化是，我们会得到通知，同时也会监控子节点是否被添加或删除

### IntersectionObserver

IntersectionObserver观察一个DOM元素的可见性，监听其位置的变化

```js
//选择要观察的突变的节点
const targetNode=document.getElementById('element');

//观察的选项(观察哪些突变)
const config={
    rootMargin:'-100% 0px 0px 0px'
}

//创建观察者实例
const intersectionObserver=new IntersectionObserver((entries,observer)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            console.log('观察')；
            //停止观察
            observer.unobserve(entry.target)
        }
    })
})

//开启观察
intersectionObserver.observe(targetNode,config)
```
这个基于目标元素的可见性和位置的懒惰加载和动画内容方面非常有用
### ResizeObserver

ResizeObserver观察元素的内容或边框，监听元素及其子元素的变化
```js
//选择要观察的节点
const targetNode=document.getElementById('element');

const resizeObserver=new ResizeObserver((entries,observer)=>{
    entries.forEach((entry)=>{
        console.log(`元素大小${entry.width}px ${entry.height}px`)

        //停止监听
        observer.unobserve(entry.target)
    })
})

//开始观察
resizeObserver.observe(targetNode)
```
创建基于输入或触发器包装的动态内容时这个观察这很重要
### PerformanceObserver
PerformanceObserver观察性能测量事件，监听新的性能条目
```js
//观察者选项
const config={
    entryTypes:['resource','mark','measure']
}
const observer=new PerformanceObserver(list=>{
    list.getEntries().forEach(entry=>{
        console.log(`${entry.name}`)
        console.log(`${entry.entryType}`)
        console.log(`${entry.startTime}`)
        console.log(`${entry.duration}`)
    })
})
//开始监听
observer.observe(config);
performance.mark('registered-observer')
```
这对于接收性能通知很有用，可以在空闲的时候运行，而不与关键的渲染工作竞争。