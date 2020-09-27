import express from 'express'
import routes from './api/routes'
import env from 'dotenv'
env.config()

const app = express()
app.use(express.json())
app.use(routes)


let port = "4000"
if (process.env.PORT)
    port = process.env.PORT

app.listen(port, () => console.log(`The server is running at ${port}`)) 
