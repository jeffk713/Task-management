const express = require('express');
const router = new express.Router();
const User = require('../models/user.model');

router.post('/user/signup', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch(error) { res.status(400).send({ error: error.message }) }
})

router.get('/user/profile', (req, res) => {
  res.send({
    name: 'Jeff'
  })
})

module.exports = router;
