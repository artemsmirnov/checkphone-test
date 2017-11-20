const { validationResult } = require('express-validator/check')
const { matchedData } = require('express-validator/filter')

const fromAsync = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }
  req.matchedData = matchedData(req);

  next();
}

module.exports = {
  fromAsync,
  validationMiddleware
}
