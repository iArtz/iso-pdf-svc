import dotenv from 'dotenv'
import { app } from './app'

const start = () => {
    dotenv.config()

    if (!process.env.NODE_ENV) throw new Error('NODE_ENV must be defined')

    const PORT = process.env.PORT || 3000

    app.listen(PORT, () => {
        console.log(`ENV: ${process.env.NODE_ENV} listen on port: ${PORT}`)
    })
}

start()
