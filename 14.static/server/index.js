// 主要的逻辑
let http = require('http');
let url = require('url');
let path = require('path');
let fs = require('mz/fs');
// 第三方的模块
let mime = require('mime');
let ejs = require('ejs'); // ejs jade handlebar
let chalk = require('chalk'); // 粉笔
let debug = require('debug')('dev');// DEBUG
class Server {
  constructor(config) {
    this.config = config;
  }
  async handleRequest(req, res) {
    let { dir } = this.config;
    let { pathname } = url.parse(req.url);
    let realPath = path.join(dir, pathname);
    try {
      let statObj = await fs.stat(realPath);
      // 启动服务后默认把当前文件夹的内容 展现给用户
      // 先看当前访问的路径是不是个文件夹，如果是文件夹找index.html
      // 没有index.html 返回读取目录的结果，
      // 如果是文件直接显示即可
      if(statObj.isDirectory()){

      }else{ // 如果是文件直接发送即可
        this.sendFile(req, res, statObj, realPath);
      }
    } catch (e) {
      this.sendError(req,res,e);
    }
  }
  sendFile(req,res,statObj,realPath){
    res.setHeader('Content-Type', mime.getType(realPath)+';charset=utf8');
    fs.createReadStream(realPath).pipe(res);
  }
  sendError(req,res,e){
    debug(JSON.stringify(e));
    res.statusCode = 404;
    res.end(`Not Found`);
  }
  start() {
    // 就是开启一个服务
    let server = http.createServer(this.handleRequest.bind(this));
    let { port, host } = this.config;
    server.listen(port, host, () => {
      debug(`http://${host}:${chalk.red(port)} server start`);
    });
  }
}
module.exports = Server