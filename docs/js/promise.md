# 基础
## 1 Promise 的含义
> Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。

> 特点
>+ 对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。
>+ 一旦状态改变，就不会再变，任何时候都可以得到这个结果。

> Promise也有一些缺点。
>+ 首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。
>+ 其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。
>+ 第三，当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。
>+ 如果某些事件不断地反复发生，一般来说，使用 nodejs Stream 模式是比部署Promise更好的选择。

## 2 基本用法
```
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```
> Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由 **JavaScript 引擎提供**，不用自己部署。

> resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去
```
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```
> Promise 新建后就会立即执行
```
Promise 新建后立即执行，所以首先输出的是Promise

let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});

promise.then(function() {
  console.log('resolved.');
});

console.log('Hi!');

// Promise
// Hi!
// resolved
```
> 异步加载图片的例子
```
function loadImg (url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      resolve(image)
    }
    image.onerror = () => {
      reject(new Error('Could not load image at ' + url));
    };
    images.src = url;
  })
}
```
> 用Promise对象实现的 Ajax 操作的例子
```
const getJSON = function(url) {
  const promise = new Promise(function(resolve, reject){
    const handler = function() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    const client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();

  });

  return promise;
};

getJSON("/posts.json").then(function(json) {
  console.log('Contents: ' + json);
}, function(error) {
  console.error('出错了', error);
});
```
> resolve函数的参数除了正常的值以外，还可能是另一个 Promise 实例
```
const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error('fail')), 3000)
})

const p2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(p1), 1000)
})

p2
  .then(result => console.log(result))
  .catch(error => console.log(error))
// Error: fail
```
>上面代码中，p1是一个 Promise，3 秒之后变为rejected。p2的状态在 1 秒之后改变，resolve方法返回的是p1。由于**p2返回的是另一个 Promise，导致p2自己的状态**无效了，由p1的状态决定p2的状态。所以，后面的then语句都变成针对后者（p1）。又过了 2 秒，p1变为rejected，导致触发catch方法指定的回调函数。

> 调用resolve或reject并不会终结 Promise 的参数函数的执行
```
new Promise((resolve, reject) => {
  resolve(1);
  console.log(2);
}).then(r => {
  console.log(r);
});
// 2
// 1
```
> 上面代码中，调用resolve(1)以后，后面的console.log(2)还是会执行，并且会首先打印出来。这是因为立即 resolved 的 Promise 是在本轮事件循环的末尾执行，总是**晚于本轮循环的同步任务**。

> 一般来说，调用resolve或reject以后，Promise 的使命就完成了，后继操作应该放到then方法里面，而不应该直接写在resolve或reject的后面。所以，**最好在它们前面加上return语句，这样就不会有意外**
```
new Promise((resolve, reject) => {
  return resolve(1);
  // 后面的语句不会执行
  console.log(2);
})
```

## 3 Promise.prototype.then()
> Promise 实例具有then方法，也就是说，then方法是定义在原型对象Promise.prototype上的
> then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法。
## 4 Promise.prototype.catch()
> Promise.prototype.catch方法是.then(null, rejection)或.then(undefined, rejection)的别名，用于指定发生错误时的回调函数。
```
p.then((val) => console.log('fulfilled:', val))
  .catch((err) => console.log('rejected', err));

// 等同于
p.then((val) => console.log('fulfilled:', val))
  .then(null, (err) => console.log("rejected:", err));
```
> 上面代码中，promise抛出一个错误，就被catch方法指定的回调函数捕获。注意，上面的写法与下面两种写法是等价的。
```
// 写法一
const promise = new Promise(function(resolve, reject) {
  try {
    throw new Error('test');
  } catch(e) {
    reject(e);
  }
});
promise.catch(function(error) {
  console.log(error);
});

// 写法二
const promise = new Promise(function(resolve, reject) {
  reject(new Error('test'));
});
promise.catch(function(error) {
  console.log(error);
});
```
> 如果 Promise 状态已经变成resolved，再抛出错误是无效的
```
const promise = new Promise(function(resolve, reject) {
  resolve('ok');
  throw new Error('test');
});
promise
  .then(function(value) { console.log(value) })
  .catch(function(error) { console.log(error) });
// ok
```

> Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个catch语句捕获。
```
getJSON('/post/1.json').then(function(post) {
  return getJSON(post.commentURL);
}).then(function(comments) {
  // some code
}).catch(function(error) {
  // 处理前面三个Promise产生的错误
});
```
> 上面代码中，一共有三个 Promise 对象：一个由getJSON产生，两个由then产生。它们之中任何一个抛出的错误，都会被最后一个catch捕获。

> 一般来说，**不要**在then方法里面定义 Reject 状态的回调函数（即then的第二个参数），总是使用catch方法。
```
// bad
promise
  .then(function(data) {
    // success
  }, function(err) {
    // error
  });

// good
promise
  .then(function(data) { //cb
    // success
  })
  .catch(function(err) {
    // error
  });
```
> 跟传统的**try/catch**代码块不同的是，如果没有使用catch方法指定错误处理的回调函数，Promise 对象抛出的错误不会**传递到外层代码，即不会有任何反应**
```
const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing().then(function() {
  console.log('everything is great');
});

setTimeout(() => { console.log(123) }, 2000);
// Uncaught (in promise) ReferenceError: x is not defined
// 123
```
> 上面代码中，someAsyncThing函数产生的 Promise 对象，内部有语法错误。浏览器运行到这一行，会打印出错误提示ReferenceError: x is not defined，但是不会退出进程、终止脚本执行，2 秒之后还是会输出123。这就是说，Promise 内部的错误不会影响到 Promise 外部的代码，通俗的说法就是“Promise 会吃掉错误”。

> 一般总是建议，Promise 对象后面要跟catch方法，这样可以处理 Promise 内部发生的错误。catch方法返回的还是一个 Promise 对象，因此后面还可以接着调用then方法。
```
someAsyncThing().then(function() {
  return someOtherAsyncThing();
}).catch(function(error) {
  console.log('oh no', error);
  // 下面一行会报错，因为y没有声明
  y + 2;
}).catch(function(error) {
  console.log('carry on', error);
});
// oh no [ReferenceError: x is not defined]
// carry on [ReferenceError: y is not defined]
```
> 上面代码中，第二个catch方法用来捕获前一个catch方法抛出的错误

## 5 Promise.prototype.finally()
> finally方法用于指定不管 Promise 对象最后状态如何，都会执行的操作
> 服务器使用 Promise 处理请求，然后使用finally方法关掉服务器。

```
server.listen(port)
  .then(function () {
    // ...
  })
  .finally(server.stop);
```
> finally本质上是then方法的特例。
```
promise
.finally(() => {
  // 语句
});

// 等同于
promise
.then(
  result => {
    // 语句
    return result;
  },
  error => {
    // 语句
    throw error;
  }
);
```
> 上面代码中，如果不使用finally方法，同样的语句需要为成功和失败两种情况各写一次。有了finally方法，则只需要写一次。
> 它的实现也很简单

```
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};
```
## 6 Promise.all()
> const p = Promise.all([p1, p2, p3]);

> Promise.all()方法接受一个数组作为参数，p1、p2、p3都是 Promise 实例，如果不是，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。

> 另外，Promise.all()方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。

> 只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。

> 只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

## 7 Promise.race()
> 只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变
```
const p = Promise.race([
  fetch('/resource-that-may-take-a-while'),
  new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('request timeout')), 5000)
  })
]);

p
.then(console.log)
.catch(console.error);
```
> 如果 5 秒之内fetch方法无法返回结果，变量p的状态就会变为rejected，从而触发catch方法指定的回调函数。

## 8 Promise.any()
> Promise.any()方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态；如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态。

