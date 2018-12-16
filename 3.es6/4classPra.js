class Animal {
    // es7写法
    // a = 1;=>this.a=1
    constructor(type) {
        this.type = type
    }
    eat() {
        console.log('animal');

    }
}
let t = new Animal('类型');
t.__proto__.eat();
Animal.prototype.eat();
console.log(t, t.constructor, t.type);

class Cat extends Animal {
    // cat自己上有没有私有的属性
    constructor(type) {
        super(type);
    }
}
let cat = new Cat('哺乳类');
// 实例上的静态属性
console.log(cat.type);
// 实例上的方法
cat.eat();

// 一个问题在父类加属性，在子类上可以得到，但在子类的实例上得不到（函数的双重性）
Animal.flag = '动物';
console.log(Cat.flag, cat.flag);
// 怎么实现两个类可以继承静态属性
function Parent() {

};
Parent.a = "父亲";
function Child() {

}
console.log(Parent);
Child.a = '孩子';
Child.__proto__ = Parent;
console.log(Child.a, Parent.a)//孩子，父亲  本身没有，就找所属类的原型找另一个对象

