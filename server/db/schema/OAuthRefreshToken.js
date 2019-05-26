import mongoose, { Schema } from 'mongoose'

const OAuthRefreshTokenSchema = new Schema({
  _id: String,
  refreshToken: String,
  refreshTokenExpiresAt: Date,
  scope: String,
  user: Object,
  client: Object
})

OAuthRefreshTokenSchema.pre('save', function (next) {
  this._id = mongoose.Types.ObjectId().toString()
  next()
})

export default OAuthRefreshTokenSchema