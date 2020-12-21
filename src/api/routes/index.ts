import { Router } from 'express'
import { ValidationResult, signupValidation, loginValidation } from '../middleware/auth'
import { signUp } from '../../core/siginup'
import { login } from '../../core/login'
const routes = Router()

routes.post('/signup', signupValidation, ValidationResult, signUp)
routes.post('/login', loginValidation, ValidationResult, login)
routes.get('/signup', async (req, res) => { res.render('signup') })
routes.get('/login', async (req, res) => { res.render('login') })

export default routes