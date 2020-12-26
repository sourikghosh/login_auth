import { Router } from 'express'
import { ValidationResult, signupValidation, loginValidation } from '../middleware/auth'
import { signUp } from '../../core/siginup'
import { login } from '../../core/login'
import { refreshToken } from '../../core/refreshToken'
import { logout } from '../../core/logout'
import { verifyAccessToken } from '../../core/jwtAuth'


const routes = Router()

routes.get('/', async (req, res) => { res.redirect('/login') })
routes.get('/signup', async (req, res) => { res.render('signup') })
routes.get('/login', async (req, res) => { res.render('login') })
routes.get('/dashboard', verifyAccessToken, async (req, res) => { res.render('dashboard') })
routes.get('/err', async (req, res) => { res.render('error', { status: '404', msg: 'not found' }) })

routes.post('/api/signup', signupValidation, ValidationResult, signUp) //sends accesstoke reftoken
routes.post('/api/login', loginValidation, ValidationResult, login)//sends accesstoke reftoken
routes.post('/api/refreshToken', refreshToken) //new pair of tokens
routes.delete('/api/logout', logout) //delete the tokens

export default routes