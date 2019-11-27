## bind
1. 调用 call 和 apply 方法会立马执行原函数，而调用 bind 方法会返回一个新的函数，不会立马执行原始函数。bind 的这种特性让原始函数可以延迟执行，方便在事件处理函数中使用。不仅如此，调用 bind 方法返回的函数还具有偏函数，以及对 new 关键字的支持等特性
```
const cat = {
  name: 'Tom',
  greeting() {
    const str = 'Hello, my name is ' + this.name
    console.log(str)
  }
}

cat.greeting(); // Hello, my name is Tom

// 将另一个变量指向 cat 的 greeting 方法
const greeting2 = cat.greeting
// this 绑定消失了
greeting2()
```
```
const cat = {
  name: 'Tom',
  greeting() {
    const str = 'Hello, my name is ' + this.name
    console.log(str)
  }
}

// 将另一个变量指向 cat 的 greeting 方法
const greeting2 = cat.greeting
// 通过 Function.prototype.call 来绑定 this
greeting2.call(cat) // Hello, my name is Tom

// 通过 Function.prototype.apply 来绑定 this
greeting2.apply(cat) // Hello, my name is Tom

// 通过 Function.prototype.bind 来绑定 this
const greeting2AfterBind = greeting2.bind(cat) 
greeting2AfterBind() // Hello, my name is Tom
```

2. 在调用 bind 的时候可以指定参数，当原始函数执行时，这些参数就会被添加到参数列表的最前面。bind 的这个特性使得我们可以很轻易的实现偏函数
```
偏函数是函数式编程中的一个概念，使用偏函数，我们可以先缓存一部分参数，在运行时再传入另一部分参数。
function add(x,y) {
  console.log('x + y =',x + y)
  console.log('arguments:',arguments)
}

// 将 5 作为第一个参数传入
const add5 = add.bind(null,5)
add5(5)
```

3. bind 方法的另一个特性是对 new 关键字的支持。我们已经知道调用 bind 方法会返回一个新的函数，在 JavaScript 中，函数是可以作为类来使用的，如果通过 bind 将一个类中的 this 绑定为另一个对象，然后通过 new 关键字创建一个实例，这个新建实例和绑定的对象之间有什么关系呢？
```
function Cat() {
  this.name = 'Tom'
  Cat.prototype.greeting = function () {
    let str = 'Hello, my name is ' + this.name
    console.log(str)
  }
}

const cat1 = new Cat()
cat1.greeting()

// 对 Cat 类中的 this 进行重新绑定
const NewCat = Cat.bind({ name:'Jerry' })
const cat2 = new NewCat() 
cat2.greeting()


运行代码，输出结果如下：



Hello, my name is Tom
Hello, my name is Tom
```
>+ 使用 bind 方法对类进行绑定，并不会影响到原始的 this。不过，这只限于通过 new 关键字时，将函数作为类来使用的情况，如果通过普通的方式调用函数，则不会存在这样的限制。

4. bind 方法只对第一次绑定生效，后续的绑定都不会起作用
```
const cat = {
  name:'Tom',
  greeting() {
    const str = 'Hello, my name is ' + this.name
    console.log(str)
  }
}

const greeting = cat.greeting
// 执行第一次绑定
const greetingFirstBind = greeting.bind(cat)
// 执行第二次绑定
const greetingSecondBind = greetingFirstBind.bind({ name:'Jerry' })
greetingSecondBind() // Hello, my name is Tom
```
## new 
1. new 的作用
```
function Test(name) {
  this.name = name
}
Test.prototype.sayName = function () {
    console.log(this.name)
}
const t = new Test('yck')
console.log(t.name) // 'yck'
t.sayName() // 'yck'
```
>+ new 通过构造函数 Test 创建出来的实例可以访问到构造函数中的属性
>- new 通过构造函数 Test 创建出来的实例可以访问到构造函数原型链中的属性，也就是说通过 new 操作符，实例与构造函数通过原型链连接了起来
1. 下面重点来了
2. 当下的构造函数 Test 并没有显式 return 任何值（默认返回 undefined），如果我们让它返回值会发生什么事情呢？
```
return 原始值
function Test(name) {
  this.name = name
  return 1
}
const t = new Test('yck')
console.log(t.name) // 'yck'

return 引用
function Test(name) {
  this.name = name
  console.log(this) // Test { name: 'yck' }
  return { age: 26 }
}
const t = new Test('yck')
console.log(t) // { age: 26 }
console.log(t.name) // 'undefined'

```
>+ 构造函数如果返回原始值（虽然例子中只有返回了 1，但是你可以试试其他的原始值，结果还是一样的），那么这个返回值毫无意义
>- 构造函数如果返回值为对象，那么这个返回值会被正常使用
>+ 这两个例子告诉了我们一点，构造函数尽量不要返回值。因为返回原始值不会生效，返回对象会导致 new 操作符没有作用。

