import { Router } from 'express'
import { signUp } from '../../core/siginup'
import { signupValidationResult, signupValidation } from '../../core/auth'
import { sign } from 'crypto'
const routes = Router()

routes.post('/signup', signupValidation, signupValidationResult, signUp)


export default routes