import { pool } from './config'
export const getByEmail = async (value: String) => {
    return await pool.query(`${value} IN (SELECT ${process.env.PGTABLE_COLUMN1} FROM ${process.env.PGTABLE})`)
}