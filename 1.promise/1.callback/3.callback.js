let fs = require('fs');
// 发布订阅 先把需要订阅的内容保存到队列里，当发布时让数组中的函数依次执行即可
let school = {}
// 这里可以用this来表示
let Dep = {
  arr: [],
  on(fn) {
    this.arr.push(fn);
  },
  emit() {
    if (Object.keys(school).length === 3) {
      this.arr.forEach(function (fn) {
        fn();
      })
    }
  }
};
// let Dep = {
//   arr:[],
//   on(fn){
//     Dep.arr.push(fn);
//   },
//   emit(){
//     if(Object.keys(school).length === 3){
//       Dep.arr.forEach(function (fn) {
//         fn();
//       })
//     }
//   }
// };
// 观察者模式基于发布订阅 vue 观察者模式
Dep.on(function () {
  console.log(school);
});
Dep.on(function () {
  console.log('代码执行结束了');
});


fs.readFile('./name.txt', 'utf8', function (err, data) {
  school.name = data;
  Dep.emit();
})
fs.readFile('./age.txt', 'utf8', function (err, data) {
  school.age = data;
  Dep.emit();
});
fs.readFile('./address.txt', 'utf8', function (err, data) {
  school.address = data;
  Dep.emit();
});

// 观察者模式 被观察者是依赖于观察者的
class Observer {
  constructor() {
    this.arr = [];
    this.val = 1;//等待这个值更新的时候，触发被观察者的更新方法
  }
  updataVal() {
    this.val = 100;
  }
  save(s) {
    this.arr.push(s);
  }
}
// 被观察者模式，有一个更新防范，由观察者来调用
class Subject {
  update() {
    console.log(update);

  }
}
// 一个个小的被观察者
let s = new Subject();
let observer = new Observer();
observer.save(s);//发布
observer.save(s);
observer.updataVal();//订阅