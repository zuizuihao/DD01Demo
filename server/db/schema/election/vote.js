import mongoose, { Schema } from 'mongoose'
import ActivitySchema from '../common/election_activity'
import CandidateSchema from '../common/election_candidate'
import UserSchema from '../common/user'

const ElectionVoteSchema = new Schema({
  _id: String,
  user: {
    type: UserSchema,
    alias: '用户',
    required: false
  },
  activity: {
    type: ActivitySchema,
    alias: '选举活动',
    required: false
  },
  candidateList: {
    type: [CandidateSchema],
    alias: '选中候选人',
    required: false
  },
},
  {
    versionKey: false,
    timestamps: true
  });

ElectionVoteSchema.pre('save', function (next) {
  this._id = mongoose.Types.ObjectId().toString();
  next()
})

export default ElectionVoteSchema