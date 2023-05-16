const express = require('express');
const router = express.Router()
const verifyToken = require('../middleware/auth')

const User = require('../models/User')
const Friend = require('../models/Friend')

//@Route GET User api/users
//@access Private


// router.get('/', async (req, res) => {
//     const { username } = req.body
//     if (!username) {
//         return res.status(400).json({ success: false, message: 'Missing username' })
//     }
//     try {
//         //Kiem tra user ton tai chua
//         const user = await User.findOne({ username: username })
//         if (!user) {
//             return res.status(400).json({ success: false, message: 'Username not found' })
//         }

//         res.json({ success: true, message: 'UserId found', userId: user._id, username: user.username, userAdd: true })
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ success: false, message: 'Internal server error' })
//     }
// })



//@Route POST Friends api/users
//@access Private

router.post('/', verifyToken, async (req, res) => {
    const { username } = req.body
    if (!username) {
        return res.status(400).json({ success: false, message: 'Missing username' })
    }
    try {
        const user = await User.findOne({ username: username })
        if (!user) {
            return res.status(400).json({ success: false, message: ' username not exist  ' })
        }
        const newFriend = new Friend({ friendAdd: true, frname: user.username, frId: user._id, user: req.userId })
        await newFriend.save()
        res.json({ success: true, message: 'add friend successfuly ', friend: newFriend })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }

})

module.exports = router