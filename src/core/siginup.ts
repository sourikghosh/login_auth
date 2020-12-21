import { Request, Response } from 'express'
import { addUser } from '../db/addUser'
import { hashPassword } from './hashPassword'
export const signUp = async (req: Request, res: Response) => {
    try {
        const { email, username, password } = req.body
        const hpassword = await hashPassword(password)
        const queryArr = [email, username, hpassword]
        await addUser(queryArr)
        res.redirect('/login')
    }
    catch (err) {
        res.send(err)
    }
}