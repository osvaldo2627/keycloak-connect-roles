# keycloak-roles-connect
Connect-like middleware for authorization and roles management. 
This module can be easily extended to handler any kind of JWT Roles specification and clients.
However the base config and implementation takes in consideration the way that keyclock:Oauth2 generate
roles by clients in JWT tokens.

> This middleware does NOT `verify` JWT tokens, It is intended to be use for services that stand behind an `api-gateway` that handler authentication.

## Basic Usage
```js
const { middleware, protect } = require('keycloak-connect-roles')
app.use(middleware)

// middleware based role check
app.get('/admin', protect('sys-admin'), (req, res) => {
    ...
})

// middleware based roles check for the client
app.get('/profile', protect(['sys-admin', 'reviewer']), (req, res) => {
    ...
})

// middleware based role check for custom client
const clientId = 'yourclientid'
app.get('/admin', protect('role', clientId), (req, res) => {
    ...
})

// programmatic client role check
app.get('/admin', (req, res) => {
    if (!req.auth.isSysAdmin()) {
        // forbidden
    }
})

// programmatic custom client role check
app.get('/admin', (req, res) => {
    if (!req.auth.is('client', 'role')) {
        // forbidden
    }
})

// programmatic custom client roles check
app.get('/admin', (req, res) => {
    if (!req.auth.isOneOf('client', ['role1', 'role2'])) {
        // forbidden
    }
})
```

### Checks Shortcuts
```js
    expect(req.auth.isSysAdmin()).toEqual(true)
    expect(req.auth.reviewer()).toEqual(false)
```

### Setting up and extending sample
```js
//Adding custome roles for the application
const ROLES = {
  SYS_ADMIN: 'sys-admin',
  USER: 'user',
  REVIEWER: 'reviewer'
}

//Keycloack client id
const CLIENT_ID = 'client-app'

const KConnect = require('keycloak-connect-roles')
const { Auth } = KConnect

/**
 * Extending Auth class to add the isReviewer shortcut, and to overwrite
 * default behavior of isSysAdmin.
 * Please take a look to the samples folder for an example of how 
 * the module can be configure 
*/
class CustomAuth extends Auth {
  isReviewer () {
    return this.is(KConnect.CLIENT_ID, KConnect.ROLES.REVIEWER)
  }

  isSysAdmin () {
    return this.is(KConnect.CLIENT_ID, KConnect.ROLES.SYS_ADMIN)
  }
}

```
