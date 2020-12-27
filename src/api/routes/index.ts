import { ValidationResult, signupValidation, loginValidation } from '../middleware/auth'
import { signUp } from '../../core/siginup'
import { login } from '../../core/login'
import { refreshToken } from '../../core/refreshToken'
import { logout } from '../../core/logout'
import routes from './clientRoutes'

routes.post('/api/signup', signupValidation, ValidationResult, signUp)
routes.post('/api/login', loginValidation, ValidationResult, login)
routes.post('/api/refreshToken', refreshToken)
routes.delete('/api/logout', logout)

export default routes