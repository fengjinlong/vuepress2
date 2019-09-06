## 什么是函数式编程
>+ 函数式编程主要是范畴论数学中的一个分支，它认为所有的概念体系都可以抽象成一个个范畴，属于结构化编程的一种。运算过程尽量写成一系列嵌套的函数调用 
```
//  函数式编程
var result = subtract(multiply(add(1,2), 3), 4);

// 过程编程
var a = add(1,2);
var b = multiply(a, 3);
var c = subtract(b, 4);
```
## 为什么学习函数式编程
>+ 其实个人觉的学习函数式编程就是为了更好的模块化，使其看起来更简洁。这也是范式编程和结构化编程的主要思想

## 函数式编程特点
>+ 函数是"第一等公民"
>+ 只用表达式，不用语句
>+ 没有副作用（函数要保持独立，所有功能就是返回一个新的值，没有其他行为，更不能修改外部状态的值）
>+ 不修改状态（可以使用参数来保存状态，不可以使用变量来保存状态）
>+ 引用透明（函数运行只靠参数）
## 函数式编程的优点
>+ 代码更简洁，易于理解，维护更方便
>+ 易于并发编程（由于不修改变量所以不存在锁线程的问题）
>+ 代码的热升级

## 函数式编程-纯函数
>+ 说纯函数概念之前我们再来复习一下什么是函数
>+ 函数是一个方法，有一些输入，称为变量，并产生一些输出称为返回值

## 函数可以用于以下目的

>+ 映射：根据给定的输入生成一些输出，函数将输入值映射到输出值上
>+ 过程：调用函数按照一系列的步骤来执行。这就是我们说的过程编程
>+ I/O：与系统其他部分通信的功能。如存储系统日志，网络等
>+ 纯函数都是关于映射的所以对于相同的输入，永远会得到相同的输出，而且没有任何可观察的副作用，也不依赖外部环境的状态。
```
// 纯函数
const double = x => x * 2;
console.log（double（5））

// 不纯
let val = 2;
const double = x => x * val;
console.log（double（5））

// 不纯
Math.random()
Math.random()
```
## 函数式编程-纯函数
## 纯函数的优点

>+ 独立于外部状态，所以不会受外部全局环境的影响而产生的错误或者副作用
>+ 由于其独立，所以易于重构和重组和重用，使程序更加灵活
## 函数式编程-幂等性
>+ 执行多次所产生的影响均与一次执行的影响相同，也就是说执行一次和执行多次对系统内部的状态影响是一样的 
```
class Person {
  constructor () {
    this.name = name;
  },
  sayName () {
    console.log(my name is + this.name);
  } 
}
var person = new Person(zhangsan)
person.sayName();
person.sayName();
```
## 纯函数和幂等性的区别
>+ 法调用多次对内部的状态影响是一样的，则这么方法就具有幂等性，在函数式编程中，纯函数也具有幂等性，但具有幂等性的函数却不一定是纯函数。
>+ 纯函数主要强调相同的输入，多次调用，输出也相同且无副作用，而幂等主要强调多次调用，对内部的状态的影响是一样的，调用返回值可能不同。函数式编程-偏应用函数、函数的柯里化

## 偏应用函数简称偏函数，在模拟 bind 的时候已经说明其概念和作为主要 bind 的实现

