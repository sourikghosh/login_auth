import { Router } from 'express'
import { signUp } from '../../core/siginup'
import { signupValidationResult, signupValidation } from '../../core/auth'
const routes = Router()

routes.post('/signup', signupValidation, signupValidationResult, signUp)


export default routes