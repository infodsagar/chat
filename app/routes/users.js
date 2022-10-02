const express = require('express');

const router = express.Router();

const requireAuth = require('../middleware/requireAuth');

const {
  loginUser,
  signupUser,
  deleteUser,
} = require('../controllers/userController');

router.post('/login', loginUser);

router.post('/signup', signupUser);

//Midleware auth req
router.use(requireAuth);

router.delete('/delete', deleteUser);

module.exports = router;
