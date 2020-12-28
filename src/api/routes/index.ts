import { Router } from 'express'
import { ValidationResult, signupValidation, loginValidation } from '../middleware/auth'
import { signUp } from '../../core/siginup'
import { login } from '../../core/login'
import { refreshToken } from '../../core/refreshToken'
import { logout } from '../../core/logout'
import { verifyAccessToken } from '../../core/jwtAuth'

const routes = Router()
//to test protected route
routes.get('/protected', verifyAccessToken, async (req, res) => {
    res.send({
        "success": "ok😜",
        "user": req.user?.aud
    })
})

routes.post('/api/signup', signupValidation, ValidationResult, signUp)
routes.post('/api/login', loginValidation, ValidationResult, login)
routes.post('/api/ref/refreshToken', refreshToken)
routes.delete('/api/ref/logout', logout)

export default routes