## 9 Promise.resolve()
>有时需要将现有对象转为 Promise 对象，Promise.resolve()方法就起到这个作用。
```
const jsPromise = Promise.resolve($.ajax('/whatever.json'));
上面代码将 jQuery 生成的deferred对象，转为一个新的 Promise 对象。
```
>Promise.resolve()等价于下面的写法。
```
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
Promise.resolve方法的参数分成四种情况。
```
>（1）参数是一个 Promise 实例

>> 如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。

>（2）参数是一个thenable对象

>>thenable对象指的是具有then方法的对象，比如下面这个对象。
```
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};
Promise.resolve方法会将这个对象转为 Promise 对象，然后就立即执行thenable对象的then方法。

let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};

let p1 = Promise.resolve(thenable);
p1.then(function(value) {
  console.log(value);  // 42
});
```
>>上面代码中，thenable对象的then方法执行后，对象p1的状态就变为resolved，从而立即执行最后那个then方法指定的回调函数，输出 42。

>（3）参数不是具有then方法的对象，或根本就不是对象

>>如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的 Promise 对象，状态为resolved。
```
const p = Promise.resolve('Hello');

p.then(function (s){
  console.log(s)
});
// Hello
```

>>上面代码生成一个新的 Promise 对象的实例p。由于字符串Hello不属于异步操作（判断方法是字符串对象不具有 then 方法），返回 Promise 实例的状态从一生成就是resolved，所以回调函数会立即执行。Promise.resolve方法的参数，会同时传给回调函数。

>（4）不带有任何参数

>> Promise.resolve()方法允许调用时不带参数，直接返回一个resolved状态的 Promise 对象。

>> 所以，如果希望得到一个 Promise 对象，比较方便的方法就是直接调用Promise.resolve()方法。
```
const p = Promise.resolve();

p.then(function () {
  // ...
});
```
>>上面代码的变量p就是一个 Promise 对象。

> 需要注意的是，立即resolve()的 Promise 对象，是在**本轮“事件循环”（event loop）的结束时执行，而不是在下一轮“事件循环”的开始时**。
```
setTimeout(function () {
  console.log('three');
}, 0);

Promise.resolve().then(function () {
  console.log('two');
});

console.log('one');

// one
// two
// three
上面代码中，setTimeout(fn, 0)在下一轮“事件循环”开始时执行，Promise.resolve()在本轮“事件循环”结束时执行，console.log('one')则是立即执行，因此最先输出
```
## 10 Promise.reject()
>Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。

## 应用

> Generator 函数与 Promise 的结合
>使用 Generator 函数管理流程，遇到异步操作的时候，通常返回一个Promise对象。
```
function getFoo () {
  return new Promise(function (resolve, reject){
    resolve('foo');
  });
}

const g = function* () {
  try {
    const foo = yield getFoo();
    console.log(foo);
  } catch (e) {
    console.log(e);
  }
};

function run (generator) {
  const it = generator();

  function go(result) {
    if (result.done) return result.value;

    return result.value.then(function (value) {
      return go(it.next(value));
    }, function (error) {
      return go(it.throw(error));
    });
  }

  go(it.next());
}

run(g);
```
> 上面代码的 Generator 函数g之中，有一个异步操作getFoo，它返回的就是一个Promise对象。函数run用来处理这个Promise对象，并调用下一个next方法。

# 原理及实现

## 执行特点
>+ Promise 是一个构造函数，接受函数作为参数(resolve(),reject())
>+ Promise 对象有三种状态 pending(进行中), fulfilled(成功), rejected(失败)
>+ Promise 从 pending 变为 fulfilled 过程是成功的过程可以执行回调函数 resolve()
>+ Promise 从 pending 变为 rejected 过程是失败的过程可以执行回调函数 reject()
>+ Promise 状态无法中途取消，一旦建立立即执行，会一直保持这个结果，这时也叫 resolved(已定型状态)
>+ Promise 状态改变时 then 方法支持多次链式调用
>+ Promise 如果不设置回调函数内部会抛异常

