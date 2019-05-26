import mongoose, { Schema } from 'mongoose'

const OAuthClientSchema = new Schema({
  _id: String,
  name: String,
  clientId: String,
  clientSecret: String,
  redirectUris: [String],
  grants: {
    type: [String],
    default: ['authorization_code', 'password', 'refresh_token', 'client_credentials']
  },
  scope: String,
  user: Object
})

OAuthClientSchema.pre('save', function (next) {
  this._id = mongoose.Types.ObjectId().toString()
  console.log(this._id)
  next()
})

export default OAuthClientSchema
