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