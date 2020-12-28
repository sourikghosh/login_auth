import { NextFunction, Request, Response } from 'express'
import { getByEmail } from '../db/findOne'
import { compareHash } from './hashPassword'
import createError from 'http-errors'
import { signAccessToken, signRefreshToken } from './jwtAuth'
export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body
        const user = await getByEmail(email)
        if (user?.length === 0)
            throw new createError.NotFound('User not registered')
        else {
            if (!(await compareHash(password, user?.[0].password)))
                throw new createError.Unauthorized('Username/password not valid')
            else {
                const accessToken = await signAccessToken(user?.[0].username)
                const refreshToken = await signRefreshToken(user?.[0].username)
                res.cookie("jid", refreshToken, {
                    httpOnly: true,
                    path: "/api/ref/"
                })
                res.send({ accessToken })

            }
        }
    }
    catch (err) {
        next(err)
    }
}