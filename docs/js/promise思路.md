# ????
<img src="https://user-gold-cdn.xitu.io/2018/6/26/1643b4974e9b815b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" width="100%">

>+  Promise ?????
>+ ??????,????
>+ then
>+ ??????,setTomeout, ?????
>+ ??????
>+ ??resolvePromise??
>+ ??????
>+ catch?resolve?reject?race?all??


## 1 Promise ?????
```
class Promise{
  // ???
  constructor(executor){
    // ??
    let resolve = () => { };
    // ??
    let reject = () => { };
    // ????
    executor(resolve, reject);
  }
}
```
## 2 ??????,????
```
class Promise{
  constructor(executor){
    // ???state????
    this.state = 'pending';
    // ????
    this.value = undefined;
    // ?????
    this.reason = undefined;
    let resolve = value => {
      // state??,resolve??????
      if (this.state === 'pending') {
        // resolve????state??????
        this.state = 'fulfilled';
        // ??????
        this.value = value;
      }
    };
    let reject = reason => {
      // state??,reject??????
      if (this.state === 'pending') {
        // reject????state??????
        this.state = 'rejected';
        // ???????
        this.reason = reason;
      }
    };
    // ??executor?????????reject
    try{
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
}


```
## 3 then
```
class Promise{
  constructor(executor){...}
  // then ?? ?????onFulfilled onRejected
  then(onFulfilled,onRejected) {
    // ???fulfilled???onFulfilled???????
    if (this.state === 'fulfilled') {
      onFulfilled(this.value);
    };
    // ???rejected???onRejected????????
    if (this.state === 'rejected') {
      onRejected(this.reason);
    };
  }
}
```
## 4 ??????,setTomeout, ?????
```
class Promise{
  constructor(executor){
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    // ???????
    this.onResolvedCallbacks = [];
    // ???????
    this.onRejectedCallbacks = [];
    let resolve = value => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        // ??resolve????????????
        this.onResolvedCallbacks.forEach(fn=>fn());
      }
    };
    let reject = reason => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        // ??reject????????????
        this.onRejectedCallbacks.forEach(fn=>fn());
      }
    };
    try{
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  then(onFulfilled,onRejected) {
    if (this.state === 'fulfilled') {
      onFulfilled(this.value);
    };
    if (this.state === 'rejected') {
      onRejected(this.reason);
    };
    // ???state?pending?
    if (this.state === 'pending') {
      // onFulfilled???????
      this.onResolvedCallbacks.push(()=>{
        onFulfilled(this.value);
      })
      // onRejected???????
      this.onRejectedCallbacks.push(()=>{
        onRejected(this.reason);
      })
    }
  }
}

```
## 5 ??????
>1????????????????then?????promise??????????????then????????promise,??promise2?promise2 = new Promise((resolve, reject)=>{})

>+ ???promise2??????????then?
>+ ???????????????????????then?

> 2????????then?return??????????????????return?????promise??onFulfilled()?onRejected()??

>?????onFulfilled()?onRejected()???????then???????x???x?????resolvePromise

>+ ?????x???promise?
>+ ???promise????????????promise2?????
>+ ???????????promise2?????
>+ ?????x?promise2
>+ resolvePromise????promise2??????promise??x?????return?????resolve?reject
>+ resolve?reject?promise2?

```
class Promise{
  constructor(executor){
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    let resolve = value => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onResolvedCallbacks.forEach(fn=>fn());
      }
    };
    let reject = reason => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn=>fn());
      }
    };
    try{
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  then(onFulfilled,onRejected) {
    // ?????promise2
    let promise2 = new Promise((resolve, reject)=>{
      if (this.state === 'fulfilled') {
        let x = onFulfilled(this.value);
        // resolvePromise???????return?promise????promise2???
        resolvePromise(promise2, x, resolve, reject);
      };
      if (this.state === 'rejected') {
        let x = onRejected(this.reason);
        resolvePromise(promise2, x, resolve, reject);
      };
      if (this.state === 'pending') {
        this.onResolvedCallbacks.push(()=>{
          let x = onFulfilled(this.value);
          resolvePromise(promise2, x, resolve, reject);
        })
        this.onRejectedCallbacks.push(()=>{
          let x = onRejected(this.reason);
          resolvePromise(promise2, x, resolve, reject);
        })
      }
    });
    // ??promise?????
    return promise2;
  }
}

```
## 5 ??resolvePromise??
> **??**????????????promise?????????resolvePromise

>+ ?? x === promise2??????????????????????????????
```
let p = new Promise(resolve => {
  resolve(0);
});
var p2 = p.then(data => {
  // ????????????????????
  return p2;
})
```
> 1???x

