// Custom configs
const ROLES = {
  SYS_ADMIN: 'sys-admin',
  USER: 'user',
  REVIEWER: 'reviewer'
}

const CLIENT_ID = 'client-app'

const KConnect = require('keycloak-connect-roles')
const { Auth } = KConnect

class CustomAuth extends Auth {
  isReviewer () {
    return this.is(KConnect.CLIENT_ID, KConnect.ROLES.REVIEWER)
  }

  isSysAdmin () {
    return this.is(KConnect.CLIENT_ID, KConnect.ROLES.SYS_ADMIN)
  }
}

const init = (config) => Object.assign(KConnect, config)
module.exports = init({ ROLES, CLIENT_ID, Auth: CustomAuth })