>+ 函数柯里化主要是通过偏应用函数的实现，把接受多个参数的函数变换成接受一个单一参数的函数，并且返回接受余下的参数而且返回结果的新函数
```
// 柯里化之前
function add (a, b) {
  return a + b;
}

// 柯里化之后
function add (a) {
  return function (b) {
    return a+b
  }
}

// 等同于
const add = a => b => a + b;
const result = add(2)(3); // => 5
首先函数接受 a 参数 然后返回一个新的匿名函数体确定了新的词法作用域,在该词法作用域中也拥有 a 参数
该匿名函数调用传入参数 3 返回 a+b 的和
通过上面程序了解到柯里化函数的特点是总是返回一个一元的函数：一个带有一个参数的新函数，不同的是普通函数可以根据需要一次获取尽可能多的参数

```
## 为什么要柯里化
>+ 柯里化在函数组合的上下文中起到关键的作用,能够让你重新组合你的应用，将复杂的功能拆分成一个个简单的部分，这样容易更改，理解
>+ 柯里化也是一种函数预加载的方法，通过传递较少的参数得到一个在相同词法作用域当中缓存了这些参数的新函数，其实这也是一种对参数的缓存
>+ 如何柯里化
```
// 普通
const sayName = name => age => `my name is ${name}, Im years old ${age}` ;
let name = sayName('zhangsan');
let age = name(27);

// 利用bind

function person (name, age, height) {
  console.log(`my name is ${name}, I,m years old ${age}, my height is ${height} meters`)
}
let info = person.bind(null, 'zhangsan');
console.log(info(27, 175));
柯里化函数的应用场景
延迟计算
参数复用
动态创建函数
延迟计算


// 普通实现
var sum = function(args){
  return args.reduce(function(a,b){
      return a+b
  });
};
var result = sum([1,2,3,4,5]); // 15

// 柯里化实现
function add() {
  var _args = [].slice.call(arguments);
  var adder = function () {

      // 利用闭包特性保存_args的值
      var _adder = function() {
          [].push.apply(_args, [].slice.call(arguments));
          return _adder;
      };

      // 利用隐式转换的特性，计算最终的值返回
      _adder.toString = function () {
          return _args.reduce(function (a, b) {
              return a + b;
          });
      }

      return _adder;
  }
  return adder.apply(null, [].slice.call(arguments));
}

var sum = add();
sum(1,2,3)(4);
sum(5);
sum() // 15

优点：调用灵活，参数定义随意

充分利用了柯里化提延迟执行的特点
延迟执行 – 返回新函数可以进行任意调用
DOM操作中的事件绑定(动态创建函数)
当在多次调用同一个函数，并且传递的参数绝大多数是相同的。

// 普通版本
var addEvent = function(el, type, fn, capture) {
    if (window.addEventListener) {
      el.addEventListener(type, function(e) {
        fn.call(el, e);
      }, capture);
    } else if (window.attachEvent) {
      el.attachEvent("on" + type, function(e) {
        fn.call(el, e);
      });
    } 
 };

 // 柯里化版本
 var addEvent = (function(){
    if (window.addEventListener) {
      return function(el, type, fn, capture) {
        el.addEventListener(type, function(e) {
          fn.call(el, e);
        }, (capture));
      };
    } else if (window.attachEvent) {
      return function(el, type, fn, capture) {
        el.attachEvent("on" + type, function(e) {
            fn.call(el, e);
        });
      };
    }
})();

优点：不用每次调用进行 if () {}else {} 判断兼容性问题
```

充分利用了柯里化提前返回和延迟执行的特点
提前返回 – 使用函数立即调用进行了一次兼容判断（部分求值），返回兼容的事件绑定方法
延迟执行 – 返回新函数，在新函数调用兼容的事件方法。等待addEvent新函数调用，延迟执行
当然应用场景还有很多，比如我们经常提到的防抖和节流问题，充分的利用了函数式编程的延迟执行特性，将多个间隔接近的函数执行合并成一次函数执行来提高性能问题。
关于事件节流和防抖动将会在后续的专题中单独指出


## 函数式编程-函数组合
\函数组合是将两个或多个函数组合以产生新函数的过程。将功能组合在一起就像将一系列管道拼凑在一起，以便我们的数据流过

简而言之，函数 f和 g的组合可以定义为f（g（x）），它从内到外 - 从右到左进行求值

举例子，想象一个场景，想要将用户的全名转换为URL slugs，以便为每个用户提供个人资料页面。为此，需要完成一系列步骤：

1. 将名称拆分为空格中的数组
2. 将名称映射到小写
3. 加入破折号
4. 编码URI组件
```
// toslug.js hosted with ❤ by GitHub

const toSlug = input => encodeURIComponent(
  input.split(' ')
    .map(str => str.toLowerCase())
    .join('-')
);
```
不错......但如果我告诉你它可能更具可读性呢？想象一下，这些操作中的每一个都具有相应的可组合功能。可以写成
```
// nesting-composition.js hosted with ❤ by GitHub

const toSlug = input => encodeURIComponent(
  join('-')(
    map(toLowerCase)(
      split(' ')(
        input
      )
    )
  )
);

console.log(toSlug('JS Cheerleader')); // 'js-cheerleader'
```
这看起来比我们的第一次尝试更难阅读，但先放在这，我们继续以可组合形式的常用实用程序，如split（），join（）和map（）。来实现
```
// composables.js hosted with ❤ by GitHub

const curry = fn => (...args) => fn.bind(null, ...args);

const map = curry((fn, arr) => arr.map(fn));

const join = curry((str, arr) => arr.join(str));

const toLowerCase = str => str.toLowerCase();

const split = curry((splitOn, str) => str.split(splitOn));
```
上面的例子在技术上并不是真的柯里化，它总能产生一元函数，但是它是一个简单的偏应用函数。请参考有关偏应用函数和柯里化的区别 

