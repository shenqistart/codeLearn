// 解构赋值 解构相等的内容 可以直接拿出来
// 即声明又赋值
// 解构时可以赋予默认值
// 用法：参数的校验，得到结果的取值
Promise.all([1, 2, 3, 4]).then(function ([, , a, , b = 'hello']) {
  console.log(a, b);
})
let [, , a, , b = 'hello'] = [1, 2, 3, 4];

// 对象的解构
// =号是赋予默认值 :就是起别名
let { length: Len } = { length: 3 };
console.log(Len);
// 数组加对象
let [{ a }, , c] = [{ a: 1 }, { b: 1 }, { c: 1 }];
console.log(a, c);
let [{ name }] = [{ name: 'wy' }];
console.log(name);


