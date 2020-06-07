const express = require('express');
const router = new express.Router();
const User = require('../models/user.model');

router.post('/user/signup', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch(error) { res.status(400).send({ error: error.message }) }
});

router.get('/user/profile', (req, res) => {
  res.send({
    name: 'Jeff'
  })
});

router.patch('/user/update/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'userName', 'password'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));
  if(!isValidOperation) return res.status(400).send({ error: 'Invaild update' });

  try{
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).send();

    updates.forEach(update => user[update] = req.body[update]);
    await user.save()
    res.send(user);
  } catch(error) { res.status(500).send({ error: error.message }) }
});

router.delete('/user/delete/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).send();
    
    await user.remove();
    res.send(user);
  } catch(error) { res.status(500).send({ error: error.message }) }
});

module.exports = router;
