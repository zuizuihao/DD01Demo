import mongoose, { Schema } from 'mongoose'
import CandidateSchema from '../common/election_candidate'

const ElectionActivitySchema = new Schema({
  _id: String,
  name: {
    type: String,
    alias: '选举活动名称',
    required: false
  },
  startTime: {
    type: Date,
    alias: '开始时间',
    required: false
  },
  endTime: {
    type: Date,
    alias: '结束时间',
    required: false
  },
  candidateList: {
    type: [CandidateSchema],
    alias: '候选人列表',
    required: false
  },
},
  {
    versionKey: false,
    timestamps: true
  });

ElectionActivitySchema.pre('save', function (next) {
  this._id = mongoose.Types.ObjectId().toString();
  next()
})

export default ElectionActivitySchema