## 定义构造函数
```
/** * 封装判断参数是够是函数 */ 
function isFunction (fn) {
  return Object.prototype.toString.call(fn) === '[object Function]'
}
/** * 定义构造函数 * @param {*} fn */ 
function Promise(fn) {
  if (!isFunction(fn)) {
    throw new Error('Promise must accept a function as a parameter')
  }
}
```

# [promise 实现](https://juejin.im/post/5c233a8ee51d450d5a01b712)
# [性感的Promise](https://juejin.im/post/5ab20c58f265da23a228fe0f)


## Promise 特性

### Promise捕获错误与 try catch 等同
```
1.请写出下列代码的输出
var p1 = new Promise(function(resolve, reject) {
    throw Error('sync error')
})
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(1111)
        console.log(err)
    })

2.请写出下列代码的输出
var p1 = new Promise(function(resolve, reject) {
    setTimeout(() => {
        throw Error('async error')   
    })
})
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })

3.请写出下列代码的输出
var p1 = new Promise(function(resolve, reject) {
    resolve()
})
    .then(res => {
        throw Error('sync error') 
    })
复制代码错误三连，你知道正确答案吗😏？
正确答案是：

Error被catch到，最后console.log输出
错误无法被catch，控制台报错
promise没有catch，错误被捕获后又被抛出，控制台报错
```
### 这里考查的主要是Promise的错误捕获，其实仔细想想js中能用的错误捕获也只能是try catch了，而**try catch只能捕获同步错误**，并且在没有传入错误监听的时候会将捕获到的错误抛出。

## 实现resolve、reject方法，then方法和状态机制

### 根据使用方法我们可以知道，Promise是一个需要接受一个执行器的构造函数，执行器提供两个方法，内部有状态机制，原型链上有then方法。

```
开始撸：
// myPromise
function Promise(executor){ //executor是一个执行器（函数）
    let _this = this // 先缓存this以免后面指针混乱
    _this.status = 'pending' // 默认状态为等待态
    _this.value = undefined // 成功时要传递给成功回调的数据，默认undefined
    _this.reason = undefined // 失败时要传递给失败回调的原因，默认undefined

    function resolve(value) { // 内置一个resolve方法，接收成功状态数据
        // 上面说了，只有pending可以转为其他状态，所以这里要判断一下
        if (_this.status === 'pending') { 
            _this.status = 'resolved' // 当调用resolve时要将状态改为成功态
            _this.value = value // 保存成功时传进来的数据
        }
    }
    function reject(reason) { // 内置一个reject方法，失败状态时接收原因
        if (_this.status === 'pending') { // 和resolve同理
            _this.status = 'rejected' // 转为失败态
            _this.reason = reason // 保存失败原因
        }
    }
    executor(resolve, reject) // 执行执行器函数，并将两个方法传入
}
// then方法接收两个参数，分别是成功和失败的回调，这里我们命名为onFulfilled和onRjected
Promise.prototype.then = function(onFulfilled, onRjected){
    let _this = this;   // 依然缓存this
    if(_this.status === 'resolved'){  // 判断当前Promise的状态
        onFulfilled(_this.value)  // 如果是成功态，当然是要执行用户传递的成功回调，并把数据传进去
    }
    if(_this.status === 'rejected'){ // 同理
        onRjected(_this.reason)
    }
}
module.exports = Promise  // 导出模块，否则别的文件没法使用
```
### 注意：上面代码的命名不是随便起的，像onFulfilled和onRjected，是严格按照Promise/A+规范走的

### 这样我们就实现了第一步，可以创建Promise实例并使用then方法了，测试一下
```
let Promise = require('./myPromise')  // 引入模块
let p = new Promise(function(resolve, reject){
  resolve('test')
})
p.then(function(data){
  console.log('成功', data)
},function(err){
  console.log('失败', err)
})
// 成功 test

再试试reject
let Promise = require('./myPromise')  // 引入模块
let p = new Promise(function(resolve, reject){
  reject('test')
})
p.then(function(data){
  console.log('成功', data)
},function(err){
  console.log('失败', err)
})
// 失败 test
```
### 看起来不错，但回调函数是立即执行的，无法进行异步操作，比如这样是不行的
```
let p = new Promise(function(resolve, reject){
  setTimeout(function(){
    resolve(100)  
  }, 1000)
})
p.then(function(data){
  console.log('成功', data)
},function(err){
  console.log('失败', err)
})
// 不会输出任何代码
```

