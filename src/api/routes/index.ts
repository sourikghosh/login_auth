import express from 'express'
import { signupValidationResult, signupValidation } from '../../core/auth'
const route = express.Router()


export default
    route.get('/', (req, res) => {
        res.json({
            "message": "👦🏽"
        })
    }).post('/signup', signupValidation, signupValidationResult)