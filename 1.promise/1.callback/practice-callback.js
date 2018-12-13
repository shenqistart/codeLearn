// 有一个函数可以接收一个函数，可以根据条件选择执行这个函数
function after(time,callback) {
    return function(){
        if(--time===0){
            callback();
        }
    }
}
let fn=after(3,function(){
    console.log('调用三次的输出结果');
})
// 执行但是传递了参数
// after(3,function(){
//     console.log('调用三次的输出结果');
// })
// 纯执行的办法
fn();
fn();
fn();



// 只要有node就可以require
let fs = require('fs');
// 回调函数的核心就是在条件满足的时候，开始那个回调函数
fs.readFile('./1.txt','utf8',function(err,data){
    console.log(data);
    
})