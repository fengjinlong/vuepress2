
## ES5
1. 严格模式 use strict
>+ 变量需要定义 使用未声明变量
>+ 重复定义对象的值
>+ delete 变量
>+ 重复参数名字
>+ arguments 用法无效

2. JSON
```
处理，过滤
let result = JSON.parse('{"a": "1", "b": 2}', function (key, val) {
  if (typeof val === 'string') {
    return val * 1
  } else {
    return val
  }
})

let result = JSON.stringify({"a": "1", "b": 2}, function (key, val) {
  if (typeof val === 'string') {
    return val * 1
  } else {
    return val
  }
})

格式化数字
let result = JSON.stringify('{"a": "1", "b": 2}', function (key, val) {
  if (typeof val === 'string') {
    return val * 1
  } else {
    return val
  }
}, 2)
```

3. 添加对象
>+ Object.keys()
>+ Object.create() 实现一个原型继承
```
var obj = {}
function myClass () {}
myClass.prototype = Object.create(obj)
var n = new myClass()
```
>+ Object.freeze()
>+ Object.is(val1, val2)
>+ Object.observe(obj, callback)

4. 额外数组
>+ Array.isArray()
```
forEach
map
filter
some
every
indexOf
reduce
二维扁平化
var arr = matrix.reduce(function (pre, cur) {
  return pre.concat(cur)
})
Function.prototype.bind(thisArr [,arg1 [,arg2, ...]])
```
5. this 谁调用 指向谁
```
this.a = 1000
function test () {
  this.a = 1
}
test.prototype.geta = function () {
  return this.a
}
var p = test()
console.log(p.geta()) // 1
```
6. 作用域
7. 按值传递按引用传递

## 柯里化
```
function isType (type) {
  return function (obj) {
    return Object.prototype.toString.call(obj) === '[Object '+type+']' 
  }
}
var isNumber = isType('Number')
isNumber(1)
var isArray = isType('Array')
```

### 闭包用完赋值为null 防止内存泄漏

```
{
  var a = 10
  var b=c=a
}
=> 
var a = 10 
var b = 10 
c =10

{
  var a = 10
  var b,c=a
}
=> 
var a = 10 
var b = 10 
var c =10

```
## es5 js
1. 立即执行函数
2. 闭包 内部函数可以访问外部函数变量，把函数返回出去 闭包可以内部变量 造成内存泄漏 =null
3. 原型链
>+ 构造函数的属性优先级高于原型链
>+ 面向对象编程时JS没有类的概念 可以用函数代替
>+ constructor 实际就是对应的那个函数
>+ proototype 按引用传递的 Object.create()原型链的副本
4. 数值 字符串 布耳 按值传递
5. 改变this方法 call apply bind
6. 函数提升 变量提升 函数提升比变量高
7. jq 内部有很多经典写法 模块化编程概念
```
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
    p()
    new(test.init())()

    this.a = 20
    var test = {
      a: 40,
        init: function (){
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
    p()
    new(test.init())()
```
```
var o = {
      a: 1,
      init: function () {
        console.log(this) // o
        var f = () => {
          console.log(this) // o
        }
        f()
      }
    }
    var o = {
      a: 1,
      init: () => {
        console.log(this) // W
        var f = () => {
          console.log(this) // W
        }
        f()
      }
    }
    o.init()

```