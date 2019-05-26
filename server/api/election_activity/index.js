const API = {
  async add(name, startTime, endTime) {
    let doc = await ElectionActivitys.create({ name, startTime, endTime })
    return doc.toObject()
  }
}

export default API