import express from 'express'
import * as dotenv from 'dotenv'
dotenv.config({ path: __dirname + '/.env' })

const app = express()
app.get('/', (req, res) => {
    res.json({ message: "success" })
})
const port = process.env.PORT || 4006

app.listen(port, () => console.log(`The server is running at ${port}`)) 
