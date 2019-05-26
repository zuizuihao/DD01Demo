import { Schema } from 'mongoose'

export default new Schema({
  _id: String,
  name: {
    type: String,
    alias: '选举活动名称',
    required: false
  }
})