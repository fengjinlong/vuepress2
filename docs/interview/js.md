## this
```
// 1
function fn () {
  console.log(this)
}
var yd = {
  len: 5,
  method: function (fn) {
    console.log(this)//ob
    fn()//W
  }
}
yd.method(fn, 1)


var list = document.getElementsByTagName("li")
for (var i = 0; i<3;i++) {
  list[i].onclick = function () {
    console.log(i)
  }
}
// 2
for (let i = 0; i<3;i++) {
  list[i].onclick = function () {
    console.log(i)
  }
}

for (var i = 0; i<3;i++) {
  (function (i) {
    list[i].onclick = function () {
      console.log(i)
    }
  })(i)
}

for (var i = 0; i<3;i++) {
 list[i].onclick = function () {
    console.log(this.innerHtml)
  }
}
```
## 习题相关
```
// var num = 1
// function yd () {
//   console.log(++this.num)
// }
// (function () {
//   "use strict"
//   yd()
// })()

// var a = 'abc'
// 一句话遍历变量，不用for

// var length = 10
// function fn () {
//   console.log(this.length)
// }
// var yd = {
//   length : 5,
//   method: function (fn) {
//     fn()
//     console.log(arguments[0])
//     arguments[0]()
//   }
// }
// yd.method(fn, 1,1)

// function Car (color, price) {
//   this.color = color
//   this.price = price
// }
// Car.prototype.methods = function () {
//   console.log(this.color)
//   console.log(this)
// }

// function Cruze (c,p) {
//   Car.call(this,c,p)
// }
// Cruze.prototype = new Car()
// Cruze.prototype.constructor = Cruze



// var c = new Cruze('red', 12)
// c.methods()

// // console.log(c)

// class Car {
//   constructor (val) {
//     this.val = val
//   }
//   methods () {}
// }
// class Cruze extends Car {
//   constructor (val) {
//     super(val)
//   }
// }

// var yd = {
//   bar: function () {
//     return this.baz
//   },
//   baz: 1
// }
// (function () {
//   console.log(arguments[0]())
// })(yd.bar)

// var x = [typeof x, typeof y][1]
// console.log(x)
// typeof x

// var x = (function (x) {
//   delete x;
//   return x
// })(1)

// var x = 1
// if (function f () {}) {
//   x += typeof f
// }
// console.log(x)

// function f () {
//   return f
// }
// console.log(new f() instanceof f)

// var yd = [0]
// if (yd) {
//   console.log(yd)
//   console.log(yd == true)
// }

// function yd () {
//   return {
//     a: this
//   }

// }
// var r = yd()
// console.log(r.a)

// var y = Array(3)
// y[0] = 2
// var t = y.map(function (ele) {
//   return '1'
// })
// console.log(t)
// console.log(t[1])

// console.log([1<2<3, 3<2<1])

// Function.length 1
// new Function().length 0

// var yi = new Date("2018-08-20")
// var d = new Date(2018, 08, 20)
// console.log(yi.getDay === d.getDay())

// console.log([typeof null, null instanceof Object])


// fun()
// var f = true
// if (f) {
//   function fun (){
//     console.log(1)
//   }
// }else {
//   function fun (){
//     console.log(11)
//   }
// }

{
if (false) {
    var a = 1
    function fun () {
        console.log(fun)
    }
}

console.log(a)  
// undefined
fun()           
// fun is not function 
}
```

## 1 函数优先级高于变量
alert(a)
a()
var a = 3
function a () {
  alert(10)
}
alert(a)
a = 6
a()

##  指向
```
this.a = 20
var test = {
  a: 40,
  init: function () {
    console.log(this.a)
    function go () {
      console.log(this.a)
    }
    go.prototype.a = 50
    return go
  }
}
new(test.init())()  40 50
init: () => {...
new(test.init())()  20 50

this.a = 20
var test = {
  a: 40,
  init: () => {
    console.log(this.a)
    function go () {
      this.a = 60
      console.log(this.a)
    }
    go.prototype.a = 50
    return go
  }
}
var p = test.init()
p() 20 60

function yd () {
  "use strict"
  console.log(this) 
}
yd() undefined

function yd () {
  console.log(this) 
}
yd() Window
```

```
var list = document.getElementsByTagName("li")
for (var i = 0; i<3;i++) {
  list[i].onclick = function () {
    console.log(i)
  }
}

for (let i = 0; i<3;i++) {
  list[i].onclick = function () {
    console.log(i)
  }
}

for (var i = 0; i<3;i++) {
  (function (i) {
    list[i].onclick = function () {
      console.log(i)
    }
  })(i)
}

for (var i = 0; i<3;i++) {
 list[i].onclick = function () {
    console.log(this.innerHtml)
  }
}
```