3. 手写new
```
function create(Con, ...args) {
  let obj = {}
  Object.setPrototypeOf(obj, Con.prototype)
  let result = Con.apply(obj, args)
  return result instanceof Object ? result : obj
}
```
>+ 首先函数接受不定量的参数，第一个参数为构造函数，接下来的参数被构造函数使用
>- 然后内部创建一个空对象 obj
>+ 因为 obj 对象需要访问到构造函数原型链上的属性，所以我们通过 setPrototypeOf 将两者联系起来。这段代码等同于 obj.__proto__ = Con.prototype
>- 将 obj 绑定到构造函数上，并且传入剩余的参数
>+ 判断构造函数返回值是否为对象，如果为对象就使用构造函数返回的值，否则使用 obj，这样就实现了忽略构造函数返回的原始值



## 手写 bind 方法
1. 基础
```
Function.prototype.bind = function(thisObj) {
  // 判断调用 bind 的方法是不是一个函数
  if(typeof this !== 'function') {
    throw new TypeError('只能对函数使用 bind 方法')
  }

  // 保存当前函数的指针
  const self = this;
  // 拿到除第一个参数以外的其他参数列表
  const args = [].slice.call(arguments,1)

  // 返回一个新的函数
  return function () {
    // 通过 call 函数修改 this 指向
    // 返回原始函数的返回值，这点不要忘了哦
    // 将 bind 函数的剩余参数，放到原始函数参数列表的最前面调用
    return self.apply(thisObj,args.concat([].slice.apply(arguments)))
  }
}
```
>+ 其内部主要使用了 call 和 apply 方法来完成了对 this 的绑定。
>- 每次调用 bind 会返回一个新的函数，调用新的函数时，会执行原始函数，并将 bind 方法的剩余参数和新函数的参数列表一并传入原始函数中。
>+ 这里的 self 是通过闭包保存的原始函数的引用，而 thisObj 也是通过闭包获取的，因此对于一个函数，不管使用 bind 绑定多少次 ，其原始函数在被调用时，总是从第一次调用 bind 方法返回的闭包中去获取新的 this 的值，这也就是多次使用 bind 方法只有第一次有效的原因。
>- 由于使用 bind 方法只会让 this 被绑定一次，因此这种方式也叫做硬绑定。
>+ 不得不说，这真是一种很妙的解决方案，闭包在 JavaScript 中的应用，真是太广泛，太神奇了

2. new 来了老弟
```

function Cat() {
  console.log('this in cat is ',this)
  Cat.prototype.greeting = function() {
    const str = 'Hello, my name is ' + this.name
    console.log(str)
  }
}

const anotherCat = { name:'Jerry'}
const NewCat = Cat.bind(anotherCat)
const newCat = new NewCat()
console.log(newCat)
console.log(newCat.greeting)

运行代码，输出结果如下：

this in cat is  { name: 'Jerry' }
{}
undefined ? what
```
> 上面的代码是不是看起来很怪异呢？我们在 Cat 类中打印 this，得到的确实是绑定后的 this，但是最终创建的对象，却是一个空对象，并且这个空对象的 greeting 为 undefined。这是怎么回事呢？

