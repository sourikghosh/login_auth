import { Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'
import { getByEmail } from '../db/getByEmail'
import bcrypt from 'bcrypt'

export const signupValidationResult = (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();
    hasErrors ? res.send(result.mapped()) : bcrypt.hash(req.body.password, 12, function (err, hash) {
        // Store hash in your password DB.
    });
    //res.json({ "message": "👌🤴🏽" })
}

export const signupValidation = [
    body("email", 'should be a valid email')
        .trim()
        .notEmpty()
        .bail()
        .isEmail()
        .bail()
        .normalizeEmail()
        .custom(value => {
            if (getByEmail(value))
                throw new Error('Email already been used : Try login');
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
