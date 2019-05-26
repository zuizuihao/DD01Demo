import mongoose, { Schema } from 'mongoose'

const OAuthAuthorizationCodeSchema = new Schema({
  _id: String,
  code: String,
  expiresAt: Date,
  redirectUri: String,
  scope: String,
  user: Object,
  client: Object
})

OAuthAuthorizationCodeSchema.pre('save', function (next) {
  this._id = mongoose.Types.ObjectId().toString()
  next()
})

export default OAuthAuthorizationCodeSchema
