const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// @route    GET /api/auth
// @desc     Get logged in user
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    return res.json({ user });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    return res.status(500).send('Server error');
  }
});

// @route    POST /api/auth
// @desc     Auth user and get token
// @access   Public
router.post(
  '/',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const payload = { user: { id: user.id } };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000000 },
        (err, token) => {
          if (err) throw err;
          return res.json({ token });
        }
      );
      return null;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err.message);
      return res.status(500).send('Server error');
    }
  }
);

module.exports = router;
