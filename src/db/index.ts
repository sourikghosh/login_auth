import { Pool } from 'pg'
import env from 'dotenv'
env.config()

export const pool = new Pool({
    "user": process.env.PGUSER,
    "host": process.env.PGHOST,
    "database": process.env.PGDATABASE,
    "password": process.env.PGPASSWORD,
    "port": 5432
})

export const isConnected = async () => {
    let retries = 5;
    while (retries) {

        try {
            console.log(`trying to connect the db...`)
            const overload = await pool.connect()
            console.log(`connected`)
            return overload;
        }
        catch (err) {
            console.log(err)
            retries -= 1
            console.log(`retries left:${retries}`)
            new Promise(res => setTimeout(res, 5000))
        }
    }
}


// //for client checkout
// ; (async () => {
//     const client = await pool.connect()
//     try {
//         const res = await client.query('select * from registration')
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
//     const { rows } = await pool.query('SELECT * FROM registration')
//     console.log('user:', rows[0])
// })().catch(err =>
//     setImmediate(() => {
//         console.log(err)
//     })
// )

