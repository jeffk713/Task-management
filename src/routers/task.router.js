const express = require('express');
const router = new express.Router();
const Task = require('../models/task.model');

router.post('/task/create', async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch(error) { res.status(400).send({ error: error.message }) }
});

router.get('/task/read/:id', async (req, res) => {
  try{
    const task = await Task.findById(req.params.id);
    if(!task) return res.status(404).send()
    res.send(task)
  } catch(error) { res.status(400).send({ error: error.message }) }
});

router.patch('/task/update/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['task', 'completed'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));
  if(!isValidOperation) return res.status(400).send({ error: 'Invaild update' });

  try{
    const task = await Task.findById(req.params.id);
    if(!task) return res.status(404).send()

    updates.forEach(update => task[update] = req.body[update]);
    await task.save()
    res.send(task);
  } catch(error) { res.status(400).send({ error: error.message }) }
});

router.delete('/task/delete/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if(!task) return res.status(404).send();
    
    await task.remove();
    res.send(task);
  } catch(error) { res.status(500).send({ error: error.message }) }
});

module.exports = router;