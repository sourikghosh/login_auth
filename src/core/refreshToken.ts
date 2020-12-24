import { Request, Response, NextFunction } from 'express'
import createError from 'http-errors'
import { verifyRefreshToken, signRefreshToken, signAccessToken } from './jwtAuth'

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { refreshToken } = req.body
        if (!refreshToken) throw new createError.BadRequest()
        const user = await verifyRefreshToken(refreshToken)

        const accessToken = await signAccessToken(user)
        const refToken = await signRefreshToken(user)
        res.send({ accessToken: accessToken, refreshToken: refToken })
    } catch (error) {
        next(error)
    }
}