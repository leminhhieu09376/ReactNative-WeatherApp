
const express = require('express');
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Todo = require('../models/Todo')

//@Route GET TODO api/todos
//@access Private
router.get('/', verifyToken, async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.userId }).populate('user', ['username'])
        res.json({ success: true, todos })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})


//@Route POST TODO api/todos
//@access Private
router.post('/', verifyToken, async (req, res) => {
    const { date, todo, location, time } = req.body
    if (!date || !todo || !location || !time) {
        return res.status(400).json({ success: false, message: 'Requied' })
    }
    try {
        const newTodo = new Todo({ date, todo, location, time, user: req.userId })
        await newTodo.save()
        res.json({ success: true, message: 'created todo successfuly ', todo: newTodo })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }

})

//@Route PUT TODO api/todos
//@access Private
router.put('/:id', verifyToken, async (req, res) => {
    const { date, todo, location, time } = req.body
    if (!date || !todo || !location || !time) {
        return res.status(400).json({ success: false, message: 'Requied' })
    }
    try {
        let updatedTodo = {
            date,
            todo,
            location,
            time
        }
        const todoUpdateCondition = { _id: req.params.id, user: req.userId }
        updatedTodo = await Todo.findByIdAndUpdate(todoUpdateCondition, updatedTodo, { new: true })
        //User not authorised to update todo or todo not found
        if (!updatedTodo) {
            return res.status(401).json({ success: false, message: 'Post not found or user nor authorised ' })
        }
        res.json({ success: true, message: 'Updated success ', todo: updatedTodo })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

//@Route DELETE TODO api/todos
//@access Private

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const todoDeleteCondition = { _id: req.params.id, user: req.userId }
        const deleteTodo = await Todo.findByIdAndDelete(todoDeleteCondition)
        //User not authorised to update todo or todo not found
        if (!deleteTodo) {
            return res.status(401).json({ success: false, message: 'Post not found or user nor authorised ' })
        }
        res.json({ success: true, todo: deleteTodo, message: 'Deleted ', })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

module.exports = router