## eventBus
### 我们仿照Node中Event API实现一个简单的Event库,他是发布订阅模式的典型应用.

## 初始化class

```
class EventEmeitter {
  constructor() {
    this._events = this._events || new Map(); // 储存事件/回调键值对
    this._maxListeners = this._maxListeners || 10; // 设立监听上限
  }
}
```
> 监听与触发

> 当然当Node全面拥抱ES6+之后,相应的call/apply操作用Reflect新关键字重写了,但是我们不想写的那么复杂,就做了一个简化版.

```
// 触发名为type的事件
EventEmeitter.prototype.emit = function(type, ...args) {
  let handler;
  // 从储存事件键值对的this._events中获取对应事件回调函数
  handler = this._events.get(type);
  if (args.length > 0) {
    handler.apply(this, args);
  } else {
    handler.call(this);
  }
  return true;
};

// 监听名为type的事件
EventEmeitter.prototype.addListener = function(type, fn) {
  // 将type事件以及对应的fn函数放入this._events中储存
  if (!this._events.get(type)) {
    this._events.set(type, fn);
  }
};
```
> 我们实现了触发事件的emit方法和监听事件的addListener方法,至此我们就可以进行简单的实践了.

```
// 实例化
const emitter = new EventEmeitter();

// 监听一个名为arson的事件对应一个回调函数
emitter.addListener('arson', man => {
  console.log(`expel ${man}`);
});

// 我们触发arson事件,发现回调成功执行
emitter.emit('arson', 'low-end'); // expel low-end
```

> 似乎不错,我们实现了基本的触发/监听,但是如果有多个监听者呢?

```
// 重复监听同一个事件名
emitter.addListener('arson', man => {
  console.log(`expel ${man}`);
});
emitter.addListener('arson', man => {
  console.log(`save ${man}`);
});

emitter.emit('arson', 'low-end'); // expel low-end
```
> 是的,只会触发第一个,因此我们需要进行改造

## 升级改造

>我们的addListener实现方法还不够健全,在绑定第一个监听者之后,我们就无法对后续监听者进行绑定了,因此我们需要将后续监听者与第一个监听者函数放到一个数组里.

```

// 触发名为type的事件
EventEmeitter.prototype.emit = function(type, ...args) {
  let handler;
  handler = this._events.get(type);
  if (Array.isArray(handler)) {
    // 如果是一个数组说明有多个监听者,需要依次此触发里面的函数
    for (let i = 0; i < handler.length; i++) {
      if (args.length > 0) {
        handler[i].apply(this, args);
      } else {
        handler[i].call(this);
      }
    }
  } else { // 单个函数的情况我们直接触发即可
    if (args.length > 0) {
      handler.apply(this, args);
    } else {
      handler.call(this);
    }
  }

  return true;
};

// 监听名为type的事件
EventEmeitter.prototype.addListener = function(type, fn) {
  const handler = this._events.get(type); // 获取对应事件名称的函数清单
  if (!handler) {
    this._events.set(type, fn);
  } else if (handler && typeof handler === 'function') {
    // 如果handler是函数说明只有一个监听者
    this._events.set(type, [handler, fn]); // 多个监听者我们需要用数组储存
  } else {
    handler.push(fn); // 已经有多个监听者,那么直接往数组里push函数即可
  }
};
```
> 从此以后可以愉快的触发多个监听者的函数了.

```
// 监听同一个事件名
emitter.addListener('arson', man => {
  console.log(`expel ${man}`);
});
emitter.addListener('arson', man => {
  console.log(`save ${man}`);
});

emitter.addListener('arson', man => {
  console.log(`kill ${man}`);
});

// 触发事件
emitter.emit('arson', 'low-end');
//expel low-end
//save low-end
//kill low-end
```

> 移除监听

>我们会用removeListener函数移除监听函数,但是匿名函数是无法移除的.

```
EventEmeitter.prototype.removeListener = function(type, fn) {
  const handler = this._events.get(type); // 获取对应事件名称的函数清单

  // 如果是函数,说明只被监听了一次
  if (handler && typeof handler === 'function') {
    this._events.delete(type, fn);
  } else {
    let postion;
    // 如果handler是数组,说明被监听多次要找到对应的函数
    for (let i = 0; i < handler.length; i++) {
      if (handler[i] === fn) {
        postion = i;
        break;
      } else {
        postion = -1;
      }
    }
    // 如果找到匹配的函数,从数组中清除
    if (postion !== -1) {
      // 找到数组对应的位置,直接清除此回调
      handler.splice(postion, 1);
      // 如果清除后只有一个函数,那么取消数组,以函数形式保存
      if (handler.length === 1) {
        this._events.set(type, handler[0]);
      }
    } else {
      return this;
    }
  }
};

```

## 发现问题
>我们已经基本完成了Event最重要的几个方法,也完成了升级改造,可以说一个Event的骨架是被我们开发出来了,但是它仍然有不足和需要补充的地方.


>+ 鲁棒性不足: 我们没有对参数进行充分的判断,没有完善的报错机制.
>+ 模拟不够充分: 除了removeAllListeners这些方法没有实现以外,例如监听时间后会触发newListener事件,我们也没有实现,另外最开始的监听者上限我们也没有利用到.

> 当然,这在面试中现场写一个Event已经是很够意思了,主要是体现出来对发布-订阅模式的理解,以及针对多个监听状况下的处理,不可能现场撸几百行写一个完整Event.

>索性[Event](https://github.com/Gozala/events/blob/master/events.js)库帮我们实现了完整的特性,整个代码量有300多行,很适合阅读,你可以花十分钟的时间通读一下,见识一下完整的Event实现.