回到我们的toSlug（）实现
```
// nesting-composition.js hosted with ❤ by GitHub

const toSlug = input => encodeURIComponent(
  join('-')(
    map(toLowerCase)(
      split(' ')(
        input
      )
    )
  )
);

console.log(toSlug('JS Cheerleader')); // 'js-cheerleader'
```
我们可以使用一个自动组合这些函数的函数来展平嵌套，这意味着它将从一个函数获取输出并自动将其到下一个函数的输入，直到它输出最终值
想象一下我们实现函数 reduce（） 的功能，但为了匹配上面的compose行为，我们需要它从右到左，而不是从左到右
```
// compose.js hosted with ❤ by GitHub

const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
```
上面的 .reduceRight() 与.reduce（）一样，数组.reduceRight（）方法采用reducer函数和初始值（x）。我们迭代数组函数（从右到左），依次将每个函数应用于累加值（v）

使用compose，我们可以在没有嵌套的情况下重写 toSlug 的组合
```
// using-compose.js hosted with ❤ by GitHub
const toSlug = compose(
  encodeURIComponent,
  join('-'),
  map(toLowerCase),
  split(' ')
);

console.log(toSlug('JS Cheerleader')); // 'js-cheerleader'
还有另一种通常称为“pipe（）”的形式。 Lodash称之为flow（）

// pipe.js hosted with ❤ by GitHub

const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const fn1 = s => s.toLowerCase();
const fn2 = s => s.split('').reverse().join('');
const fn3 = s => s + '!'

const newFunc = pipe(fn1, fn2, fn3);
const result = newFunc('Time'); // emit!
我们看看用pipe（）实现的toSlug（）函数

// using-pipe.js hosted with ❤ by GitHub

const toSlug = pipe(
  split(' '),
  map(toLowerCase),
  join('-'),
  encodeURIComponent
);

console.log(toSlug('JS Cheerleader')); // 'js-cheerleader'
在命令式编程中，当您对某个变量执行转换时，您将在转换的每个步骤中找到对该变量的引用。上面的pipe（）实现是以无点的方式编写的，这意味着它根本不识别它运行的参数。

我经常在单元测试和Redux状态之类的东西中使用管道来消除对中间变量的需要，这些中间变量只存在于一个操作和下一个操作之间的瞬态值。

// using-trace.js hosted with ❤ by GitHub

const trace = curry((label, x) => {
  console.log(`== ${ label }:  ${ x }`);
  return x;
});

const toSlug = pipe(
  trace('input'),
  split(' '),
  map(toLowerCase),
  trace('after map'),
  join('-'),
  encodeURIComponent
);

console.log(toSlug('JS Cheerleader'));
// '== input:  JS Cheerleader'
// '== after map:  js,cheerleader'
// 'js-cheerleader'
trace（）只是更通用的tap（）的一种特殊形式，它允许你为流经管道的每个值执行一些操作

// tap.js hosted with ❤ by GitHub

const tap = curry((fn, x) => {
  fn(x);
  return x;
});
现在可以看到trace（）是一个特殊的tap（）

const trace = label => {
  return tap(x => console.log(`== ${ label }:  ${ x }`));
};
这样我们就大概了解到函数式编程的函数组合模式，在后续的文章中会有更多关于函数式编程介绍
```

## 函数式编程-Point Free
Point-free 是一种编程风格，其中函数定义不引用函数的参数。不用关心将要操作的数据是什样的。我们来看看 JavaScript 中的函数定义：

// 表达式
function foo (/* parameters are declared here*/) {}

