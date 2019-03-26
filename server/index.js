const Koa = require('koa')
const app = new Koa()
const router = require('./router')
const config = require('./config/config')
const cors = require('koa2-cors')
const path = require('path')
const staticServe = require('koa-static')
const views = require('koa-views')
const mongoose = require('mongoose')
const {connect, initSchemas}= require('./database/init');
const bodyParser = require('koa-bodyparser');
(async ()=>{
  await connect()
  await initSchemas()
})()
const handler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      message: err.message
    };
  }
};

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods()).use(cors({
  origin: function (ctx) {
    return '*';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
})).use(async (ctx, next) =>{
  ctx.set("Access-Control-Allow-Origin", "*");
  next()
}).use(handler)
// app.use(staticServe(path.resolve('dist')));

app.listen(config);
