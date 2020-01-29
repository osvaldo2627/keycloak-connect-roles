
const KConnect = require('./lib')
const { Auth, ROLES } = KConnect

module.exports = {
  init: config => Object.assign(KConnect, config),
  Auth,
  ROLES
}
