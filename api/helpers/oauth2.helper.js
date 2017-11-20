const jwt = require('jsonwebtoken')
const OAuthServer = require('oauth2-server')
const UnauthorizedRequestError = require('oauth2-server/lib/errors/unauthorized-request-error')
const config = require('config')

const { User } = require('../db')

exports.server = new OAuthServer({
  model: {
    async generateAccessToken(client, user, scope) {
      return jwt.sign({
        type: 'accessToken',
        userId: user.id,
        scope: scope
      }, config.services.auth.jwtSecret, {
        expiresIn: '1d'
      }) // todo throw if not defined
    },
    async generateRefreshToken(client, user, scope) {
      // todo not generate but save to db
      return jwt.sign({
        type: 'refreshToken',
        userId: user.id,
        scope: scope
      }, config.services.auth.jwtSecret) // todo throw if not defined
    },
    getClient(clientId, clientSecret) {
      if (clientId === 'internal') {
        return {
          id: clientId,
          grants: ['password']
        };
      } else {
        return false;
      }
    },
    async getUser(username, password) {
      const user = await User.findOne({
        where: { username }
      })

      if (!user) {
        return false
      }

      if (await user.verifyPassword(password)) {
        return user
      } else {
        return false
      }
    },
    async saveToken(token, client, user) {
      token.client = client
      token.user = user
      return token
    },
    getAccessToken(accessToken) {
      try {
        const decoded = jwt.verify(accessToken, config.services.auth.jwtSecret)
        console.log(decoded)
        return {
          accessToken: accessToken,
          accessTokenExpiresAt: new Date(decoded.exp * 1000),
          scope: decoded.scope,
          client: {id: 'internal'},
          user: {id: decoded.userId}
        }
      } catch (err) {
        return false
      }
    },
    verifyScope(token, scope) {
      return token.scope.split(',').indexOf(scope) !== -1
    }
  },
  grants: ['password'],
  debug: config.services.auth.debug
});

exports.authenticateMiddleware = function (scope) {
  return function (req, res, next) {
    let request = new OAuthServer.Request(req);
    let response = new OAuthServer.Response(res);

    return exports.server.authenticate(request, response, {scope})
      .then(function(token) {
        res.locals.oauth = {token: token};
        next();
      })
      .catch(function(err) {
          if (err instanceof UnauthorizedRequestError) {
            res.status(403).send({
              error: "access_denied"
            })
          } else {
            next(err)
          }
      });
  }
}
