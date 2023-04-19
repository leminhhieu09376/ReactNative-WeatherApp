require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./routes/auth')
const todoRouter = require('./routes/todo')
const cors = require('cors')
const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://leminhhieu0937659254:${process.env.DB_PASSWORD}@weather-app.kupwp4i.mongodb.net/?retryWrites=true&w=majority`)
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

connectDB()
const app = express()
app.use(express.json())
app.use(cors())
app.use('/api/auth', authRouter)
app.use('/api/todos', todoRouter)

const PORT = 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))