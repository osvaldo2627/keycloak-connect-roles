const iu = require('middleware-if-unless')()
const boom = require('@hapi/boom')
const jwtDecode = require('jwt-decode')

const RESOURCE_ACCESS_KEY = 'resource_access'
const CLIENT_ID = 'client-app'

const middleware = (req, res, next) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    return next(boom.unauthorized('JWT token not present!'))
  }

  const base64 = req.headers.authorization.split(' ')[1]
  const token = jwtDecode(base64)

  req.auth = new module.exports.Auth(token)

  return next()
}

const protect = (roles, client = CLIENT_ID) => (req, res, next) => {
  if (!Array.isArray(roles)) {
    roles = [roles]
  }
  if (!req.auth.isOneOf(client, roles)) {
    return next(boom.forbidden())
  }

  return next()
}

const ROLES = {
  SYS_ADMIN: 'sys-admin',
  USER: 'user'
}

class Auth {
  constructor (token) {
    this.token = token
  }

  getPayload () {
    return this.token
  }

  is (client, role) {
    const resource = this.token[RESOURCE_ACCESS_KEY][client]
    return Boolean(resource && (resource.roles.indexOf(role) >= 0))
  }

  isOneOf (client, roles) {
    const resource = this.token.resource_access[client]
    return Boolean(resource && resource.roles.find(role => roles.indexOf(role) > -1))
  }

  isSysAdmin () {
    return this.is(CLIENT_ID, ROLES.SYS_ADMIN)
  }
}

module.exports = {
  middleware: iu(middleware),
  protect: protect,
  RESOURCE_ACCESS_KEY: RESOURCE_ACCESS_KEY,
  CLIENT_ID,
  ROLES,
  Auth
}