>+ Otherwise, if x is an object or function,Let then be x.then
>+ x ???null
>+ x ???? ??resolve(x)
>+ x ??????????promise??let then = x.then

> 2??x??????????promise?
>+ ???then
>+ ???then?????reject()
>+ ??then???????call??then???????this???????????????
>+ ?????????pormise????????

> 3???????????? ??????called???????
```
function resolvePromise(promise2, x, resolve, reject){
  // ??????
  if(x === promise2){
    // reject??
    return reject(new TypeError('Chaining cycle detected for promise'));
  }
  // ??????
  let called;
  // x??null ?x???????
  if (x != null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      // A+?????then = x?then??
      let then = x.then;
      // ??then????????promise?
      if (typeof then === 'function') { 
        // ??then?? ??????this   ???????? ? ?????
        then.call(x, y => {
          // ???????????
          if (called) return;
          called = true;
          // resolve??????promise ??????
          resolvePromise(promise2, y, resolve, reject);
        }, err => {
          // ???????????
          if (called) return;
          called = true;
          reject(err);// ???????
        })
      } else {
        resolve(x); // ??????
      }
    } catch (e) {
      // ?????
      if (called) return;
      called = true;
      // ?then?????????????
      reject(e); 
    }
  } else {
    resolve(x);
  }
}
```
## 6 ?????? 
>1???onFulfilled,onRejected?????????????????????

>+ onFulfilled???????????????? value => value
>+ onRejected?????????????????? value => value????????then??onFulfilled????????????reason => throw err

> 2?????onFulfilled?onRejected???????????????????setTimeout??????

>+ ??onFulfilled?onRejected????????reject()

```
class Promise{
  constructor(executor){
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    let resolve = value => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onResolvedCallbacks.forEach(fn=>fn());
      }
    };
    let reject = reason => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn=>fn());
      }
    };
    try{
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  then(onFulfilled,onRejected) {
    // onFulfilled??????????onFulfilled?????value
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    // onRejected??????????onRejected???????
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
    let promise2 = new Promise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        // ??
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      };
      if (this.state === 'rejected') {
        // ??
        setTimeout(() => {
          // ????
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      };
      if (this.state === 'pending') {
        this.onResolvedCallbacks.push(() => {
          // ??
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          // ??
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0)
        });
      };
    });
    // ??promise?????
    return promise2;
  }
}

```
## 7 catch?resolve?reject?race?all??
```
class Promise{
  constructor(executor){
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    let resolve = value => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onResolvedCallbacks.forEach(fn=>fn());
      }
    };
    let reject = reason => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn=>fn());
      }
    };
    try{
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  then(onFulfilled,onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
    let promise2 = new Promise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      };
      if (this.state === 'rejected') {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      };
      if (this.state === 'pending') {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0)
        });
      };
    });
    return promise2;
  }
  catch(fn){
    return this.then(null,fn);
  }
}
function resolvePromise(promise2, x, resolve, reject){
  if(x === promise2){
    return reject(new TypeError('Chaining cycle detected for promise'));
  }
  let called;
  if (x != null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      let then = x.then;
      if (typeof then === 'function') { 
        then.call(x, y => {
          if(called)return;
          called = true;
          resolvePromise(promise2, y, resolve, reject);
        }, err => {
          if(called)return;
          called = true;
          reject(err);
        })
      } else {
        resolve(x);
      }
    } catch (e) {
      if(called)return;
      called = true;
      reject(e); 
    }
  } else {
    resolve(x);
  }
}
//resolve??
Promise.resolve = function(val){
  return new Promise((resolve,reject)=>{
    resolve(val)
  });
}
//reject??
Promise.reject = function(val){
  return new Promise((resolve,reject)=>{
    reject(val)
  });
}
//race?? 
Promise.race = function(promises){
  return new Promise((resolve,reject)=>{
    for(let i=0;i<promises.length;i++){
      promises[i].then(resolve,reject)
    };
  })
}
//all??(?????promise????then?????????????)
Promise.all = function(promises){
  let arr = [];
  let i = 0;
  function processData(index,data){
    arr[index] = data;
    i++;
    if(i == promises.length){
      resolve(arr);
    };
  };
  return new Promise((resolve,reject)=>{
    for(let i=0;i<promises.length;i++){
      promises[i].then(data=>{
        processData(i,data);
      },reject);
    };
  });
}
```
<img src="https://user-gold-cdn.xitu.io/2018/6/27/1643f03d413c4ce8?imageslim" width="100%">





