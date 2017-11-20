const libphonenumber = require('google-libphonenumber')
const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

function validate(phonenumber) {
  phoneUtil.parse(phonenumber)
  return true
}

function format(phonenumber) {
  const parsedPhonenumber = phoneUtil.parse(phonenumber)
  return phoneUtil.format(parsedPhonenumber, libphonenumber.PhoneNumberFormat.INTERNATIONAL)
}

module.exports = {
  validate,
  format
}
