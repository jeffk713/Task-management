const express = require('express');
const router = new express.Router();
const auth = require('../middlewares/auth');
const Task = require('../models/task.model');

router.post('/task/create', auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch(error) { res.status(400).send({ error: error.message }); }
});

//GET ?completed=false
//GET ?limit=10&skip=0
//GET ?sortBy=updatedAt:1 or :-1
router.get('/task/readall', auth, async (req, res) => {
  const match = {};
  const sort = {};

  if(req.query.completed) { match.completed = req.query.completed === 'true'};
  if(req.query.sortBy) { 
    sortDetails = req.query.sortBy.split(':');
    sort[sortDetails[0]] = parseInt(sortDetails[1]);
  };

  try{
    await req.user.populate({
      path: 'tasks',
      match,
      options: {
        limit: parseInt(req.query.limit, 10),
        skip:  parseInt(req.query.skip, 10) * parseInt(req.query.limit, 10),
        sort
      }
    }).execPopulate();

    res.send(req.user.tasks)
  } catch(error) { res.status(400).send({ error: error.message }) }
});

router.patch('/task/update/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['task', 'completed'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));
  if(!isValidOperation) return res.status(400).send({ error: 'Invaild update' });

  try{
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id});
    if(!task) return res.status(404).send()

    updates.forEach(update => task[update] = req.body[update]);
    await task.save()
    res.send(task);
  } catch(error) { res.status(400).send({ error: error.message }) }
});

router.delete('/task/delete/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id});
    if(!task) return res.status(404).send();
    
    await task.remove();
    res.send(task);
  } catch(error) { res.status(500).send({ error: error.message }) }
});

module.exports = router;