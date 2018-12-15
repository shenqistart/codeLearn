let obj = { name: 'zfpx', age: 9 };
let obj1 = { address: '回龙观' }
let school = { ...obj, ...obj1 };
// 拷贝 合并  $.extend 对两个对象合并
console.log(school);
// 浅拷贝
let arr1 = [1, 2, 3, [1, 2, 3]];
let arr2 = [1, 2, 3];
let arr = [...arr1, ...arr2];
console.log(arr);
// 在这里，你依然可以改arr1这个数组的内容,所以是浅拷贝
arr1[3][0] = 100;
console.log(arr1, arr);

// 这种拷贝是几层 浅拷贝 深拷贝(这样展开也是浅拷贝的一种)
let obj = { name: { schoolName: 'zfpx' }, a: 1 };
let newObj = { ...obj, name: { ...obj.name } };
newObj.name.schoolName = 'wy';
console.log(newObj);

// 深拷贝的第一种方法（这里的问题是reg：new RegExp(/\d/))这里转不出来
let obj = { name: { schoolName: 'zfpx' }, a: 1, reg: undefined };
let newObj = JSON.parse(JSON.stringify(obj));
console.log(newObj)

// 如何实现一个深度拷贝 递归拷贝
let obj = { a: 1 }
function deepClone(obj) {
  if (obj === null) return null;
  if (typeof obj != 'object') return obj; // 函数拷贝不需要管
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Date) return new Date(obj);
  let newObj = new obj.constructor;// 对象的构造函数就是构造他的函数
  // 这样判断是对象还是数组
  // let newObj = Object.prototype.toString.call(obj) === '[object Array]' ? [] || {}
  for (let key in obj) {
    // 递归出来4
    console.log(newObj);

    newObj[key] = deepClone(obj[key]);
  }
  return newObj
}
let newReg = deepClone(obj);
console.log(newReg);

let obj = { name: 'zfpx', age: 9 };
let obj1 = { address: '回龙观' }
//Object.assign es6  对象的展开是es7
let o = {}
Object.assign(o, obj, obj1);
console.log(o);

// 数组的展开 es6 拼接数组
let arr1 = [1, 2];
let arr2 = [3, 4];
console.log([...arr1, ...arr2])// 语法树 es6->es5 
// Math.max.apply(Math, arr1)
console.log(Math.max(...arr1));






// 剩余运算符 只能放在函数的最后一个参数
function sum(a, ...arg) {
  return eval(arg.join('+'));
  // Array.prototype.slice.call(arguments,2)
  // Array.from(arguments).slice(2);将类数组转化为数组
  // [...arguments].slice(2)
}
let r = sum(1, 2, 3, 4, 5);
console.log(r);

// Object.defineProperty

// 写promise es6版本的 传到github上
