import express, { Request, Response, NextFunction } from 'express'
import path from 'path'
import createError, { HttpError } from 'http-errors'
import routes from '../src/api/routes'
import session from 'express-session'
const app = express()

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, httpOnly: true }
}))
app.use(routes)
// app.use(async (req: Request, res: Response, next: NextFunction) => {
//     next(new createError.NotFound())
// })

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    console.log(err, req.body)
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    })
})

const PORT = process.env.PORT || "4001"

app.listen(PORT, () => console.log(`The server is running at ${PORT}`)) 
