function isFunction (fn) {
  return Object.prototype.toString.call(fn) === '[object Function]'
}
function Promise(fn) {
  if (!isFunction(fn)) {
    throw new Error('Promise must accept a function as a parameter')
  }
}