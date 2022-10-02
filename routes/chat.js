const express = require('express');

const router = express.Router();

const requireAuth = require('../middleware/requireAuth');

//Get all files
router.get('/', getNotes);
