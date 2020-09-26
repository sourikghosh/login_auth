import { pool } from './config'

const addUser = async (values: String) => {
    await pool.query(`INSERT INTO ${process.env.PGTABLE} (${process.env.PGTABLE_COLUMN1},${process.env.PGTABLE_COLUMN2},${process.env.PGTABLE_COLUMN3}) values ()`)
}
