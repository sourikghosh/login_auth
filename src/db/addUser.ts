import { pool } from './config'

export const addUser = async (values: string[]) => {
    try {
        await pool.query(`INSERT INTO ${process.env.PGTABLE} (${process.env.PGTABLE_COLUMN1},${process.env.PGTABLE_COLUMN2},${process.env.PGTABLE_COLUMN3}) 
    values ($1,$2,$3)`, values)
    }
    catch (err) {
        throw err
    }
}

