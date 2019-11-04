const Koa = require('koa');
const serve = require('koa-static-server');
// const proxy = require('koa-proxies');
const address = require('address');

// 前端服务端口
const serverPort = process.argv.slice(2)[0] || 3000;
// 页面访问目录
const outPath = 'mobile';

const app = new Koa();

app.use(serve({
  rootDir: outPath,
  rootPath: `/${outPath}`
}));

app.listen(serverPort);

console.log(`server listening on: http://${address.ip()}:${serverPort}/${outPath}`);
