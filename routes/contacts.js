const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const checkContact = require('../middleware/contact');
const Contact = require('../models/Contact');
// const User = require('../models/User');

const router = express.Router();

// @route    POST /api/contacts
// @desc     Get all contacts
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id })
      .sort({ date: -1 });
    return res.json(contacts);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    return res.status(500).send('Server error');
  }
});

// @route    POST /api/contacts
// @desc     Get all contacts
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id
      });

      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err.message);
      return res.status(500).send('Server error');
    }
    return null;
  }
);

// @route    PUT /api/contacts/:id
// @desc     Update contact
// @access   Private
router.put('/:id', [auth, checkContact, [
  check('name', 'Name is required')
    .not()
    .isEmpty(),
  check('email', 'Please procide a valid email').isEmail()
]], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { contact } = req;

  contact.name = req.body.name;
  contact.email = req.body.email;
  contact.phone = req.body.phone;
  contact.type = req.body.type;

  contact.save();

  return res.json(contact);
});

// @route    DELETE /api/contacts/:id
// @desc     Delete contact
// @access   Private
router.delete('/:id', (req, res) => {
  res.send('Delete contact');
});

module.exports = router;
