const Contact = require('../models/Contact');

/* eslint-disable func-names, space-before-function-paren */
const checkContact = function (req, res, next) {
  try {
    Contact.findById(req.params.id, (err, contact) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err.message);
        return res.status(500).send('Server error');
      }
      if (contact) {
        req.contact = contact;
        return next();
      }
      return null;
    });
  } catch (err) {
    return res.status(401).json({ msg: err.message });
  }

  return null;
};
module.exports = checkContact;
