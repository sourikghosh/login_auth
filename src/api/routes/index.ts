import express from 'express'
import { signupValidationResult, signupValidation } from '../../core/auth'
const routes = express.Router()


export default
    routes.get('/', (req, res) => {
        res.json({
            "message": "👦🏽"
        })
    }).post('/signup', signupValidation, signupValidationResult)