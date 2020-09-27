import { Router } from 'express'
import { createUser } from '../../core/createUser'
import { signupValidationResult, signupValidation } from '../../core/auth'
const routes = Router()

routes.post('/signup', signupValidation, signupValidationResult)


export default routes