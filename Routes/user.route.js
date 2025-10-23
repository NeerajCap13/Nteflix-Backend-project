import express from 'express'
import { registerUser } from '../controllers/register.controller.js'
import { loginUser } from '../controllers/login.controller.js'
import { Subscription } from '../controllers/subscribe.controller.js'
import { verifyToken } from '../Middleware/authToken.js'
import { clearCookie } from '../Middleware/clearToken.js'
import { getProfile } from '../controllers/profile.controller.js'

const router = express.Router()

router.post('/register',registerUser)

router.post('/login',loginUser)

router.post('/subscribe',Subscription)

router.get('/profile', verifyToken ,getProfile)

router.post('/logout',clearCookie)

export default router
