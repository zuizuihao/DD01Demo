import UserAPI from './index'
import JWTAPI from '../jwt/index'

const API = {
  async registerWithEmail(ctx) {
    const { email, password } = ctx.request.body;
    await UserAPI.register(email, password)

    ctx.body = { success: true, errCode: 0, errMsg: '注册成功' }
  },
  async loginWithEmail(ctx) {
    const { email, password } = ctx.request.body;
    let token = await UserAPI.loginWithEmail(email, password)

    ctx.body = { success: true, errCode: 0, errMsg: '登录成功', data: { token } }
  },
  async validateEmail(ctx) {
    const { code } = ctx.request.query
    await UserAPI.validateEmail(code)
    ctx.body = '验证邮箱成功'
  }
}

export default API