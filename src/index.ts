import express from 'express'
import pool from './db/index'
import env from 'dotenv'
env.config()
const app = express()

const isConnected = async () => {
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

const reqQuery = async () => {
    const client = await isConnected()
    // const results = await client.query(`select * from ${process.env.PGTABLE}`)
    // console.table(results.rows)
}

reqQuery()
// const { rows } = await client.query(`select * from registration`)
// app.get('/all', (req, res) => {
//     res.send({
//         rows
//     })
// })








// app.get("/a", async (req, res) => {
//     try {
//         const results = await pool.query("select * from registration")
//         console.table(results.rows)
//         res.send({
//             "rows": results.rows
//         })
//     }
//     catch (err) {
//         console.log(err)
//     }
// })

let port = "4000"
if (process.env.PORT)
    port = process.env.PORT

app.listen(port, () => console.log(`The server is running at ${port}`)) 
