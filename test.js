Function.prototype.bind = function (thisObj) {
  if (typeof this != 'function') {
    throw new TypeError('只能对函数使用 bind 方法')
  }
  const self = this
  const args = [].slice.call(arguments, 1)
  return function () {
    self.apply(thisObj, args.concat([].slice.apply(arguments)))
  }
}

new (function () {
  self.apply(thisObj, args.concat([].slice.apply(arguments)))
})()

function Cat() {
  this.name = 'Tom'
  
}

function Mouse() {
  this.name = 'Jerry'
  return ['Jerry']
}

function Mouse1() {
  this.name = 'Jerry1'
  return 11
}

const cat = new Cat()
const mouse = new Mouse()
const mouse1 = new Mouse1()
console.log(cat) // Cat { name: 'Tom' }
console.log(mouse) // [ 'Jerry' ]
console.log(mouse1) // [ 'Jerry' ]