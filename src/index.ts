import express from 'express'
import path from 'path'
import routes from '../src/api/routes'

const app = express()

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(routes)

const PORT = process.env.PORT || "4000"

app.listen(PORT, () => console.log(`The server is running at ${PORT}`)) 
