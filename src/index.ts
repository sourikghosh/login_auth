import express from 'express'
import routes from './api/routes'

const app = express()
app.use(express.json())
app.use(routes)

const PORT = process.env.PORT || "4000"

app.listen(PORT, () => console.log(`The server is running at ${PORT}`)) 
