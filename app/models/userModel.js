//Import mongoose
const mongoose = require('mongoose');

//Import validator
const validator = require('validator');

//Import bcrypt
const bcrypt = require('bcrypt');

//Assign schema func to schema
const Schema = mongoose.Schema;

//Create schema instance and define data structure
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  surname: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signup = async function (
  name,
  surname,
  username,
  email,
  password
) {
  if (!name | !surname | !username | !email | !password) {
    throw Error('All fields must be completed');
  }

  if (!validator.isEmail(email)) {
    throw Error('Enter valid email');
  }

  if (!validator.isStrongPassword(password)) {
    throw Error('Password is weak');
  }

  const exist = await this.findOne({ email });
  if (exist) {
    throw Error('Email already in use');
  }

  const exist2 = await this.findOne({ username });
  if (exist2) {
    throw Error('Username already taken');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = this.create({ name, surname, username, email, password: hash });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email | !password) {
    throw Error('All fields must be entered');
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error('Incorrect email');
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error('Incorrect password');
  }

  return user;
};

userSchema.statics.login2 = async function (email, password) {
  if (!email | !password) {
    throw Error('All fields must be entered');
  }

  const user = await this.findOne({ username: email });

  if (!user) {
    throw Error('Incorrect username');
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error('Incorrect password');
  }

  return user;
};

module.exports = mongoose.model('User', userSchema);
