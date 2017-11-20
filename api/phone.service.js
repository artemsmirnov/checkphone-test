const express = require('express')
const bodyParser = require('body-parser')
const config = require('config')
const { check } = require('express-validator/check')

const {Phonenumber} = require('./db')
const phonenumberHelper = require('./helpers/phonenumber.helper')
const expressHelper = require('./helpers/express.helper')
const oauth2Helper = require('./helpers/oauth2.helper')

const app = express()
app.use(bodyParser.json())

const receivePhonenumberMiddleware = [
  check('phonenumber').custom(phonenumberHelper.validate),
  expressHelper.validationMiddleware,
  function (req, res, next) {
    req.matchedData.phonenumber = phonenumberHelper.format(
      req.matchedData.phonenumber
    )
    next()
  }
]

app.get('/api/phones/list',
  oauth2Helper.authenticateMiddleware('phonenumbers'),
  expressHelper.fromAsync(async function (req, res) {
    const phonenumbers = await Phonenumber.findAll().map(
      phonenumberInstance => phonenumberInstance.phonenumber
    )

    res.send({phonenumbers})
  })
)

app.post('/api/phones/add',
  oauth2Helper.authenticateMiddleware('phonenumbers'),
  receivePhonenumberMiddleware,
  expressHelper.fromAsync(async function(req, res) {
    const {phonenumber} = req.matchedData;

    await Phonenumber.upsert({
      phonenumber: phonenumber
    })

    res.send({phonenumber});
  })
)

app.post('/api/phones/delete',
  oauth2Helper.authenticateMiddleware('phonenumbers'),
  receivePhonenumberMiddleware,
  expressHelper.fromAsync(async function(req, res) {
    const {phonenumber} = req.matchedData;

    const phonenumberInstance = await Phonenumber.find({
      where: { phonenumber }
    })

    if (!phonenumberInstance) {
      res.status(404).send('Not found')
    } else {
      await phonenumberInstance.destroy();
      res.send({})
    }
  })
)

app.post('/api/phones/check',
  receivePhonenumberMiddleware,
  expressHelper.fromAsync(async function(req, res) {
    const {phonenumber} = req.matchedData;

    const exists = (await Phonenumber.count({
      where: {
        phonenumber: phonenumber
      }
    })) !== 0

    res.send({exists});
  })
)

app.listen(config.services.phone.port, function () {
  console.log(`Phone service is listening on port ${config.services.phone.port}`)
})
