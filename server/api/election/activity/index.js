const API = {
  async add(name, startTime, endTime) {
    let doc = await ElectionActivitys.create({ name, startTime, endTime })
    return doc.toObject()
  },
  async addCandidate(activityId, realName) {
    await ElectionActivitys.updateOne({ _id: activityId }, { $addToSet: { 'candidateList': { realName } } })
  },
  async deleteCandidate(activityId, realName) {
    await ElectionActivitys.updateOne({ _id: activityId }, { $pull: { candidateList: { $elemMatch: { realName } } } })
  }
}

export default API