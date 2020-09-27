import { hash } from 'bcrypt'

export const hashPassword = async (password: String) => {
    try { return await hash(password, 12) }
    catch (err) {
        throw err
    }
}