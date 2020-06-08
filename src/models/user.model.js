const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const Task = require('')

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
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
}, 
{
  timestamps: true
});

userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner'
})

userSchema.methods.createAuthToken = async function() {
  const user = this;

  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

userSchema.statics.loginWithCredentials = async function( userName, password) {
  const user = await User.findOne({ userName });
  if(!user) throw new Error({ error: 'Unable to log in.'});

  const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch) throw new Error({ error: 'Unable to log in.'});

  return user;
};

userSchema.pre('save', async function(next) {
  const user = this;

  if(user.isModified('password')) { user.password = await bcrypt.hash(user.password, 8); }

  next();
});

const User = mongoose.model('User', userSchema);

module.exports= User;