// 历史：回调  setTimeout嵌套问题-》promise-》generator(redux-saga)->async-await

// 什么是函数
// 回调：高阶函数--函数当做参数，函数返回一个函数  
// 有一个函数可以接收一个函数，可以根据条件选择执行这个函数
// 偏函数（参数个数不定），函数柯里化（很长的参数变为多种函数的返回值）
// after lodash方法
// 函数柯里化
// function a(a, b, c) {

// };
// function a(a) {
//   return function b(b) {
//     return function c() {

//     }
//   }
// }
// 基础回调函数demo
// Array,forEach,filter,reduce
// function after(times,callback) {
//    return function () {
//       if(--times === 0){
//         callback();
//       }
//    }
// }
// let fn = after(3,function () {
//   console.log('fn 被调用了3次')
// });
// fn();
// fn();
// fn();

// 解决的内容
// 处理异步，多个异步请求同时执行，在某一个时间点，获取他们的结果
// a接口获取数据内容 姓名
// b接口获取数据内容 年龄

// 读一个文件 3s后才能获取结果

// function read(callback) {
//   setTimeout(() => {
//     let r = 'zfpx'
//     callback(r);
//   }, 3000);
// }
// read(function (result) {
//   console.log(result)
// });

// 文件读取
let fs = require('fs'); // fileSystem
// readFile 第一个参数是路径 如果用coderunner 目录指向的都是当前运行的根目录 , 编码 回调（err 所有的异步方法都需要捕获错误 但是不能try catch）
fs.readFile('./name.txt', 'utf8', function (err, data) {
  console.log(data, '123');
});