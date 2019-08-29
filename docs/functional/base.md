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
