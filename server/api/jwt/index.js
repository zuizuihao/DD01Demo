import jwt from 'jsonwebtoken'
import jwtKoa from 'koa-jwt'
const secret = 'secret';

const API = {
  acl() {
    return jwtKoa({ secret, debug: true }).unless({
      // 设置login、register接口，可以不需要认证访问
      path: [
        /^\/api\/v1\/user\/login/,
        /^\/api\/v1\/user\/register/,
        /^((?!\/api).)*$/   // 设置除了私有接口外的其它资源，可以不需要认证访问
      ]
    })
  },
  getToken(payload = {}) {
    return jwt.sign(payload, secret, { expiresIn: '4h' });
  },
  getJWTPayload(token) {
    return jwt.verify(token, secret)
  }
}

export default API