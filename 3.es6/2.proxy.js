// proxy代理
// 将对象进行代理，加上特定功能
// Reflect 反射

// 双向绑定 数据变化可以更新视图
let obj = { name: { name: proxy } };
// Object.defineProperty不支持数组的
// 可以监控到数组的变化
let p = new Proxy(obj, {
  get(target, key) { // 第三个属性叫代理的对象一般不用
    // toString() valueOf()
    return Reflect.get(target, key);
    // return target[key]
  },
  set(target, key, value) {
    // 放数组的两步，添加和变长度，这个是为了节省开支
    if (key === 'length') return true
    return Reflect.set(target, key, value);
  }
});
p.name = 'hello'; // 可以不用必须保证属性的存在
