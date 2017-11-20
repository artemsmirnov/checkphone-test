const bcrypt = require('bcrypt')
const config = require('config')

exports.hash = function (password) {
  return bcrypt.hash(password, config.services.auth.passwordHashRounds)
}

exports.verify = function (hash, password) {
  return bcrypt.compare(password, hash)
}
