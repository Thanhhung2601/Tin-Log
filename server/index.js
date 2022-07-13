import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import userRouter from './router/user.js'
import conversation from './router/conversation.js'

const app = express()
dotenv.config()
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())
app.use('/user', userRouter)
app.use('/conversation', conversation)
app.use('/', (req) => {
    console.log(req.body)
})

const CONNECTION_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 5000

console.log(CONNECTION_URL)

mongoose
    .connect(CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running port : ${PORT}`)
        })
    })
    .catch((err) => console.log(err))
