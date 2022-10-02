const User = require('../models/userModel');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1d' });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  //Created another function to check username is entered or email
  if (validator.isEmail(email)) {
    try {
      const user = await User.login(email, password);

      const token = createToken(user._id);

      res
        .status(200)
        .json({ email, token, name: user.name, username: user.username });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    try {
      const user = await User.login2(email, password);

      const token = createToken(user._id);

      res.status(200).json({ email: user.email, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

const signupUser = async (req, res) => {
  const { name, surname, username, email, password } = req.body;

  try {
    const user = await User.signup(name, surname, username, email, password);

    const token = createToken(user._id);

    res.status(200).json({ email: user.email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const user_id = req.user._id;

  if (!user_id) {
    throw Error('Login first wit your credential to delete this account');
  }

  const user = await User.findOneAndDelete({ _id: user_id });

  if (!user) {
    res.status(404).json({ error: 'No such User' });
  }
  res.status(200).json(user);
};

module.exports = { loginUser, signupUser, deleteUser };
