const {Phonenumber, User} = require('../db');
const phonenumberHelper = require('../helpers/phonenumber.helper');

(async function () {
  const phonenumbers = [
    '+112344444444',
    '+112355555555'
  ]

  for (phonenumber of phonenumbers) {
    await Phonenumber.create({
      phonenumber: phonenumberHelper.format(phonenumber)
    })
  }

  const user = User.build();
  user.username = 'admin'
  await user.setPassword('admin');
  await user.save();
})().then(() => {
  console.log('Success')
  process.exit(0)
}).catch(error => {
  console.error(error)
  process.exit(1)
})
