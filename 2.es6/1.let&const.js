// let 和const 新定义的 声明变量的方式

// 1.var 会有变量提升的问题 let不能重复声明
// 2.let 不会污染全局作用域 var在以前是没有作用域的概念的
// 全局作用域 函数作用域,作用域会有绑定的特点 (暂存死区)
// let a = 2
// {
//   console.log(a)
//   let a = 1
// }
// 不希望全局中a的值被替换
// var a =1;
// var a=2;
// console.log(a);
// 依然会记录这些值
for (let i = 0; i < 100; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1);
}
// 全是100
for (var i = 0; i < 100; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1);
}
// 常量 不能更改的量,不能更改值的引用地址
const a = { a: 1 };
console.log(a, a);
a.a = 100;
console.log(a, a);
// let a = 2
// {
//   console.log(a)
//   let a = 1
// }
// console.log(a);
var a = 2;
{
  var a = 1;
}
console.log(a);//1

// 如果这个变量不想被别人更改那就应该用const 