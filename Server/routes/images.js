const express = require('express');
const router = express.Router()
const verifyToken = require('../middleware/auth')
const multer = require('multer');
const User = require('../models/User')
const ImageModel = require('../models/Image')

//storage
const Storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({
    storage: Storage,
    fieldSize: 10 * 1024 * 1024,
}).single('testImage')


//@Route POST images /upload
//@access Private
router.post('/', verifyToken, (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            const newImage = new ImageModel({
                name: req.body.name,
                image: {
                    data: req.file.filename,
                    contentType: 'image/png'
                },
                status: req.body.status,
                user: req.userId,
                uName: req.uName,
                imgPath: req.file.path,
                base64img: req.body.base64img

            })
            newImage.save()
                .then(() => res.json({ success: true, message: 'successfuly ', image: newImage })).catch(err => console.log(err))
        }
    })
})

//@Route GET images /upload
//@access Private
router.get('/', verifyToken, async (req, res) => {
    try {
        const images = await ImageModel.find({ user: req.userId }).populate('user', ['username'])
        res.json({ success: true, images })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

//@Route GET images /upload
//@access public
router.post('/friends', async (req, res) => {
    const { username } = req.body
    try {
        const user = await User.findOne({ username: username })
        if (!user) {
            return res.status(400).json({ success: false, message: 'Incorrect username  ' })
        }
        const images = await ImageModel.find({ uName: username }).populate('user', ['username'])
        res.json({ success: true, images })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})




module.exports = router