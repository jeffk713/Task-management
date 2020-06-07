const express = require('express');
const router = new express.Router();
const auth = require('../middlewares/auth');

const User = require('../models/user.model');

router.post('/user/signup', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.createAuthToken()

    res.status(201).send({ user, token });
  } catch(error) { res.status(400).send({ error: error.message }) }
});

router.post('/user/login', async (req, res) => {
  try {
    const user = await User.loginWithCredentials(req.body.userName, req.body.password);
    if(!user) return res.status(404).send();

    const token = await user.createAuthToken();

    res.send({ user, token })
  } catch(error) { res.status(400).send({ error: error.message }) }
});

router.post('/user/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => token !== req.token);
    await req.user.save();
    res.send()
  } catch(error) { res.status(500).send({ error: error.message }) }
});

router.post('/user/logoutall', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send({ message: 'logged out from all devices'});
  } catch(error) { res.status(500).send({ error: error.message }) }
});

router.get('/user/profile', auth, async (req, res) => {
  try {
    const user = await User.findOne(req.user._id);
    res.send(user);
  } catch(error) {res.status(400).send({ error: error.message })}
});

router.patch('/user/update', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'userName', 'password'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));
  if(!isValidOperation) return res.status(400).send({ error: 'Invaild update' });

  try{
    updates.forEach(update => req.user[update] = req.body[update]);
    await req.user.save()
    res.send(req.user);
  } catch(error) { res.status(500).send({ error: error.message }) }
});

router.delete('/user/delete', auth, async (req, res) => {
  try {
    const user = await User.findOne(req.user._id);
    if(!user) return res.status(404).send();
    
    await user.remove();
    res.send(user);
  } catch(error) { res.status(500).send({ error: error.message }) }
});

module.exports = router;
