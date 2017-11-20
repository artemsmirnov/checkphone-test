const express = require('express')
const bodyParser = require('body-parser')
const config = require('config')
const OAuthServer = require('oauth2-server')
const InvalidGrantError = require('oauth2-server/lib/errors/invalid-grant-error')
const oauth2Helper = require('./helpers/oauth2.helper')

var app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/auth/login', function (req, res, next) {
  req.body.client_id = 'internal'
  req.body.client_secret = 'internal'

  let request = new OAuthServer.Request(req)
  let response = new OAuthServer.Response(res)

  return oauth2Helper.server.token(request, response, {
    requireClientAuthentication: false
  }).then(function(token) {
    res.send({
      access_token: token.accessToken
    })
  }).catch(function(err) {
    if (err instanceof InvalidGrantError) {
      res.send({
        error: "invalid_credentials"
      })
    } else {
      next(err)
    }
  })
})

app.use((error, req, res, next) => {
  console.log('server error', error);
  res.status(500).send()
})

app.listen(config.services.auth.port, function () {
  console.log(`Auth service is listening on port ${config.services.auth.port}`)
})
