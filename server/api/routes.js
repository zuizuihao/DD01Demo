import Router from 'koa-router';
import User from './user/routes'
import ElectionActivity from './election/activity/routes'

const router = new Router()
router.post('/api/v1/user/register', User.registerWithEmail)
router.post('/api/v1/user/login', User.loginWithEmail)
router.get('/api/v1/user/validateEmail', User.validateEmail)


router.post('/api/v1/election/activity/add', ElectionActivity.add)
router.post('/api/v1/election/activity/addCandidate', ElectionActivity.addCandidate)
router.post('/api/v1/election/activity/addCandidate', ElectionActivity.addCandidate)

export default router