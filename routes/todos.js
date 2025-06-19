const express = require('express');
const Todo = require('../models/todo');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

// Get all todos for user
router.get('/', auth, async (req, res) => {
  const todos = await Todo.find({ user: req.user.id });
  res.json(todos);
});

// Create todo
router.post('/', auth, async (req, res) => {
  const { title } = req.body;
  const todo = await Todo.create({ user: req.user.id, title });
  res.status(201).json(todo);
});

// Update todo
router.put('/:id', auth, async (req, res) => {
  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true }
  );
  if (!todo) return res.status(404).json({ msg: 'Todo not found' });
  res.json(todo);
});

// Delete todo
router.delete('/:id', auth, async (req, res) => {
  const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!todo) return res.status(404).json({ msg: 'Todo not found' });
  res.json({ msg: 'Todo deleted' });
});

module.exports = router;
