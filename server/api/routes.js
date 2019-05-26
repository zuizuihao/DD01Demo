import Router from 'koa-router';
import User from './user/routes'

const router = new Router()
router.post('/api/v1/user/register', User.registerWithEmail)
router.post('/api/v1/user/login', User.loginWithEmail)
router.get('/api/v1/user/validateEmail', User.validateEmail)

export default router