const API = {
  async findById(activityId) {
    return await ElectionActivitys.findOne({ _id: activityId }).lean()
  },
  async add(name, startTime, endTime) {
    let doc = await ElectionActivitys.create({ name, startTime, endTime })
    return doc.toObject()
  },
  async addCandidate(activityId, realName) {
    let activity = await API.findById(activityId)
    if (new Date().getTime() > activity.startTime.getTime()) {
      throw new Error('选举的已开始，无法修改候选人')
    }
    await ElectionActivitys.updateOne({ _id: activityId }, { $addToSet: { 'candidateList': { realName } } })
  },
  async removeCandidate(activityId, realName) {
    let activity = await API.findById(activityId)
    if (new Date().getTime() > activity.startTime.getTime()) {
      throw new Error('选举的已开始，无法修改候选人')
    }
    await ElectionActivitys.updateOne({ _id: activityId }, { $pull: { candidateList: { $elemMatch: { realName } } } })
  }
}

export default API