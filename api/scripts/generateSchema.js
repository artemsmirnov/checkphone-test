const {sequelize} = require('../db');

(async function () {
  await sequelize.sync({force: true})
})().then(() => {
  console.log('Success')
  process.exit(0)
}).catch(error => {
  console.error(error)
  process.exit(1)
})
