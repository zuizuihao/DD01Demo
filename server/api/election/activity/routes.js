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
  },
  async addCandidate(ctx) {
    let { activityId, realName } = ctx.request.body;
    if (!activityId) {
      throw new Error('选举活动不能为空')
    }
    if (!realName) {
      throw new Error('选举人名称不能为空')
    }

    await ElectionAPI.addCandidate(activityId, realName)

    ctx.body = { success: true, errCode: 0, errMsg: '添加选举人动成功' }
  },
  async removeCandidate(ctx) {
    let { activityId, realName } = ctx.request.body;
    if (!activityId) {
      throw new Error('选举活动不能为空')
    }
    if (!realName) {
      throw new Error('选举人名称不能为空')
    }

    await ElectionAPI.removeCandidate(activityId, realName)

    ctx.body = { success: true, errCode: 0, errMsg: '删除选举人动成功' }
  }
}

export default API