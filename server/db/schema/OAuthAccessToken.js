import mongoose, { Schema } from 'mongoose'

const OAuthAccessTokenSchema = new Schema({
  _id: String,
  accessToken: String,
  accessTokenExpiresAt: Date,
  scope: String,
  user: Object,
  client: Object
})

OAuthAccessTokenSchema.pre('save', function (next) {
  this._id = mongoose.Types.ObjectId().toString()
  next()
})

export default OAuthAccessTokenSchema