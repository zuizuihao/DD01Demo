import 'babel-polyfill'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import JWT from './api/jwt/index'
import email from './api/email/index'
import APIRoutes from './api/routes.js'
import DB from './db'

//初始化数据库
DB.init('mongodb://127.0.0.1:27017/DD01Demo')

//初始化 koa 服务
const app = new Koa()

const website = {
  scheme: 'http',
  host: 'localhost',
  port: 9000,
  join: function () {
    return `${this.scheme}://${this.host}:${this.port}`
  }
}

/* 查询字符串解析到`ctx.request.query` */
app.use(bodyParser())
app.use(async (ctx, next) => {
  try {
    const start = Date.now()
    await next()
    console.log(`${ctx.request.method} ${ctx.request.originalUrl} ${Date.now() - start}ms`)
  } catch (err) {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        ok: false,
        msg: err.originalError ? err.originalError.message : err.message
      }
    } else {
      let errMsg = typeof err == 'object' ? err.message : err
      ctx.body = { success: false, errCode: err.code, errMsg }
    }
  }
})

/* 路由权限控制 */
app.use(JWT.acl());

/** 路由 */
app.use(APIRoutes.routes())

email.init()

/* 监听服务器端口 */
app.listen(website.port, () => {
  console.log(`${website.join()} 服务器已经启动！`);
});