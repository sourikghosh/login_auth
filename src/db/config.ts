import { Pool } from 'pg'
let connectionString
(process.env.NODE_ENV === 'production') ? (connectionString = process.env.DATABASE_URL)
    : (connectionString = 'postgresql://sourik:neverdie@localhost:5432/login_auth')

export const pool = new Pool({
    connectionString
})