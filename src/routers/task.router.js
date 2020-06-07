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


module.exports = router;