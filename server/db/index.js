const mongoose = require('mongoose');
import { OAuthAccessTokenSchema, OAuthAuthorizationCodeSchema, OAuthClientSchema, OAuthRefreshTokenSchema, OAuthUserSchema } from './schema'
global.OAuthAccessToken = mongoose.model('OAuthAccessToken', OAuthAccessTokenSchema, 'OAuthAccessToken')
global.OAuthAuthorizationCode = mongoose.model('OAuthAuthorizationCode', OAuthAuthorizationCodeSchema, 'OAuthAuthorizationCode')
global.OAuthClient = mongoose.model('OAuthClient', OAuthClientSchema, 'OAuthClient')
global.OAuthRefreshToken = mongoose.model('OAuthRefreshToken', OAuthRefreshTokenSchema, 'OAuthRefreshToken')
global.OAuthUser = mongoose.model('OAuthUser', OAuthUserSchema, 'OAuthUser')

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