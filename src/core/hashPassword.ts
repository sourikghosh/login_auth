import { hash, compare } from 'bcrypt'

export const hashPassword = async (password: string) => {
    try { return await hash(password, 12) }
    catch (err) {
        throw err
    }
}

export const compareHash = async (password: string, hashPassword: string) => {
    try {
        return await compare(password, hashPassword)
    }
    catch (err) {
        console.log(err)
    }
}