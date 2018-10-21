// 在浏览器中默认 this指代的是window
// 在浏览器中window 是代理了 global属性
// 在文件中允许默认这个this不是global,在node环境中this就是global
// REPL read  evaluate print loop
// 模块化 seajs requirejs 闭包
// 在文件中this指向是被更改的指向module.exports 
// process
// Buffer 操作文件 2进制 （16进制 内存） 可以和字符串进行转化
// clearImmediate setImmediate
// clearInterval setInterval
// setTimeout clearTimeout

// 都是可以直接不通过global.xxx来调用的
// 全局的属性 
// console.log('log');
// console.info('info');
// process.stdout.write('呵呵'); // 1 标准输出
// console.warn('warn');
// console.error('error');
// process.stderr.write('错误'); // 2.错误输出
// process.stdin.on('data',function (data) {
//   console.log(data.toString()); // 0 表示的是标准输入
// });

// process里都有什么
console.log(process.pid);
// process.exit();

// 可以用来后续启动项目时直到用户在哪个目录下启动的
// console.log(process.cwd()) // current Working directory
// process.chdir('6.node');
// console.log(process.cwd());
// 微任务
// 宏任务 MessageChannel  setImmediate  setTimeout
// 微任务 nextTick > then  MutationObserver
// Promise.resolve().then(() => console.log('then'))
// process.nextTick(()=>{
//   console.log('nextTick');
// });

// setTimeout(() => { // 执行过程花费了1ms
//   console.log('out2');
//   Promise.resolve().then(() => { // 在微任务队列中又放入了一个
//     console.log('then2');
//   }) 
// }, 0); // 定义器式4ms后把回调放到了队列中
// Promise.resolve().then(() => { // 2ms
//   console.log('then1');
//   setTimeout(() => { // 在等待4ms
//     console.log('out1')
//   }, 0);
// });
// node里也有一个事件环，每次都把队列清空后 或者达到执行的最大限制切换到下一个队列中会在执行微任务


// setImmediate(function () {
//   console.log('setImmediate1')
// })
// setImmediate(function () {
//   console.log('setImmediate2')
// })
// setTimeout(function () {
//   console.log('timeout')
// }, 0);



let fs = require('fs');
// poll 阶段下一个阶段是check 所以执行的话一定走的是setImmidaite
fs.readFile('note.md','utf8',function () {
  setTimeout(function () {
    console.log('timeout')
  }, 0);
  setImmediate(function () {
    console.log('setImmediate2')
  })
});
// 在node中一般处理异步我们可以使用nextTick,微任务不能递归否则会卡死
class P {
  constructor(){
    this.arr = [];
    process.nextTick(()=>{
      this.arr.forEach(fn=>fn());
    })
  }
  then(fn){
    this.arr.push(fn);
  }
}
let p = new P();
p.then(() => {
  console.log('then1');
});
p.then(() => {
  console.log('then1');
});
p.then(()=>{
  console.log('then1');
});
