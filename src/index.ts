import express from 'express'
import client from './db/index'
import env from 'dotenv'
env.config()
const app = express()


let retries = 5;
while (retries) {

    try {
        client.connect()
        break;
    }
    catch (err) {
        console.log(err)
        retries -= 1
        console.log(`retries left:${retries}`)
        new Promise(res => setTimeout(res, 5000))
    }
}

const { rows } = await client.query(`select * from registration`)
app.get('/all', (req, res) => {
    res.send({
        rows
    })
})








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
