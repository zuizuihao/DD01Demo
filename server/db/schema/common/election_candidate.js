import { Schema } from 'mongoose'

export default new Schema({
  _id: String,
  realName: {
    type: String,
    alias: '候选人名称',
    required: false
  }
})