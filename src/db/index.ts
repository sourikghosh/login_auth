import { Pool } from 'pg'
import * as dotenv from 'dotenv'
dotenv.config({ path: __dirname + '/.env' })

const isProduction = process.env.NODE_ENV === "pro"
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString
})
// //for client checkout
// ; (async () => {
//     const client = await pool.connect()
//     try {
//         const res = await client.query('SELECT * FROM users WHERE id = $1', [1])
//         console.log(res.rows[0])
//     }
//     finally {
//         // Make sure to release the client before any error handling,
//         // just in case the error handling itself throws an error.
//         client.release()
//     }
// })()
//     .catch(err => console.log(err.stack))
// //single query recommended
// ; (async () => {
//     const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [1])
//     console.log('user:', rows[0])
// })().catch(err =>
//     setImmediate(() => {
//         throw err
//     })
// )
export default pool

