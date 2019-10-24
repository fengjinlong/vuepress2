## Decorator 应用
>装饰器主要用于:装饰类,装饰方法或属性
```
装饰类
@annotation
class MyClass { }

function annotation(target) {
   target.annotated = true;
}
装饰方法或属性
class MyClass {
  @readonly
  method() { }
}

function readonly(target, name, descriptor) {
  descriptor.writable = false;
  return descriptor;
}
```
## Babel
```
npm init

npm install --save-dev @babel/core @babel/cli

npm install --save-dev @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties
新建 .babelrc 文件
{
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", {"loose": true}]
  ]
}
再编译指定的文件
babel decorator.js --out-file decorator-compiled.js
```
## 应用
### log
```
为一个方法添加 log 函数，检查输入的参数：
class Math {
  @log
  add(a, b) {
    return a + b;
  }
}

function log(target, name, descriptor) {
  var oldValue = descriptor.value;

  descriptor.value = function(...args) {
    console.log(`Calling ${name} with`, args);
    return oldValue.apply(this, args);
  };

  return descriptor;
}

const math = new Math();

// Calling add with [2, 4]
math.add(2, 4);
再完善点：
let log = (type) => {
  return (target, name, descriptor) => {
    const method = descriptor.value;
    descriptor.value =  (...args) => {
      console.info(`(${type}) 正在执行: ${name}(${args}) = ?`);
      let ret;
      try {
        ret = method.apply(target, args);
        console.info(`(${type}) 成功 : ${name}(${args}) => ${ret}`);
      } catch (error) {
        console.error(`(${type}) 失败: ${name}(${args}) => ${error}`);
      }
      return ret;
    }
  }
};
```

### autobind
```
class Person {
  @autobind
  getPerson() {
  	return this;
  }
}

let person = new Person();
let { getPerson } = person;

getPerson() === person;
// true
```
>>我们很容易想到的一个场景是 React 绑定事件的时候：
```
class Toggle extends React.Component {

  @autobind
  handleClick() {
	  console.log(this)
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        button
      </button>
    );
  }
}
```
>>我们来写这样一个 autobind 函数：
```
const { defineProperty, getPrototypeOf} = Object;

function bind(fn, context) {
  if (fn.bind) {
    return fn.bind(context);
  } else {
    return function __autobind__() {
      return fn.apply(context, arguments);
    };
  }
}

function createDefaultSetter(key) {
  return function set(newValue) {
    Object.defineProperty(this, key, {
      configurable: true,
      writable: true,
      enumerable: true,
      value: newValue
    });

    return newValue;
  };
}

function autobind(target, key, { value: fn, configurable, enumerable }) {
  if (typeof fn !== 'function') {
    throw new SyntaxError(`@autobind can only be used on functions, not: ${fn}`);
  }

  const { constructor } = target;

  return {
    configurable,
    enumerable,

    get() {

      /**
       * 使用这种方式相当于替换了这个函数，所以当比如
       * Class.prototype.hasOwnProperty(key) 的时候，为了正确返回
       * 所以这里做了 this 的判断
       */
      if (this === target) {
        return fn;
      }

      const boundFn = bind(fn, this);

      defineProperty(this, key, {
        configurable: true,
        writable: true,
        enumerable: false,
        value: boundFn
      });

      return boundFn;
    },
    set: createDefaultSetter(key)
  };
}
```

### debounce
>有的时候，我们需要对执行的方法进行防抖处理:
```
class Toggle extends React.Component {

  @debounce(500, true)
  handleClick() {
    console.log('toggle')
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        button
      </button>
    );
  }
}
```
>我们来实现一下：
```
function _debounce(func, wait, immediate) {

    var timeout;

    return function () {
        var context = this;
        var args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            var callNow = !timeout;
            timeout = setTimeout(function(){
                timeout = null;
            }, wait)
            if (callNow) func.apply(context, args)
        }
        else {
            timeout = setTimeout(function(){
                func.apply(context, args)
            }, wait);
        }
    }
}

function debounce(wait, immediate) {
  return function handleDescriptor(target, key, descriptor) {
    const callback = descriptor.value;

    if (typeof callback !== 'function') {
      throw new SyntaxError('Only functions can be debounced');
    }

    var fn = _debounce(callback, wait, immediate)

    return {
      ...descriptor,
      value() {
        fn()
      }
    };
  }
}
```
## mixin
>用于将对象的方法混入 Class 中：
```
const SingerMixin = {
  sing(sound) {
    console.log(sound);
  }
};

const FlyMixin = {
  // All types of property descriptors are supported
  get speed() {},
  fly() {},
  land() {}
};

@mixin(SingerMixin, FlyMixin)
class Bird {
  singMatingCall() {
    this.sing('tweet tweet');
  }
}

var bird = new Bird();
bird.singMatingCall();
// alerts "tweet tweet"
function mixin(...mixins) {
  // return target => {
  return function (target) {
    if (!mixins.length) {
      throw new SyntaxError(`@mixin() class ${target.name} requires at least one mixin as an argument`);
    }
    // let a = Object.getOwnPropertyDescriptors(mixins[1])
    // {
    //   sing: {
    //     configurable: true,
    //     enumerable: true,
    //     value: fn,
    //     writable: true
    //   }
    // }
    // console.log(Object.getOwnPropertyNames(a))
    // ['sing']
    for (let i = 0, l = mixins.length; i < l; i++) {
      const descs = Object.getOwnPropertyDescriptors(mixins[i]);
      const keys = Object.getOwnPropertyNames(descs);

      for (let j = 0, k = keys.length; j < k; j++) {
        const key = keys[j];

        if (!target.prototype.hasOwnProperty(key)) {
          Object.defineProperty(target.prototype, key, descs[key]);
        }
      }
    }
  };
}
```
## redux
>实际开发中，React 与 Redux 库结合使用时，常常需要写成下面这样。
```
class MyReactComponent extends React.Component {}

export default connect(mapStateToProps, mapDispatchToProps)(MyReactComponent);
有了装饰器，就可以改写上面的代码。
@connect(mapStateToProps, mapDispatchToProps)
export default class MyReactComponent extends React.Component {};
复制代码相对来说，后一种写法看上去更容易理解。
```

## 注意
```
以上我们都是用于修饰类方法，我们获取值的方式为：
const method = descriptor.value;
但是如果我们修饰的是类的实例属性，因为 Babel 的缘故，通过 value 属性并不能获取值，我们可以写成：
const value = descriptor.initializer && descriptor.initializer();
```