import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import logger from 'morgan'
import createError, { HttpError } from 'http-errors'

import { createPDFRouter } from './routers/new'

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())

app.use('/api/pdf', createPDFRouter)

app.use((req, res, next) => {
    next(createError(404, 'Page Not Found.'))
})

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500)
    res.json({
        status: err.status,
        error: req.app.get('env') === 'development' ? err : {},
    })
})

export { app }
