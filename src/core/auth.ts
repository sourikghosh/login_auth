import { Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'
export const signupValidationResult = (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();
    hasErrors ? console.log(result.mapped()) : res.json({ "message": "👌🤴🏽" })
}

export const signupValidation = (req: Request, res: Response, next: NextFunction) => {
    body("email")
        .trim()
        .notEmpty()
        .bail()
        .isEmail()
        .bail()
        .normalizeEmail()
    body("username")
        .trim()
        .notEmpty()
        .bail()
        .isString()
        .bail()
        .isLength({ min: 8, max: 100 })
    body("password1")
        .trim()
        .notEmpty()
        .bail()
        .isString()
        .bail()
        .isLength({ min: 12, max: 100 })
    body("password2")
        .trim()
        .notEmpty()
        .bail()
        .isString()
        .bail()
        .equals('password1')
    next()
}