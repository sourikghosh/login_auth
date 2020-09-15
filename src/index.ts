import express from 'express'
import pool from './db/index'
import env from 'dotenv'
env.config()
const app = express()


let port = "4000"
if (process.env.PORT)
    port = process.env.PORT

app.listen(port, () => console.log(`The server is running at ${port}`)) 
