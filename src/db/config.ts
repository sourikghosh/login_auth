import { Pool } from 'pg'

const connectionString = process.env.DATABASE_URL || 'postgresql://sourik:neverdie@localhost:5432/login_auth'

export const pool = new Pool({
    connectionString
})