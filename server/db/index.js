const mongoose = require('mongoose');
import { UserSchema, ElectionActivitySchema, ElectionVoteSchema } from './schema'
global.Users = mongoose.model('Users', UserSchema, 'Users')
global.ElectionActivitys = mongoose.model('ElectionActivitys', ElectionActivitySchema, 'ElectionActivitys')
global.ElectionVotes = mongoose.model('ElectionVotes', ElectionVoteSchema, 'ElectionVotes')

export default {
  init(mongoDBUrl) {
    const options = {
      autoIndex: false, // Don't build indexes
      reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
      reconnectInterval: 500, // Reconnect every 500ms
      poolSize: 10, // Maintain up to 10 socket connections
      // If not connected, return errors immediately rather than waiting for reconnect
      bufferMaxEntries: 0,
      useNewUrlParser: true
    }
    mongoose.connect(mongoDBUrl, options).then(() => {
      console.log('mongodb connect success')
    }, err => {
      console.log('mongodb connect error', err)
    });
    mongoose.connection.on('error', err => {
      console.log('mongodb connection error', err)
    })
  }
}