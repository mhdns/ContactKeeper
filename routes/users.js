const express = require('express');
const { check, validationResult } = require('express-validator/check');
const User = require('../models/User');

const router = express.Router();

// @route    POST /api/users
// @desc     Register a user
// @access   Public
router.post(
  '/',
  [
    check('name', 'Please add name')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return res.send(req.body);
  }
);

module.exports = router;
