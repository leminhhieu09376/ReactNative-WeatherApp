
const express = require('express');
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const User = require('../models/User')


// @route POST api/auth/register
//@desc Register user
//@access Public
router.post('/register', async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Missing username and/or password' })

    }
    try {
        //kiem tra user da ton tai hay chua
        const user = await User.findOne({ username: username })
        if (user) {
            return res.status(400).json({ success: false, message: 'Username already taken ' })
        }
        const hashedPassword = await argon2.hash(password)
        const newUser = new User({ username, password: hashedPassword })
        await newUser.save()
        //return token
        const accessToken = jwt.sign({ userId: newUser._id, uName: newUser.username }, process.env.ACCESS_TOKEN_SECRET)
        res.json({ success: true, message: 'User created successfully', accessToken })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

// @route POST api/auth/login
//@desc Login user
//@access Public
router.post('/login', async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Missing username and/or password' })
    }
    try {
        //Kiem tra user ton tai chua
        const user = await User.findOne({ username: username })
        if (!user) {
            return res.status(400).json({ success: false, message: 'Incorrect username  ' })
        }
        const passwordValid = await argon2.verify(user.password, password)
        if (!passwordValid) {
            return res.status(400).json({ success: false, message: 'Incorrect  password ' })
        }
        const accessToken = jwt.sign({ userId: user._id, uName: user.username }, process.env.ACCESS_TOKEN_SECRET)
        res.json({ success: true, message: 'Logged in successfully', accessToken, userId: user._id, uName: user.username })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})




module.exports = router