```js
const isFunction=fn=>typeof fn==='function';
const PENDING='PENDING';
const FULFILLED='FULFILLED';
const REJECTED='REJECTED';
class MyPromise {
    constructor(hadle){
        if(!isFunction(handle)){
            throw new Error('MyPromise 应该接受一个函数类型的参数')
        }

        //执行对列
        this._fulfiledQueues=[];
        this._rejectedQueues=[];

         //状态  Pending=>Fulfilled 或 Pending=>Rejected
         this._status=PENDING;
         this._value=undefined;

         try{
             handle(this._resolve.bind(this),this._reject.bind(this))
         }catch(err){
             this._reject(err);
         }
    }
   _resolve(val){
        const run=()=>{
            if(this._status!==PENDING)return;
            this._status=FULFILLED;
            //this._value=val;
            const runFulfilled=(value)=>{
                let cb;
                while(cb=this._fulfiledQueues.shift()){
                    cb(value)
                }
            }
            const runRejected=(error)=>{
                let cb;
                while(cb=this._rejectedQueues.shift()){
                    cb(error)
                }
            }
            //当resolve参数为Promise对象时，则必须等待该Promise对象状态改变后，当前Promise的状态才会改变和参数Promise状态一致
            if(val instanceof MyPromise){
                val.then(value=>{
                    this._value=value;
                    runFulfilled(value);
                },err=>{
                    this._value=err;
                    runRejected(err);
                })
            }else{
                this._value=val;
                runFulfilled(val)
            }
        }
        setTimeout(()=>{run()},0)
   }
   _reject(err){
       if(this_status!==PENDING)return;
       const run=()=>{
        this._status=REJECTED;
        this._value=err;
        let cb;
            while(cb=this._rejectedQueues.shift()){
                cb(val)
            }
       }
       setTimeout(()=>{run()},0)
   }
   then(onFulfiled,onRejected){
        const {_value,_status}=this;
        switch(_status){
            //pending时，将回调函数加入执行队列等待
            case PENDING:
                this._fulfiledQueues.push(onFulfiled);
                this._rejectedQueues.push(onRejected);
                break;
                //状态改变时执行对应回调函数
            case FULFILLED:
                onFulfiled(_value);
                break;
            case REJECTED:
                onRejected(_value);
                break;
        }
        return new MyPromise((onFulfilledNext,onRejectedNext)=>{
            let fulfilled=value=>{
                try{
                    if(!isFunction(onFulfiled)){
                        onFulfilledNext(value);
                    }else{
                        let res=onFulfiled(value);
                        if(res instanceof MyPromise){
                            res.then(onFulfilledNext,onRejected);
                        }else{
                            onFulfilledNext(res);
                        }
                    }
                }catch(err){
                    onRejectedNext(err)
                }
            }
            let rejected=error=>{
                try{
                    if(!isFunction(onRejected)){
                        onRejectedNext(error);
                    }else{
                        let res=onRejected(error);
                        if(res instanceof MyPromise){
                            res.then(onFulfilledNext,onRejectedNext);
                        }else{
                            onFulfilledNext(res);
                        }
                    }
                }catch(err){
                    onRejectedNext(err);
                }
            }
            switch(_status){
                case PENDING:
                    this._fulfiledQueues.push(fulfilled);
                    this._fulfiledQueues.push(rejected);
                    break;
                case FULFILLED:
                    fulfilled(_value);
                    break;
                case REJECTED:
                    rejected(_value);
                    break;
            }
        })
   }
   catch(onRejected){
       return this.then(undefined,onRejected)
   }
   static resolve(value){
       if(value instanceof MyPromise)return value;
       return new MyPromise(resolve=>{resolve(value)});
   }
   static reject(value){
       return new MyPromise((resolve,reject)=>{reject(value)})
   }
   static all(list){
        return new MyPromise((resolve,reject)=>{
            let values=[];
            let count=0;
            for(let [i,p] of list.entries()){
                this.resolve(p).then(res=>{
                    values[i]=res;
                    count++
                    if(count===list.length)resolve(values)
                },err=>{
                    reject(err)
                })
            }
        })
   }
   static race(list){
        return new MyPromise((resolve,reject)=>{
            for (p of list){
                this.resolve(p).then(res=>{
                    resolve(res);
                },err=>{
                    reject(err)
                })
            }
        })
   }
   finally(cb){
       return this.then(
           value=>MyPromise.resolve(cb()).then(()=>value),
           reason=>MyPromise.resolve(cb()).then(()=>{throw reason})
       )
   }

}
```