原因是我们在then函数中只对成功态和失败态进行了判断，而实例被new时，执行器中的代码会立即执行，但setTimeout中的代码将稍后执行，也就是说，then方法执行时，Promise的状态没有被改变依然是pending态，所以我们要对pending态也做判断，而由于代码可能是异步的，那么我们就要想办法把回调函数进行缓存，并且，**then方法是可以多次使用的**，所以要能存多个回调，那么这里我们用一个数组。

## 实现异步
```
在实例上挂两个参数
_this.onResolvedCallbacks = []; // 存放then成功的回调
_this.onRejectedCallbacks = []; // 存放then失败的回调

then方法加一个pending时的判断
if(_this.status === 'pending'){
    // 每一次then时，如果是等待态，就把回调函数push进数组中，什么时候改变状态什么时候再执行
    _this.onResolvedCallbacks.push(function(){ // 这里用一个函数包起来，是为了后面加入新的逻辑进去
        onFulfilled(_this.value)
    })
    _this.onRejectedCallbacks.push(function(){ // 同理
        onRjected(_this.reason)
    })
}
```
### 下一步要分别在resolve和reject方法里加入执行数组中存放的函数的方法，修改一下上面的resolve和reject方法
```
function resolve(value) {
    if (_this.status === 'pending') { 
        _this.status = 'resolved'
        _this.value = value
        _this.onResolvedCallbacks.forEach(function(fn){ // 当成功的函数被调用时，之前缓存的回调函数会被一一调用
            fn()
        })
    }
}
function reject(reason) {
    if (_this.status === 'pending') {
        _this.status = 'rejected'
        _this.reason = reason
        _this.onRejectedCallbacks.forEach(function(fn){// 当失败的函数被调用时，之前缓存的回调函数会被一一调用
            fn()
        })
    }
}
```
<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553512864607&di=5b491e10e97890200d59683f2af90f29&imgtype=0&src=http%3A%2F%2Fstatic.rong360.com%2Fgl%2Fuploads%2Fallimg%2F150907%2F1919395621-5.jpg" width="30%">

### 现在可以执行异步任务了，也可以多次then了，一个穷人版Promise就完成了

## 处理错误
```
真正的Promise如果在实例中抛出错误，应该走reject:

new Promise(function(resolve, reject){
  throw new Error('错误')
}).then(function(){
    
},function(err){
  console.log('错误:', err)  
})
// 错误: Error: 错误

我们实现一下，思路很简单，在执行器执行时进行try catch

try{
    executor(resolve, reject)        
}catch(e){ // 如果捕获发生异常，直接调失败，并把参数穿进去
    reject(e)
}
```
## 实现then的链式调用（难点）Promise的then方法实现链式调用的原理是：返回一个新的Promise

