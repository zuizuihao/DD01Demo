import mongoose, { Schema } from 'mongoose'

const UserSchema = new Schema({
  _id: String,
  username: {
    type: String,
    alias: '用户名',
    required: false
  },
  token: {
    type: String,
    alias: '用户token',
    required: false
  },
  email: {
    type: String,
    alias: '邮箱地址',
    required: false
  },
  bcryptHash: {
    type: String,
    alias: '密码加密',
    required: false
  },
  isEmailValid: {
    type: Boolean,
    alias: '邮箱是否有效',
    required: false
  },
  emailValidcode: {
    type: String,
    alias: '邮箱激活码',
    required: false
  }
},
  {
    versionKey: false,
    timestamps: true
  });

UserSchema.pre('save', function (next) {
  this._id = mongoose.Types.ObjectId().toString();
  next()
})

export default UserSchema