> 其实，这个问题和 JavaScript 中 new 关键字的机制有关，在 JavaScript 中使用 new 关键字调用函数（创建对象）的流程如下：
>> 1 申请一块空内存（创建一个空对象）

>> 2 运行函数，将 this 指向这个新建的对象

>> 3 执行函数内部的语句，为新对象添加属性和方法

>> 4 如果函数没有返回值，就返回这个新建的对象，如果函数的返回值为基本数据类型，也会返回这个新建对象

>> 5 这里的关键点在第四步，如果一个函数没有明确的返回值，使用 new 调用的时候，就会返回新建的对象（也就是 this），如果函数有明确的返回值（这个返回值不能是基本的数据类型，需要是引用类型），使用 new 调用的时候，便不会返回 this，而是函数真实的返回值 。

## 下面高能
>+ 明白了 new 关键字的机制后，我们就可以分析前面通过 new 关键字实例化 NewCat 类，得到的返回值是空对象的原因了。
>+ 这是因为，NewCat 相对于原始的 Cat 是一个全新的函数（调用 bind 方法方法返回），我们在使用 new 关键字调用 NewCat 时，调用的其实是这个新的函数，在新函数中再通过 call 方法调用 Cat 函数，并没有直接对 Cat 进行实例化。
>+ 在调用新函数的时候，首先会生成一个空对象。此外，新函数还有一个返回值，返回的是 Cat 函数调用的结果。当 Cat 作为函数而非类调用时，其返回值是 undefined。因而实例化这个新函数的最终结果，就是返回在使用 new 实例化它自身时所创建的那个空对象。

```
function Cat() {
  console.log('this in cat is ',this)
  this.greeting = function() {
    const str = 'Hello, my name is ' + this.name
    console.log(str)
  }
  // Cat 的 this 被绑定为 {  name:'Jerry' }，这里手动将其返回
  return this
}

const anotherCat = { name:'Jerry'}
const NewCat = Cat.bind(anotherCat)
const newCat = new NewCat()
console.log(newCat)

运行代码，输出结果如下：

this in cat is  { name: 'Jerry' }
{ name: 'Jerry', greeting: [Function] }
```

*Cat 显式的返回了一个引用类型，使用 new 调用 bind 后的新函数时，也会将这个引用类型返回。*

## 让 bind 更好的支持 new 关键字
```
Function.prototype.bind = function(thisObj) {
  // 判断调用 bind 的方法是不是一个函数
  if(typeof this !== 'function') {
    throw new TypeError('只能对函数使用 bind 方法')
  }

  // 保存当前函数的指针
  const self = this;
  // 拿到除第一个参数以外的其他参数列表
  const args = [].slice.call(arguments,1)

  function Bound() {
    // 如果 this instanceof Bound，说明是通过 new 关键字调用
    // 这时就将 this 直接绑定到 self，而忽略 thisObj，在 self 内部会对 this 添加属性和方法
    return self.apply(this instanceof Bound ? this : thisObj,args.concat([].slice.apply(arguments)))
  }

  // 实现继承
  if(this.prototype){
    Bound.prototype = Object.create(this.prototype)
  }

  return Bound
}
```

*在执行 Bound 函数时，首先会判断 this 是否是其自身的实例，如果是则说明 Bound 函数正在被 new 关键字调用，那么就将新函数的 this（通过 new 调用新函数时创建的空对象）绑定到 self 上，而忽略 thisObj 对象，运行 self 函数时就会为新函数的 this 添加属性。此外，如果原始函数具有 prototype 属性，还需让 Bound 函数对原始函数进行继承（这里使用的是 ES5 的 Object.create 方法，如果想兼容更低级别的浏览器，可以使用其他继承方式）。*