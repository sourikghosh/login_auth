import { Request, Response } from 'express'
import { getByEmail } from '../db/findOne'
import { compareHash } from './hashPassword'
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const user = await getByEmail(email)
        // console.log(user, user?.length, user?.[0].password)
        if (user?.length === 0)
            return Promise.reject('Email not registered')
        else {
            if (!(await compareHash(password, user?.[0].password)))
                return Promise.reject('password donot match')
            else {
                res.redirect('/dashboard')
            }
        }
    }
    catch (err) {
        res.send(err)
    }
}