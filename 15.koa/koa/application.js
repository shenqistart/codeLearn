let EventEmitter = require('events');
let http = require('http');
let context = require('./context');
let request = require('./request');
let response = require('./response');
class Application extends EventEmitter{
  constructor(){
    super();
    this.middleware = [];
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
  }
  createContext(req,res){
    let ctx = this.context;
    ctx.request = this.request; // 是koa内部自己封装的
    ctx.response = this.response;
    ctx.req = ctx.request.req = req; // ctx.req res是默认的请求和响应
    ctx.res = ctx.response.res = res;
    return ctx;
  }
  // 处理当前的请求的方法
  handleRequest(req,res){
    // 先要创建一个context对象
    let ctx = this.createContext(req,res);
    // 要把所有的中间件进行组合
    this.middleware[0](ctx);
  }
  // 中间件方法 用来收集中间件的
  use(callback){
    this.middleware.push(callback);
  }
  // 创建服务并监听端口号
  listen(...args){
    let server = http.createServer(this.handleRequest.bind(this));
    server.listen(...args);
  }
}
module.exports = Application