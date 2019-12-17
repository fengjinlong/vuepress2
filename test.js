const getType = obj => {
  var toString = Object.prototype.toString;
  var map = {
    "[object Boolean]": "boolean",
    "[object Number]": "number",
    "[object String]": "string",
    "[object Function]": "function",
    "[object Array]": "array",
    "[object Date]": "date",
    "[object RegExp]": "regExp",
    "[object Undefined]": "undefined",
    "[object Null]": "null",
    "[object Object]": "object",
    "[object Symbol]": "symbol"
  };
  // if (obj instanceof 'Element') {
  //   return "element";
  // }
  return map[toString.call(obj)];
};
const deepClone = oldObj => {
  const oldObjArr = [];
  const newObjArr = [];
  const clone = oldObj => {
    let newObj, proto;
    const type = getType(oldObj);

    switch (type) {
      case "boolean":
        return oldObj;
        break;
      case "number":
        return oldObj;
        break;
      case "string":
        return oldObj;
        break;
      case "null":
        return oldObj;
        break;
      case "undefined":
        return oldObj;
        break;
      case "function":
        return oldObj;
        break;
      case "symble":
        return Symble(Symbol.keyFor(oldObj).toString());
        break;
      case "array":
        newObj = [];
        break;
      case "regExp":
        newObj = new RegExp(oldObj.source, oldObj.flags);
        if (oldObj.lastIndex) {
          newObj.lastIndex = oldObj.lastIndex;
        }
        break;
      case "date":
        newObj = new Date(oldObj.getTime());
        break;
      default:
        proto = Object.getPrototypeOf(oldObj);
        newObj = Object.create(proto);
        break;
    }
    // 循环
    const index = oldObjArr.indexOf(oldObj);
    if (index != -1) {
      return newObjArr[index];
    }
    oldObjArr.push(oldObj);
    newObjArr.push(newObj);

    // 遍历数组和对象
    for (let i in oldObj) {
      newObj[i] = clone(oldObj[i]);
    }
    return newObj;
  };

  return clone(oldObj);
};


function person(pname) {
  this.name = pname;
}

const Messi = new person('Messi');

function say() {
  console.log('hi');
};

const oldObj = {
  a: say,
  b: [1,2],
  c: new RegExp('ab+c', 'i'),
  d: Messi
};

const newObj = deepClone(oldObj);

console.log(newObj.a, oldObj.a); //[Function: say] [Function: say]

oldObj.b[0] = 2
console.log(newObj.b[0], oldObj.b[0]); // undefined undefined

console.log(newObj.c, oldObj.c); // /ab+c/i /ab+c/i
console.log(newObj.d.constructor, oldObj.d.constructor); // [Function: person][Function: person]

















/**
 * 1 获取类型
 * 2 循环引用数组
 * 3 判断5种类型（symble, array, regExp, obj, date）
 * 4 循环处理
 * 5 遍历
 */

/**
 * Symble(Symbol.keyFor(oldObj).toString())
 * new RegExp(oldObj.source, oldObj.flags)
 * if (oldObj.lastIndex) newObj.lastIndex = oldObj.lastIndex;
 * new Date(oldObj.getTime());
 *
 */