### 在then方法中先定义一个新的Promise，取名为promise2（官方规定的），然后在三种状态下分别用promise2包装一下，在调用onFulfilled时用一个变量x（规定的）接收返回值，trycatch一下代码，没错就调resolve传入x，有错就调reject传入错误，最后再把promise2给return出去，就可以进行链式调用了，，，，但是！
```
// 改动then
let promise2;
if (_this.status === 'resolved') {
    promise2 = new Promise(function (resolve, reject) {
        // 可以凑合用，但是是有很多问题的
        try { 
            let x = onFulfilled(_this.value)
            resolve(x)
        } catch (e) {
            reject(e)
        }
    })
}
if (_this.status === 'rejected') {
    promise2 = new Promise(function (resolve, reject) {
        // 可以凑合用，但是是有很多问题的
        try {
            let x = onRjected(_this.reason)
            resolve(x)
        } catch (e) {
            reject(e)
        }
    })
}
if(_this.status === 'pending'){
    promise2 = new Promise(function (resolve, rejec
        _this.onResolvedCallbacks.push(function(){
             // 可以凑合用，但是是有很多问题的
            try {
                let x = onFulfilled(_this.value)
                resolve(x)
            } catch (e) {
                reject(e)
            }
        })
        _this.onRejectedCallbacks.push(function(){
             // 可以凑合用，但是是有很多问题的
            try {
                let x = onRjected(_this.reason)
                resolve(x)
            } catch (e) {
                reject(e)
            }
        })
    })
}
return promise2

这里我先解释一下x的作用再说为什么不行，x是用来接收上一次then的返回值，比如这样
let p = new Promise(function(resolve, reject){
  resolve(data)  
})
p.then(function(data){
    return xxx // 这里返回一个值
}, function(){
    
}).then(function(data){
    console.log // 这里会接收到xxx
}, function(){
    
})
// 以上代码中第一次then的返回值就是源码内第一次调用onRjected的返回值，可以用一个x来接收

```
<img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1427013723,1115906159&fm=26&gp=0.jpg" width=30%>

## 未完待续



# Promise必会题
<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553515665489&di=f7541c3820b50d04456ca0982cba8d4d&imgtype=0&src=http%3A%2F%2Fdingyue.ws.126.net%2FsTe19%3DcqsGHF9FqtEEe6hbZzNRnwvAxzvbmXzhIHGpxie1551763702238.jpg" width=30%>

## async 是一种语法，Promise 是一个内置对象，两者并不具备可比性
更何况 async 函数也返回一个 Promise 对象……

使用 async 会比使用 Promise 更优雅的处理异步流程。
1. 代码更加简洁
2. 错误处理
async function fetch() {
  try {
    const data = JSON.parse(await fetchData())
  } catch (err) {
    console.log(err)
  }
};
3. 调试
用 async 的时候，则可以像调试同步代码一样调试。

# async-await和Promise的关系

## async-await 是建立在 promise机制之上的，并不能取代其地位。

## async用来表示函数是异步的，定义的函数会返回一个promise对象，可以使用then方法添加回调函数。

```
async function demo01() {
    return 123;
}

demo01().then(val => {
    console.log(val);// 123
});
若 async 定义的函数有返回值，return 123;相当于Promise.resolve(123),没有声明式的 return则相当于执行了Promise.resolve();
```
## await 可以理解为是 async wait 的简写。await 必须出现在 async 函数内部，不能单独使用。

<img src="http://pic.rmb.bdstatic.com/729689787df79599e77e4c85a42b22ea.jpeg" width=50%/>

## await必须接一个promise对象的决议

await 后面可以跟任何的JS 表达式。虽然说 await 可以等很多类型的东西，但是它最主要的**意图**是用来等待 Promise 对象的状态被 resolved。**如果await的是 promise对象**会造成异步函数**停止执行并且等待 promise 的决议**,如果等的是**正常的表达式（除了promise对象）**则立即执行。**不在等待，失去本意**

## 你有三个请求需要发生，第三个请求是依赖于第二个请求的解构第二个请求依赖于第一个请求的结果。用 f()

## 有三个异步请求需要发送，相互没有关联，只是需要当请求都结束后将界面的 loading 清除掉即可。用 t()

```
function tt () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(1)
          resolve('tt')
        }, 2000)
      })
    }
    function ttt () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(2)
          resolve('ttt')
        }, 2000)
      })
    }

    // 一次执行，依赖上一个的结果模式
    async function f () {
      let tt1 = await tt()
      let ttt1 = await ttt()
      console.log(tt1)
      console.log(ttt1)
    }
    // 没有依赖关系，只关注都执行完毕的状态
    async function t () {
      let tt1 = tt()
      let ttt1 = ttt()
      await Promise.all([tt1, ttt1])
    }

    f()
    t()
```

**async-await并不能取代promise**