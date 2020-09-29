import { Router } from 'express'
import { ValidationResult, signupValidation, loginValidation } from '../../core/auth'
import { signUp } from '../../core/siginup'
import { login } from '../../core/login'
const routes = Router()

routes.post('/signup', signupValidation, ValidationResult, signUp)
routes.post('/login', loginValidation, ValidationResult, login)

export default routes