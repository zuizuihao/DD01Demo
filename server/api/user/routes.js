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
  },
  async vote(ctx) {
    const { authorization } = ctx.headers
    const { activityId, candidateList } = ctx.request.body
    if(!activityId) {
      throw new Error('选举活动不能为空')
    }
    if(!candidateList) {
      throw new Error('选中候选人列表不能为空')
    }
    let user = await UserAPI.findByToken(authorization.split(' ')[1])
    await UserAPI.vote(user, activityId, candidateList)
    ctx.body = { success: true, errCode: 0, errMsg: '投票成功' }
  }
}

export default API