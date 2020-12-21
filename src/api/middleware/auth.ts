import { Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'
import { checkUsername, checkEmail } from '../../db/findOne'

export const ValidationResult = (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();
    hasErrors ? res.send(result.mapped()) : next()
}

export const signupValidation = [
    body("email", 'should be a valid email')
        .trim()
        .notEmpty()
        .bail()
        .isEmail()
        .bail()
        .normalizeEmail()
        .custom(async value => {
            if (await checkEmail(value))
                return Promise.reject('E-mail already in use')
        }),
    body("username", 'should be a valid username')
        .trim()
        .notEmpty()
        .bail()
        .isString()
        .bail()
        .isLength({ min: 8, max: 100 })
        .custom(async value => {
            if (await checkUsername(value))
                return Promise.reject('Username already taken')
        }),
    body("password", 'should be a valid password')
        .trim()
        .notEmpty()
        .bail()
        .isString()
        .bail()
        .isLength({ min: 12, max: 100 }),
    body("confirmPassword", 'should be a valid confirm password')
        .trim()
        .notEmpty()
        .bail()
        .isString()
        .bail()
        .custom((value: string, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Password confirmation does not match password')
            }
            return true;
        })
]

export const loginValidation = [
    body("email", 'should be a valid email')
        .trim()
        .notEmpty()
        .bail()
        .isEmail()
        .normalizeEmail(),
    body("password", 'should be a valid password')
        .trim()
        .notEmpty()
        .bail()
        .isString()
        .bail()
        .isLength({ min: 12, max: 100 })
]