import { Pool } from 'pg'

const connectionString = process.env.DATABASE_URL || 'postgresql://sourik:neverdie@localhost:5432/login_auth'

export const pool = new Pool({
    connectionString
})

pool.on('connect', () => {
    console.log('Client connected to postgres...')
})

pool.on('error', (err) => {
    console.log(err.stack)
})
