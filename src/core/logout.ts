import { Request, Response, NextFunction } from 'express'
import createError from 'http-errors'
import { verifyRefreshToken } from './jwtAuth'
import client from '../db/redisconfig'

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refreshToken = req.cookies.jid
        if (!refreshToken)
            throw new createError.BadRequest()
        const user = await verifyRefreshToken(refreshToken)
        client.DEL(user, (err, val) => {
            if (err) {
                console.log(err.message)
                throw new createError.InternalServerError()
            }
            console.log(val)
            res.clearCookie("jid", {
                httpOnly: true,
                path: "/api/ref/"
            })
            res.sendStatus(204)
        })
    } catch (error) {
        next(error)
    }
}