// 声明式
const foo = (/* parameters are declared here */) => // ...
const foo = function (/* parameters are declared here */) {}
如何在不引用所需参数的情况下在 JavaScript 中定义函数？我们不能使用 functionkeyword，也不能使用箭头函数（=>），因为它们需要声明形参（这将引用它的参数）。所以我们需要做的是调用一个返回函数的函数

看一个简单的例子：

// 非 Point-free. 因为函数引用了参数name
var greet = function(name) {
  return ('hello ' + name).toUpperCase();
}

// Point-free 先定义基本的函数，不用关心中间变量str是什么，抽象基本结构
var toUpperCase = str => str.toUpperCase();
var hello = str => `hello ${str}`; 

var greet = compose(hello, toUpperCase);
greet('renbo');
在看一个例子：
这个例子来自于Favoring Curry
假设我们从服务器获取这样的数据：
```
var data = {
  result: "SUCCESS",
  tasks: [
    {id: 104, complete: false,            priority: "high",
              dueDate: "2013-11-29",      username: "Scott",
              title: "Do something",      created: "9/22/2013"},
    {id: 105, complete: false,            priority: "medium",
              dueDate: "2013-11-22",      username: "Lena",
              title: "Do something else", created: "9/22/2013"},
    {id: 107, complete: true,             priority: "high",
              dueDate: "2013-11-22",      username: "Mike",
              title: "Fix the foo",       created: "9/22/2013"},
    {id: 108, complete: false,            priority: "low",
              dueDate: "2013-11-15",      username: "Punam",
              title: "Adjust the bar",    created: "9/25/2013"},
    {id: 110, complete: false,            priority: "medium",
              dueDate: "2013-11-15",      username: "Scott",
              title: "Rename everything", created: "10/2/2013"},
    {id: 112, complete: true,             priority: "high",
              dueDate: "2013-11-27",      username: "Lena",
              title: "Alter all quuxes",  created: "10/5/2013"}
  ]
};
```
我们需要一个名为 getIncompleteTaskSummaries 的函数，接收一个 username 作为参数，从服务器获取数据之后筛选出这个用户未完成的任务的 ids、priorities、titles、和 dueDate 数据，并且按照日期升序排序。

以 Scott 为例，最终筛选出的数据为
```
[
    {id: 110, title: "Rename everything", 
        dueDate: "2013-11-15", priority: "medium"},
    {id: 104, title: "Do something", 
        dueDate: "2013-11-29", priority: "high"}
]
```
下面得代码我们应该很熟悉
```
var getIncompleteTaskSummaries = function(membername) {
     return fetchData()
         .then(function(data) {
             return data.tasks;
         })
         .then(function(tasks) {
             return tasks.filter(function(task) {
                 return task.username == membername
             })
         })
         .then(function(tasks) {
             return tasks.filter(function(task) {
                 return !task.complete
             })
         })
         .then(function(tasks) {
             return tasks.map(function(task) {
                 return {
                     id: task.id,
                     dueDate: task.dueDate,
                     title: task.title,
                     priority: task.priority
                 }
             })
         })
         .then(function(tasks) {
             return tasks.sort(function(first, second) {
                 var a = first.dueDate,
                     b = second.dueDate;
                 return a < b ? -1 : a > b ? 1 : 0;
             });
         })
         .then(function(task) {
             console.log(task)
         })
};
```
getIncompleteTaskSummaries('Scott')
使用 Point-free 模式
// 拆分基础函数
curry 为封装的通用 curry 韩式
```
var prop = curry(function(name, obj) {
    return obj[name];
});

var propEq = curry(function(name, val, obj) {
    return obj[name] === val;
});

var filter = curry(function(fn, arr) {
    return arr.filter(fn)
});

var map = curry(function(fn, arr) {
    return arr.map(fn)
});

var pick = curry(function(args, obj){
    var result = {};
    for (var i = 0; i < args.length; i++) {
        result[args[i]] = obj[args[i]]
    }
    return result;
});

var sortBy = curry(function(fn, arr) {
    return arr.sort(function(a, b){
        var a = fn(a),
            b = fn(b);
        return a < b ? -1 : a > b ? 1 : 0;
    })
});
```
// 拼装
```
var getIncompleteTaskSummaries = function(membername) {
    return fetchData()
        .then(prop('tasks'))
        .then(filter(propEq('username', membername)))
        .then(filter(propEq('complete', false)))
        .then(map(pick(['id', 'dueDate', 'title', 'priority'])))
        .then(sortBy(prop('dueDate')))
};
```
getIncompleteTaskSummaries('Scott')
如果直接使用 ramda.js，你可以省去编写基本函数
```
var getIncompleteTaskSummaries = function(membername) {
    return fetchData()
        .then(R.prop('tasks'))
        .then(R.filter(R.propEq('username', membername)))
        .then(R.filter(R.propEq('complete', false)))
        .then(R.map(R.pick(['id', 'dueDate', 'title', 'priority'])))
        .then(R.sortBy(R.prop('dueDate')))
};

getIncompleteTaskSummaries('Scott')
利用 compose，也可以这样写,但是 compose 是从右到左依次执行的
var getIncompleteTaskSummaries = function(membername) {
    return fetchData()
        .then(R.compose(
            R.sortBy(R.prop('dueDate')),
            R.map(R.pick(['id', 'dueDate', 'title', 'priority'])),
            R.filter(R.propEq('complete', false)),
            R.filter(R.propEq('username', membername)),
            R.prop('tasks')
        ))
};

getIncompleteTaskSummaries('Scott')
我们也可以利用 ramda.js 提供的 R.pipe 函数，可以从左到右
var getIncompleteTaskSummaries = function(membername) {
    return fetchData()
      .then(R.pipe(
          R.prop('tasks'),
          R.filter(R.propEq('username', membername)),
          R.filter(R.propEq('complete', false)),
          R.map(R.pick(['id', 'dueDate', 'title', 'priority']),
          R.sortBy(R.prop('dueDate'))
      ))
};
```
Point Free 风格能够帮助我们减少不必要的命名，让代码保持简洁和通用