```
function t (m) {
  m = {v: 5}
  console.table(m)
}
var m = {v: 30}
t(m)
console.table(m)
```
## 一句话算出0-100学生等级
```
10 - Math.floor(n/10)

  <script>
    yd;
    console.log(1)
  </script>
  <script>
    console.log(2)
  </script>


  var y = Array(3)
y[0] = 2
var t = y.map(function (ele) {
  return '1'
})
console.log(t)
console.log(t[1])
```
```
Function 构造器本身也是个Function。他的 length 属性值为 1 。该属性 Writable: false, Enumerable: false, Configurable: true.

Function.prototype  对象的 length 属性值为 0 。


var yi = new Date("2018-08-20")
var d = new Date(2018, 08, 20)
console.log(yi.getDay === d.getDay())

function fun (a=11,b=3) {
  console.log(a + '-' + b)
  console.log(arguments[0])
}
fun()

function f (ary) {
  ary[0] = ary[2]
}
function yd (a,b,c=3) {
  c = 10
  f(arguments)
  console.log(a) 
  console.log(b) 
  console.log(c) 
}
yd(1,1,1)

```
```
在严格模式下，剩余参数、默认参数和解构赋值参数的存在不会改变 arguments对象的行为，但是在非严格模式下就有所不同了。

当非严格模式中的函数没有包含剩余参数、默认参数和解构赋值，那么arguments对象中的值会跟踪参数的值（反之亦然）。看下面的代码：

function func(a) { 
  arguments[0] = 99;   // 更新了arguments[0] 同样更新了a
  console.log(a);
}
func(10); // 99
并且

function func(a) { 
  a = 99;              // 更新了a 同样更新了arguments[0] 
  console.log(arguments[0]);
}
func(10); // 99
当非严格模式中的函数有包含剩余参数、默认参数和解构赋值，那么arguments对象中的值不会跟踪参数的值（反之亦然）。相反, arguments反映了调用时提供的参数：

function func(a = 55) { 
  arguments[0] = 99; // updating arguments[0] does not also update a
  console.log(a);
}
func(10); // 10
并且

function func(a = 55) { 
  a = 99; // updating a does not also update arguments[0]
  console.log(arguments[0]);
}
func(10); // 10
并且

function func(a = 55) { 
  console.log(arguments[0]);
}
func(); // undefined

var max = Math.max() // -Infinty
var min = Math.min() // Infinty
console.log(min > max)
```

```
if (false) {
    var a = 1
    function fun () {
        console.log(fun)
    }
}

console.log(a)  
// undefined
fun()           
// fun is not function 
```
```
  <!-- 互不影响 -->
  <script>
    abc
    console.log('abc')
  </script>
  <script>
    console.log('abc11')
  </script>
  ```
      let ob = {
      a: 1,
      b: function () {
        console.log(this.a)
      },
      c: () => {
        console.log(this.a)
      },
      d () {
        console.log(this.a)
      }
    }

    let obj = {
      a: 2,
      ob
    }
    ob.b()
    ob.c()
    ob.d()

    obj.ob.b()
    obj.ob.c()
    obj.ob.d()

    ob.b.call(obj)
    ob.c.call(obj)
    ob.d.call(obj)

    ob.b.bind(obj)()
    ob.c.bind(obj)()
    ob.d.bind(obj)()

    ```
        if (false) {
      var a = 1
      function fun () {
        console.log('fun')
      }
    }
    console.log(fun) // undefined
    console.log(a)  // undefined
    ```

    ```
    function p () {
      return p
    }
    console.log(new p() instanceof p)
    console.log(new p())
    console.log(p)
    ```

  ## 对比请求方法

    fetch
    1.IE浏览器完全不支持fetch，移动端的很多浏览器也不支持,所以，如果要在这些浏览器上使用Fetch，就必须使用fetch polyfil
    2.cookie传递必须在header参数里面加上credentials: 'include'，才会如xhr一样将当前cookies带到请求中去
    3.fetch和xhr的不同：fetch虽然底层，但是还是缺少一些常用xhr有的方法，比如能够取消请求（abort）方法。fetch在服务器返回4xx、5xx时是不会抛出错误的，这里需要手动通过，通过response中的ok字段和status字段来判断。fetch不支持abort，不支持超时控制
    4.Fetch 请求默认是不带 cookie 的，需要设置 fetch(url, {credentials: 'include'})；服务器返回 400，500 错误码时并不会 reject，只有网络错误这些导致请求不能完成时，fetch 才会被 reject。
    jQuery ajax
    1.本身是针对MVC的编程,不符合现在前端MVVM的浪潮
    2.基于原生的XHR开发，XHR本身的架构不清晰，已经有了fetch的替代方案
    3.JQuery整个项目太大 
    axios
    1.从 node.js 创建 http 请求
    2.支持 Promise API
    3.客户端支持防止CSRF
    4.提供了一些并发请求的接口（重要，方便了很多的操作）

    axios 是一个基于Promise 用于浏览器和 nodejs 的 HTTP 客户端，它本身具有以下特征：
    1.从浏览器中创建 XMLHttpRequest
    2.从 node.js 发出 http 请求
    3.支持 Promise API
    4.拦截请求和响应
    5.转换请求和响应数据
    6.取消请求
    7.自动转换JSON数据
    8.客户端支持防止CSRF/XSRF