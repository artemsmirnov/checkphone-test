const Sequelize = require('sequelize')
const config = require('config')
const passwordHelper = require('./helpers/password.helper')

const sequelize = new Sequelize(config.db.name, config.db.user, config.db.pass, {
  host: config.db.host,
  port: config.db.port,
  dialect: 'postgres'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const Phonenumber = sequelize.define('phonenumbers', {
  phonenumber: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  }
}, {
  timestamps: false
})

const User = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  passwordHash: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  timestamps: false
})

User.prototype.setPassword = async function (password) {
  this.passwordHash = await passwordHelper.hash(password)
}

User.prototype.verifyPassword = async function (password) {
  return await passwordHelper.verify(this.passwordHash, password)
}

module.exports = {
  sequelize,
  Phonenumber,
  User
}
