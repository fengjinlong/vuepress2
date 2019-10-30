let f1 = () => {}
let f2 = () => {}
let f3 = () => {}
let _events = new Map()
_events.set('f',[f1, f2, f3])
// _events.set('f',f1,f2)
let fun = function(type, fn) {
  const handler = _events.get(type); // 获取对应事件名称的函数清单

  // 如果是函数,说明只被监听了一次
  if (handler && typeof handler === 'function') {
    _events.delete(type, fn);
  } else {
    let postion;
    // 如果handler是数组,说明被监听多次要找到对应的函数
    for (let i = 0; i < handler.length; i++) {
      if (handler[i] === fn) {
        postion = i;
        break
      } else {
        postion = -1;
      }
    }
    // 如果找到匹配的函数,从数组中清除
    if (postion !== -1) {
      // 找到数组对应的位置,直接清除此回调
      handler.splice(postion, 1);
      // 如果清除后只有一个函数,那么取消数组,以函数形式保存
      if (handler.length === 1) {
        _events.set(type, handler[0]);
      }
    } else {
      return this;
    }
  }
};
fun('f', f2)
fun('f', f1)
fun('f', f3)
console.log(_events)