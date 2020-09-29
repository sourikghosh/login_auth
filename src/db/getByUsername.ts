import { pool } from './config'
export const getByUsername = async (value: String) => {
    try {
        const { rows } = await pool.query(`select exists(select ${process.env.PGTABLE_COLUMN2} from ${process.env.PGTABLE} where ${process.env.PGTABLE_COLUMN2} = $1 )`, [value])
        return rows[0].exists
    }
    catch (err) {
        console.log(err.stack)
    }
}