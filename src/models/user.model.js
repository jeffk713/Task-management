const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  userName: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
    trim: true,
    minlength: [6, 'User name must be longer than 5 charactors']
  },
  password: {
    type: String,
    required: true,
    trim: true, 
    minlength: [6, 'Password must be longer than 5 charactors']
  }
});


const User = mongoose.model('User', userSchema);

module.exports= User;