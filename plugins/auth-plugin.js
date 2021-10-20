'use strict'

const breakEncapsulation = require('fastify-plugin') // formerly fp

async function authPlugin (app, opts) {
  await app.register(require('fastify-basic-auth'), { validate })
  app.addHook('preHandler', app.basicAuth)
}

module.exports = breakEncapsulation(authPlugin)

function validate (username, password, req, reply, done) {
  if (username === 'admin' && password === 'admin') {
    done()
  } else {
    done(new Error('Winter is coming'))
  }
}
