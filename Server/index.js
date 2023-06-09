require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./routes/auth')
const todoRouter = require('./routes/todo')
const userRouter = require('./routes/users')
const imageRouter = require('./routes/images')
const path = require('path');
const cors = require('cors')
const multer = require('multer');

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
const uploadsDirectory = path.resolve(__dirname, 'uploads');

const app = express()
app.use(express.json())
app.use(cors())
app.use('/uploads', express.static(uploadsDirectory));
app.use('/api/auth', authRouter)
app.use('/api/todos', todoRouter)
app.use('/api/users', userRouter)
app.use('/upload', imageRouter)
const PORT = 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))