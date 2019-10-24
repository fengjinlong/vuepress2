## Decorators 是ES7中添加的JavaScript新特性

>装饰器接收一个参数，也就是我们被装饰的目标方法，处理完扩展的内容后再返回一个方法，供以后调用，同时也失去了对原方法对象的访问。
>装饰器和被装饰者之间通过 @ 符进行连接。
>在JavaScript层面我们已经感性的认识了装饰器，我们的代码装饰的是一个函数。在JavaScript中，一共有4类装饰器：

>+ Method Decorator  函数装饰器
>+ Property Decorators 熟悉装饰器
>+ Class Decorator 类装饰器
>+ Parameter Decorator 参数装饰器

## 函数装饰器
>>通过使用 函数装饰器，我们可以控制函数的输入和输出。

>>下面是函数装饰器的定义：
```
MethodDecorator = <T>(target: Object, key: string, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | Void;
target -> 被装饰的对象
key -> 被装饰的函数名
descriptor -> 被传递过来的属性的属性描述符. 可以通过 Object.getOwnPropertyDescriptor()方法来查看属性描述符。
```

>Object.getOwnPropertyDescriptor()获取每个属性的描述符并打印出来。下面我们对value , enumerable , configurable 和 writable 做简要的说明。

>+ value – >字面值或者函数/属性计算后的返回值。
>+ enumerable -> 是否可以被枚举 (是否可以在 (for x in obj)循环中被枚举出来)
>+ configurable – >属性是否可以被配置
>+ writable -> 属性是否是可写的.

>每个属性或者方法都有自己的一个描述符，通过描述符我们可以修改属性的行为或者返回值。下面关键来了：
**装饰器的本质就是修改描述符**

## 方法装饰器实例
> 下面我们通过方法装饰器来修改一个函数的输入和输出
```
function leDecorator(target, propertyKey: string, descriptor: PropertyDescriptor): any {
    var oldValue = descriptor.value;

    descriptor.value = function() {
      console.log(`Calling "${propertyKey}" with`, arguments,target);
      // Executing the original function interchanging the arguments
      let value = oldValue.apply(null, [arguments[1], arguments[0]]);
      //returning a modified value
      return value + "; This is awesome";
    };

    return descriptor;
  }

  class JSMeetup {
    speaker = "Ruban";
    //@leDecorator
    welcome(arg1, arg2) {
      console.log(`Arguments Received are ${arg1}, ${arg2}`);
      return `${arg1} ${arg2}`;
    }
  }

  const meetup = new JSMeetup();

  console.log(meetup.welcome("World", "Hello"));
```
>在不使用装饰器的时候，输出值为：
```
Arguments Received are World, Hello
World Hello
```
>启用装饰器后，输出值为：
```
Calling "welcome" with { '0': 'World', '1': 'Hello' } JSMeetup {}
Arguments Received are Hello, World
Hello World; This is awesome
```
>在新的函数中首先调用了原函数，获得了返回值，然后修改了返回值。 最后return descriptor，新的descriptor会被应用到welcome方法上，此时整合函数体已经被替换了。
>通过使用装饰器，我们实现了对原函数的包装，可以修改方法的输入和输出，这意味着我们可以应用各种想要的魔法效果到目标方法上。

>这里有几点需要注意的地方：

>+ 装饰器在class被声明的时候被执行，而不是class实例化的时候。
>+ 方法装饰器返回一个值
>+ 存储原有的描述符并且返回一个新的描述符是我们推荐的做法. 这在多描述符应用的场景下非常有用。
>+ 设置描述符的value的时候，不要使用箭头函数。

##  属性装饰器

>属性装饰器和方法装饰器很类似，通过属性装饰器，我们可以用来重新定义getters、setters，修改enumerable, configurable等属性。
>属性装饰器定义如下：
```
PropertyDecorator = (target: Object, key: string) => void;

target：属性拥有者
key：属性名
```
>Object.defineProperty方法通常用来动态给一个对象添加或者修改属性。下面是一段示例：
```
var o = { get foo() { return 17; }, bar:17, foobar:function(){return "FooBar"} };

Object.defineProperty(o, 'myProperty', {
get: function () {
return this['myProperty'];
},
set: function (val) {
this['myProperty'] = val;
},
enumerable:true,
configurable:true
});
```
>从结果中，我们看到，利用Object.defineProperty，我们动态添给对象添加了属性。下面我们基于Object.defineProperty来实现一个简单的属性装饰器。

```
function realName(target, key: string): any {
    // property value
    var _val = target[key];

    // property getter
    var getter = function () {
      return "Ragularuban(" + _val + ")";
    };

    // property setter
    var setter = function (newVal) {
      _val = newVal;
    };

    // Create new property with getter and setter
    Object.defineProperty(target, key, {
      get: getter,
      set: setter
    });
  }

  class JSMeetup {
    //@realName
    public myName = "Ruban";
    constructor() {
    }
    greet() {
      return "Hi, I'm " + this.myName;
    }
  }

  const meetup = new JSMeetup();
  console.log(meetup.greet());
  meetup.myName = "Ragul";
  console.log(meetup.greet());
```

## Class 装饰器

>Class装饰器是通过操作Class的构造函数，来实现对Class的相关属性和方法的动态添加和修改。
>下面是Class装饰器的定义：
```
ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction;
```

>ClassDecorator只接收一个参数，就是Class的构造函数。下面的示例代码，修改了类原有的属性speaker，并动态添加了一个属性extra。

```
function AwesomeMeetup<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor implements extra {
      speaker: string = "Ragularuban";
      extra = "Tadah!";
    }
  }

  //@AwesomeMeetup
  class JSMeetup {
    public speaker = "Ruban";
    constructor() {
    }
    greet() {
      return "Hi, I'm " + this.speaker;
    }
  }

  interface extra {
    extra: string;
  }

  const meetup = new JSMeetup() as JSMeetup & extra;
  console.log(meetup.greet());
  console.log(meetup.extra);

I m Ruban
undefined

I m Ragularban
Tadah!
```

>这里需要注意的是，**构造函数只会被调用一次**

## 参数装饰器
>https://juejin.im/post/5ac85f1d6fb9a028bf0590ee#heading-0

## 小结
>现在我们已经学习了所有装饰器的使用，下面总结一下关键用法：

>方法装饰器的核心是 方法描述符

>>Object.getOwnPropertyDescriptor() 方法返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）

>属性装饰器的核心是 Object.defineProperty

>Class装饰器的核心是 构造函数

>参数装饰器的主要作用是标记，要结合方法装饰器来使用

