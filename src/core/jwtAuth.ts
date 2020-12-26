import { sign, verify } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import createError from 'http-errors'
import client from '../db/redisconfig'

interface Payload {
    aud?: string,
    iss?: string,
    exp?: number,
    iat?: number
}

declare global {
    namespace Express {
        interface Request {
            user?: Payload;
        }
    }
}
export const signAccessToken = async (user: string) => {
    return new Promise((resolve, reject) => {
        const payload = {}
        const secret = process.env.ACCESS_TOKEN_SECRET
        const options = {
            expiresIn: '15m',
            issuer: 'LoginAuth',
            audience: user
        }
        sign(payload, secret!, options, (err, token) => {
            if (err) {
                console.log(err.message)
                reject(new createError.InternalServerError())
                return
            }
            resolve(token)
        })
    })
}
export const verifyAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    // if (!req.headers['authorization']) return next(new createError.Unauthorized())
    // const authHeader = req.headers['authorization']
    // const token = authHeader.split(' ')[1]
    // verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, payload) => {
    //     if (err) {
    //         const message =
    //             err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
    //         return next(new createError.Unauthorized(message))
    //     }
    //     console.log(payload)

    //     req.user = payload
    console.log(req.session.token)
    next()
    // })
}

export const signRefreshToken = async (user: string) => {
    return new Promise((resolve, reject) => {
        const payload = {}
        const secret = process.env.REFRESH_TOKEN_SECRET
        const options = {
            expiresIn: '1y',
            issuer: 'LoginAuth',
            audience: user
        }
        sign(payload, secret!, options, (err, token) => {
            if (err) {
                console.log(err.message)
                reject(new createError.InternalServerError())
            }

            client.SET(user, token!, 'EX', 365 * 24 * 60 * 60, (err, reply) => {
                if (err) {
                    console.log(err.message)
                    reject(new createError.InternalServerError())
                    return
                }
                resolve(token)
            })
        })
    })
}
export const verifyRefreshToken = async (refreshToken: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (err, decode) => {
            if (err) return reject(new createError.Unauthorized())
            const payload: Payload = decode!
            const user: string = payload.aud!
            client.GET(user, (err, result) => {
                if (err) {
                    console.log(err.message)
                    reject(new createError.InternalServerError())
                    return
                }
                if (refreshToken === result) return resolve(user)
                reject(new createError.Unauthorized())
            })
        }
        )
    })
}
