import express, { Request, Response, NextFunction } from 'express'
import createError, { HttpError } from 'http-errors'
import cookieParser from 'cookie-parser'
import routes from '../src/api/routes'

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(routes)

app.use(async (req: Request, res: Response, next: NextFunction) => {
    next(new createError.NotFound())
})

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    })
})

const PORT = process.env.PORT || "5001"

app.listen(PORT, () => console.log(`🚀 Server is running at ${PORT}`)) 
