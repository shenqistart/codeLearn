let fs = require('fs');
// promise解决的需求问题先读取.txt的值，拿到data再读取data中的值
// 异步回调嵌套的问题 会导致代码难以维护，而且不方便处理错误
// fs.readFile('./name.txt','utf8',function (err,data) {
//   fs.readFile(data,'utf8',function (err,data) {

//   })
// })


// 发布订阅模式

// 多个异步同时执行，再某一个时刻拿到最终的结果
let school = {};
// 哨兵函数
// function out() {
//   if (Object.keys(school).length === 3){
//     console.log(school);
//   }
// }
// 计数的回调函数，高阶函数，
// 定义在多少的时候执行这个对列，一起输出
function after(times, callback) {
  // 返回的函数就是out这一层
  return function () {
    if (--times === 0) {
      callback(school);
    }
  }
}
// 调用先写这里面的内容（先写目标，再写之后的实现）
let out = after(3, function (data) {
  console.log(data);
});
fs.readFile('./name.txt', 'utf8', function (err, data) {
  school.name = data;
  out();
})
fs.readFile('./age.txt', 'utf8', function (err, data) {
  school.age = data;
  out();
});
fs.readFile('./address.txt', 'utf8', function (err, data) {
  school.address = data;
  out();
});

// 发布订阅模式