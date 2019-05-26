import JWTAPI from '../jwt/index'

const API = {
  async register(ctx) {
    const { email, password } = ctx.request.body;
    //注册用户，生成token
    let token = JWTAPI.getToken({ email, password })
    ctx.body = { success: true, errCode: 0, errMsg: '注册成功', data: { token } }
  },
  async login(ctx) {
    const { email, password } = ctx.request.body;
    //用户登录，获取旧的token
    let token = JWTAPI.getToken({ email, password })
    ctx.body = { success: true, errCode: 0, errMsg: '登录成功', data: { token } }
  },
  async sendValidateEmail(ctx) {
    
  },
  async validateEmail(ctx) {
    const { authorization } = ctx.headers
    let token = authorization.split(' ')[1]
    console.log(token)
    let payload = JWTAPI.getJWTPayload(token)
    console.log(payload)
    ctx.body = { success: true, errCode: 0, errMsg: '验证邮箱成功', data: { payload } }
  },
  async vote(ctx) {

  }
}

export default API