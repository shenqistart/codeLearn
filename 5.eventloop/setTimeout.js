// setTimeout(() => {
//   console.log(0);
// }, 0);

// promise中的then是异步的但是用的不是setTimout
// Promise.resolve().then(()=>{
//   console.log('1');
// })
// Promise.resolve().then(() => {
//   console.log('3');
// })
// then方法会比setTimeout等级更高一些
// 浏览器的事件环 微任务会优先执行
// then方法 微任务
// setTimeout 宏任务

setTimeout(() => {
  console.log('out2');
  Promise.resolve().then(()=>{
    console.log('then2');
  })
}, 0);
Promise.resolve().then(()=>{
  console.log('then1');
  setTimeout(() => {
    console.log('out1')
  }, 0);
});
// 默认先调用主栈 主栈执行完后 清空微任务，在取出宏任务队列中的第一个执行，并且执行完后再次清空微任务，再取第二个 环

// vue nextTick