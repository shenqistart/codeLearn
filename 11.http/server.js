let http = require('http');


let server = http.createServer();
// 创建服务后，回调的方式，当请求到来时才会执行此方法
// 会把请求过来的信息 socket = > req+res,分配好后触发一个request方法
server.on('request', function (req, res) {
  if(req.url === '/login'){ // 当前是登录  username="123"
  let arr = [];
  req.on('data',function (data) {
    arr.push(data);
  });
  req.on('end',function () {
    let str = Buffer.concat(arr).toString();
    let obj = require('querystring').parse(str);
    res.setHeader('Content-Type','application/json;charset=utf8');
    res.end(JSON.stringify(obj)); // string || buffer
  });
  // ajax请求 返回对应的结果 
  // 断点续传  防盗链  多语言 缓存 虚拟主机  koa  express
  }
}).listen(3000,function () {
  console.log('server start 3000');
});


// let reg = /([^=&]*)=([^=&]*)/g;
  // let obj = {}
  // // username=123&password=456
  // str.replace(reg,function () {
  //   obj[arguments[1]] = arguments[2];
  // });