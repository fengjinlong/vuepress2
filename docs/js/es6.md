## ES6
```
const 优于 let

let a = '😂😄👌🌹'
console.log(Array.from(a))

Object.is(NAN, NAN) true

箭头函数不绑定this
```

### class
```
class Parent {
  constructor (age) {
    this.age = age
  }
  tell () {
    console.log('tell_p')
  }
}
class Man extends Parent {
  constructor (age) {
    super(age)
    this.arr = []
  }
  set menu (data) {
    this.arr.push(data)
  }
  get menu () {
    return this.arr
  }
  tell () {
    super.tell()
    console.log('tell_m')
  }
  static init () {
    console.log('static')
  }
}
Man.init()
const xw = new Man(20)
console.log(xw.tell())
xw.menu = '111'
console.log(xw.menu)
```

### async
```
(async(){
  function promiseFn (url) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        url: url,
        success (response) {
          resolve(response)
        },
        error (error) {
          reject(erroe)
        }
      })
    })
  }
  const a1 = await promiseFn(url1)
  const a2 = await promiseFn(url2)
  let p = a1 + a2
})()
```