import { Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'




export const signupValidationResult = (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();
    hasErrors ? console.log(result.mapped()) : res.json({ "message": "👌🤴🏽" })
}

export const signupValidation = [
    body("email", 'should be a valid email')
        .trim()
        .notEmpty()
        .bail()
        .isEmail()
        .bail()
        .normalizeEmail(),
    body("username", 'should be a valid username')
        .trim()
        .notEmpty()
        .bail()
        .isString()
        .bail()
        .isLength({ min: 8, max: 100 }),
    body("password1", 'should be a valid password')
        .trim()
        .notEmpty()
        .bail()
        .isString()
        .bail()
        .isLength({ min: 12, max: 100 }),
    body("password2", 'should be a valid password')
        .trim()
        .notEmpty()
        .bail()
        .isString()
        .bail()
        .custom((value: String, { req }) => {
            if (value !== req.body.password1) {
                throw new Error('Password confirmation does not match password');
            }
            return true;
        })
]
