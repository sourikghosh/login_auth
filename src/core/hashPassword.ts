import bcrypt from 'bcrypt'

export const hashPassword = async (password: String) => {
    try { return await bcrypt.hash(password, 12) }
    catch (err) {
        throw err
    }
}