import { Schema } from 'mongoose'

export default new Schema({
  _id: String,
  username: {
    type: String,
    alias: '用户名',
    required: false
  }
})