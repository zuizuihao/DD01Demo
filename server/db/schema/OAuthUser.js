import mongoose, { Schema } from 'mongoose'

const OAuthUserSchema = new Schema({
  _id: String,
  username: String,
  password: String,
  scope: String
});

OAuthUserSchema.pre('save', function (next) {
  this._id = mongoose.Types.ObjectId().toString();
  console.log(this._id)
  next()
})

export default OAuthUserSchema