## 函子
```
class Functor {
  constructor(val){
    this.val = val
  }
  map(f){
    return new Functor(f(this.val))
  }
  static of(val){
    return new Functor(val)
  }
}

const functor1 = Functor.of(2).map(two => two + 2)
const functor2 = Functor.of('plus').map(name => name.toUpperCase())

// console.log(functor2)

//const err = Functor.of(null).map(err => err.toUpperCase())

// Maybe选择执行逻辑 可用于处理error

class Maybe extends Functor {
  map(f){
    return this.val ? Maybe.of(f(this.val)) : Maybe.of(this.val)
  }
  static of(val){
    return new Maybe(val)
  }
}

const mb = Maybe.of(2).map(x => x * 100)
// console.log(mb)
// const err = Maybe.of(null).map(err => err.toUpperCase())


// Either 如果存在right值  对right值进行关系处理 否则对left值进行关系处理
class Either extends Functor {
  constructor(left,right){
    super('val')
    this.left = left
    this.right = right
  }
  map(f){
    return this.right ? Either.of(this.left,f(this.right)) : Either.of(f(this.left),this.right)
  }
  static of (left, right) {
    return new Either(left, right)
  }
}

const edit = Either.of(1,0).map(x => x + 8)

// console.log(edit)

// class Ap extends Functor{
//   ap(F){
//     return Ap.of(this.val(F.val))
//   }
//   static of(val){
//     return new Ap(val)
//   }
// }
// const addTwo = x => x + 2
// const add = x => y => x + y

// const res3 = Ap.of(addTwo).ap(Functor.of(2))
// const res6 = Ap.of(add).ap(Maybe.of(2)).ap(Maybe.of(3))
//  console.log(res6)

//  七、ap 函子
// 函子里面包含的值，完全可能是函数。我们可以想象这样一种情况，一个函子的值是数值，另一个函子的值是函数。


function addTwo(x) {
  return x + 2;
}

const A = Functor.of(2);
const B = Functor.of(addTwo)
// 上面代码中，函子A内部的值是2，函子B内部的值是函数addTwo。
// 有时，我们想让函子B内部的函数，可以使用函子A内部的值进行运算。这时就需要用到 ap 函子。
// ap 是 applicative（应用）的缩写。凡是部署了ap方法的函子，就是 ap 函子。
class Ap extends Functor {
  ap(F) {
    return Ap.of(this.val(F.val));
  }
}
// 注意，ap方法的参数不是函数，而是另一个函子。
// 因此，前面例子可以写成下面的形式。
Ap.of(addTwo).ap(Functor.of(2))
// Ap(4)
// ap 函子的意义在于，对于那些多参数的函数，就可以从多个容器之中取值，实现函子的链式操作。
function add(x) {
  return function (y) {
    return x + y;
  };
}
Ap.of(add).ap(Maybe.of(2)).ap(Maybe.of(3));
// Ap(5)
// 上面代码中，函数add是柯里化以后的形式，一共需要两个参数。通过 ap 函子，我们就可以实现从两个容器之中取值。它还有另外一种写法。

Ap.of(add(2)).ap(Maybe.of(3));
```

