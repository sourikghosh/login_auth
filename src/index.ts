import express from 'express'
import { isConnected } from './db'
import routes from './api/routes'
import env from 'dotenv'
env.config()
const app = express()

app.use(routes)


const reqQuery = async () => {
    const client = await isConnected()
    // const results = await client.query(`select * from ${process.env.PGTABLE}`)
    // console.table(results.rows)
}


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
