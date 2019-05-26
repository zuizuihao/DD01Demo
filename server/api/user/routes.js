import Common from '../common/index'
import JWTAPI from '../jwt/index'
import bcrypt from 'bcryptjs'
const saltRounds = 10

const API = {
  async registerWithEmail(ctx) {
    const { email, password } = ctx.request.body;
    if (!Common.validateEmail(email)) {
      throw new Error('邮箱地址格式不正确')
    }
    let user = await Users.findOne({ username: email })
    if (user) {
      throw new Error('该用户地址已注册')
    }
    var bcryptHash = bcrypt.hashSync(password, saltRounds)
    await Users.create({ username: email, email, isEmailValid: false, bcryptHash })
    //发送验证邮箱
    
    ctx.body = { success: true, errCode: 0, errMsg: '注册成功' }
  },
  async loginWithEmail(ctx) {
    const { email, password } = ctx.request.body;
    const user = await Users.findOne({ username: email }).lean()
    if (!user) {
      throw new Error('该邮箱地址未注册')
    }
    const { bcryptHash } = user
    let isMatch = await bcrypt.compare(password, bcryptHash)
    if (!isMatch) {
      throw new Error('密码不正确')
    }
    //用户登录，生成token
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