## 应用

// https://lambda.academy/explain-monads/

// https://lambda.academy/

// http://www.ruanyifeng.com/blog/2015/07/monad.html

// 任何具有map方法的数据结构，都可以当作函子的实现。
// 一般约定，函子的标志就是容器具有map方法。该方法将容器里面的每一个值，映射到另一个容器。
// 函数式编程一般约定，函子有一个of方法，用来生成新的容器。
// Maybe 函子就是为了解决这一类问题而设计的。简单说，它的map方法里面设置了空值检查
// 条件运算if...else是最常见的运算之一，函数式编程里面，使用 Either 函子表达。
// Either 函子内部有两个值：左值（Left）和右值（Right）。右值是正常情况下使用的值，左值是右值不存在时使用的默认值。

// ap 函子
// 函子里面包含的值，完全可能是函数。我们可以想象这样一种情况，一个函子的值是数值，另一个函子的值是函数
function addTwo(x) {
  return x + 2;
}
const A = Functor.of(2);
const B = Functor.of(addTwo)
// 上面代码中，函子A内部的值是2，函子B内部的值是函数addTwo。
// 有时，我们想让函子B内部的函数，可以使用函子A内部的值进行运算。这时就需要用到 ap 函子。
// ap 是 applicative（应用）的缩写。凡是部署了ap方法的函子，就是 ap 函子。
class Ap extends Functor {
  ap(F) {
    return Ap.of(this.val(F.val));
  }
}
// ap方法的参数不是函数，而是另一个函子。

Ap.of(addTwo).ap(Functor.of(2))
// Ap(4)
// ap 函子的意义在于，对于那些多参数的函数，就可以从多个容器之中取值，实现函子的链式操作。
function add(x) {
  return function (y) {
    return x + y;
  };
}

Ap.of(add).ap(Maybe.of(2)).ap(Maybe.of(3));
// Ap(5)
// 上面代码中，函数add是柯里化以后的形式，一共需要两个参数。通过 ap 函子，我们就可以实现从两个容器之中取值。它还有另外一种写法
Ap.of(add(2)).ap(Maybe.of(3));

// Monad 函子
// 函子是一个容器，可以包含任何值。函子之中再包含一个函子，也是完全合法的。但是，这样就会出现多层嵌套的函子。
Maybe.of(
  Maybe.of(
    Maybe.of({name: 'Mulburry', number: 8402})
  )
)
// 上面这个函子，一共有三个Maybe嵌套。如果要取出内部的值，就要连续取三次this.val。这当然很不方便，因此就出现了 Monad 函子
// Monad 函子的作用是，总是返回一个单层的函子。它有一个flatMap方法，与map方法作用相同，唯一的区别是如果生成了一个嵌套函子，它会取出后者内部的值，保证返回的永远是一个单层的容器，不会出现嵌套的情况

class Monad extends Functor {
  join() {
    return this.val;
  }
  flatMap(f) {
    return this.map(f).join();
  }
}

// 上面代码中，如果函数f返回的是一个函子，那么this.map(f)就会生成一个嵌套的函子。所以，join方法保证了flatMap方法总是返回一个单层的函子。这意味着嵌套的函子会被铺平（flatten）。

// IO 操作
// Monad 函子的重要应用，就是实现 I/O （输入输出）操作。

// I/O 是不纯的操作，普通的函数式编程没法做，这时就需要把 IO 操作写成Monad函子，通过它来完成。

var fs = require('fs');

var readFile = function(filename) {
  return new IO(function() {
    return fs.readFileSync(filename, 'utf-8');
  });
};

