let http = require('http');
let fs = require('fs');
let path = require('path');
let url = require('url');
let util = require('util');
let mime = require('mime');

let stat = util.promisify(fs.stat);
let access = util.promisify(fs.access);
let server = http.createServer(async function (req,res) {
  let {pathname} = url.parse(req.url);
  let realPath = path.join(__dirname,pathname);
  if(pathname === '/login'){
    return res.end('/login');
  }
  try{
    let statObj = await stat(realPath);
    if (statObj.isDirectory()) {
      realPath = path.join(realPath, 'index.html');
      await access(r);
    } 
    res.setHeader('Content-Type', mime.getType(realPath) + ';charset=utf8');
    fs.createReadStream(realPath).pipe(res);
  }catch(e){
    res.statusCode = 404;
    res.end('Not Found');
  }
});
server.listen(3000,function () {
  console.log('server start 3000');
})