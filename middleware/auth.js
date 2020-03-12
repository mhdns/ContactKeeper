const jwt = require('jsonwebtoken');
const config = require('config');

/* eslint-disable func-names, space-before-function-paren */
const checkToken = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No Token. Authorization Denied.' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Invalid Token' });
  }
  return null;
};
module.exports = checkToken;
