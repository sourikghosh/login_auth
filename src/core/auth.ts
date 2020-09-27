import { Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'
import { getByEmail } from '../db/getByEmail'
import bcrypt from 'bcrypt'

export const signupValidationResult = (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();
    hasErrors ? res.send(result.mapped()) : res.json({
        "message": "✅👑"
    })
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
        .isLength({ min: 8, max: 100 }),
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