var print = function(x) {
  return new IO(function() {
    console.log(x);
    return x;
  });
}

// 上面代码中，读取文件和打印本身都是不纯的操作，但是readFile和print却是纯函数，因为它们总是返回 IO 函子。

// 如果 IO 函子是一个Monad，具有flatMap方法，那么我们就可以像下面这样调用这两个函数。
readFile('./user.txt')
.flatMap(print)

// 这就是神奇的地方，上面的代码完成了不纯的操作，但是因为flatMap返回的还是一个 IO 函子，所以这个表达式是纯的。我们通过一个纯的表达式，完成带有副作用的操作，这就是 Monad 的作用。

// 由于返回还是 IO 函子，所以可以实现链式操作。因此，在大多数库里面，flatMap方法被改名成chain

var tail = function(x) {
  return new IO(function() {
    return x[x.length - 1];
  });
}

readFile('./user.txt')
.flatMap(tail)
.flatMap(print)

// 等同于
readFile('./user.txt')
.chain(tail)
.chain(print)
// 上面代码读取了文件user.txt，然后选取最后一行输出。



class Functor {
  constructor(val){
    this.val = val
  }
  map(f){
    return new Functor(f(this.val))
  }
  static of(val){
    return new Functor(val)
  }
}

const functor1 = Functor.of(2).map(two => two + 2)
const functor2 = Functor.of('plus').map(name => name.toUpperCase())

// console.log(functor2)

//const err = Functor.of(null).map(err => err.toUpperCase())

// Maybe选择执行逻辑 可用于处理error

class Maybe extends Functor {
  map(f){
    return this.val ? Maybe.of(f(this.val)) : Maybe.of(this.val)
  }
  static of(val){
    return new Maybe(val)
  }
}

const mb = Maybe.of(2).map(x => x * 100)
// console.log(mb)
// const err = Maybe.of(null).map(err => err.toUpperCase())


// Either 如果存在right值  对right值进行关系处理 否则对left值进行关系处理
class Either extends Functor {
  constructor(left,right){
    super('val')
    this.left = left
    this.right = right
  }
  map(f){
    return this.right ? Either.of(this.left,f(this.right)) : Either.of(f(this.left),this.right)
  }
  static of (left, right) {
    return new Either(left, right)
  }
}

const edit = Either.of(1,0).map(x => x + 8)

// console.log(edit)

// class Ap extends Functor{
//   ap(F){
//     return Ap.of(this.val(F.val))
//   }
//   static of(val){
//     return new Ap(val)
//   }
// }
// const addTwo = x => x + 2
// const add = x => y => x + y

// const res3 = Ap.of(addTwo).ap(Functor.of(2))
// const res6 = Ap.of(add).ap(Maybe.of(2)).ap(Maybe.of(3))
//  console.log(res6)

//  七、ap 函子
// 函子里面包含的值，完全可能是函数。我们可以想象这样一种情况，一个函子的值是数值，另一个函子的值是函数。


function addTwo(x) {
  return x + 2;
}

const A = Functor.of(2);
const B = Functor.of(addTwo)
// 上面代码中，函子A内部的值是2，函子B内部的值是函数addTwo。
// 有时，我们想让函子B内部的函数，可以使用函子A内部的值进行运算。这时就需要用到 ap 函子。
// ap 是 applicative（应用）的缩写。凡是部署了ap方法的函子，就是 ap 函子。
class Ap extends Functor {
  ap(F) {
    return Ap.of(this.val(F.val));
  }
}
// 注意，ap方法的参数不是函数，而是另一个函子。
// 因此，前面例子可以写成下面的形式。
Ap.of(addTwo).ap(Functor.of(2))
// Ap(4)
// ap 函子的意义在于，对于那些多参数的函数，就可以从多个容器之中取值，实现函子的链式操作。
function add(x) {
  return function (y) {
    return x + y;
  };
}
Ap.of(add).ap(Maybe.of(2)).ap(Maybe.of(3));
// Ap(5)
// 上面代码中，函数add是柯里化以后的形式，一共需要两个参数。通过 ap 函子，我们就可以实现从两个容器之中取值。它还有另外一种写法。

Ap.of(add(2)).ap(Maybe.of(3));

