import Common from '../common/index'
import EmailAPI from '../email/index'
import bcrypt from 'bcryptjs'
import shortid from 'shortid'
const saltRounds = 10

const API = {
  async register(email, password) {
    if (!Common.validateEmail(email)) {
      throw new Error('邮箱地址格式不正确')
    }
    let user = await Users.findOne({ username: email })
    if (user) {
      throw new Error('该用户地址已注册')
    }
    var bcryptHash = bcrypt.hashSync(password, saltRounds)
    //发送验证邮箱
    let emailValidcode = shortid.generate()
    await Users.create({ username: email, email, emailValidcode, isEmailValid: false, bcryptHash })
    var mailObj = {
      // 发件人
      from: '1165622982@qq.com',
      // 主题
      subject: '激活账号',
      // 收件人
      to: email, //发送给注册时填写的邮箱
      // 邮件内容，HTML格式
      html: `<a href="http://localhost:9000/api/v1/user/validateEmail?code=${emailValidcode}">点击激活</a>`
    }
    await EmailAPI.send(mailObj)

  },
  async loginWithEmail(email, password) {
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
    return token
  },
  async validateEmail(code) {
    const user = await Users.findOne({ emailValidcode: code }).lean()
    if (!user) {
      throw new Error('邮箱验证码不存在')
    }
    await Users.update({ _id: user._id }, { $set: { isEmailValid: true } })
  }
}

export default API