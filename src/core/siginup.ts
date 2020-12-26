import { NextFunction, Request, Response } from 'express'
import { addUser } from '../db/addUser'
import { signAccessToken, signRefreshToken } from '../core/jwtAuth'
import { hashPassword } from './hashPassword'
export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, username, password } = req.body
        const hpassword = await hashPassword(password)
        const queryArr = [email, username, hpassword]
        await addUser(queryArr)
        const accessToken = await signAccessToken(username)
        const refreshToken = await signRefreshToken(username)
        res.cookie("token", { accessToken })
        //res.send({ accessToken, refreshToken })
    }
    catch (err) {
        next(err)
    }
}