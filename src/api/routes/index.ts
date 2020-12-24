import { Router } from 'express'
import { ValidationResult, signupValidation, loginValidation } from '../middleware/auth'
import { signUp } from '../../core/siginup'
import { login } from '../../core/login'
import { refreshToken } from '../../core/refreshToken'
import { logout } from '../../core/logout'


const routes = Router()

routes.get('/', async (req, res) => { res.redirect('/login') })
routes.get('/signup', async (req, res) => { res.render('signup') })
routes.get('/login', async (req, res) => { res.render('login') })
routes.get('/dashboard', async (req, res) => { res.render('dashboard') })

routes.post('/signup', signupValidation, ValidationResult, signUp)
routes.post('/login', loginValidation, ValidationResult, login)
routes.post('/refreshToken', refreshToken)
routes.delete('/logout', logout)

export default routes