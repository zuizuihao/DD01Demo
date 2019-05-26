import ElectionAPI from './index'

const API = {
  async add(ctx) {
    let { name, startTime, endTime } = ctx.request.body;
    if (!name) {
      throw new Error('选举名称不能为空')
    }
    if (!startTime) {
      throw new Error('选举开始时间不能为空')
    }
    startTime = new Date(startTime)
    if (!endTime) {
      throw new Error('选举结束时间不能为空')
    }
    endTime = new Date(endTime)

    await ElectionAPI.add(name, startTime, endTime)

    ctx.body = { success: true, errCode: 0, errMsg: '添加选举活动成功' }
  }
}

export default API