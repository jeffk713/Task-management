const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token});
    if (!user) throw new Error({ error: 'no matching user found.' })

    req.user = user;
    req.token = token;
    next()
  } catch(error) { res.status(400).send({ error: error.message }) }
}

module.exports = auth;