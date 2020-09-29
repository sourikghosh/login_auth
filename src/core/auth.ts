import { Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'
import { getByEmail } from '../db/getByEmail'
import { getByUsername } from '../db/getByUsername'

export const signupValidationResult = (req: Request, res: Response, next: NextFunction) => {
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
            if (await getByEmail(value))
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
            if (await getByUsername(value))
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
        .custom((value: String, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Password confirmation does not match password');
            }
            return true;
        })
]
