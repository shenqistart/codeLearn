// es6的类
class Animal {
  // 在静态类中
  static flag() {
    return '好玩'
  }
  constructor(type) {
    this.type = type;
    return { a: 1 }
  }
  eat() {
    console.log(this);
  }
}
class Cat extends Animal { // 里面内置了call 也实现了继承公有属性 
  constructor(type) {
    super(type); // Animal.call(this,type);
  }
}
// 静态方法子类是可以继承的
let cat = new Cat('哺乳类');
let animal = new Animal('哺乳类');
console.log(cat.type, animal.type);

// console.log(cat);