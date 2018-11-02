let EventEmitter = require('events');
let fs = require('fs');
class WriteStream extends EventEmitter{
  constructor(path,options={}){
    super();
    this.path = path;
    this.flags = options.flags || 'w';
    this.encoding = options.encoding || 'utf8';
    this.autoClose = options.autoClose || true;
    this.highWaterMark = options.highWaterMark|| 16*1024;
    this.start = options.start || 0;

    // 如果多从调用write方法 我需要将 其他的放到队列中
    this.cache = [];
    // 当前是否需要触发这个drain事件
    this.needDrain = false;
    // 记录一下写入的个数
    this.len = 0;
    // 维护一个写入的位置
    this.pos = this.start;
    // 标识用户是否正在写入
    this.writing = false;
    // 打开文件 等待用户调用write方法
    this.open(); 
  }
  open(){
    fs.open(this.path,this.flags,(err,fd)=>{
      if(err){
        return this.emit('error',err);
      }
      this.fd = fd;
      this.emit('open',fd);
    })
  }
  write(chunk,encoding=this.encoding,callback){
    this.len += Buffer.isBuffer(chunk)?chunk.length:Buffer.from(chunk).length;
    let flag  = this.len >= this.highWaterMark;
    if(flag){ // 已经超过预期 需要触发drain事件
      this.needDrain = true;
    }
    if(typeof this.fd !=='number'){
      return this.once('open',()=>this.write());
    }
    // 用户调用write方法第一次是真的往里写 之后都要存起来
    if(this.writing){
      this.cache.push({
        chunk,
        encoding,
        callback
      });
    }else{
      // 真正的把内容写入到文件里
      this.writing = true;
      // 当第一个内容 写入完成后 调用此回调清空数组中的方法
      this._write(chunk,encoding,()=>this.clearBuffer()); // 实现这个方法
      // 每次写入后 需要把写入的个数减少
    }
    return !flag
  }
}
// http 