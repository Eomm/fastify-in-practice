'use strict'

const { fastify } = require('fastify')
const basicAuth = require('fastify-basic-auth')
const todoPlugin = require('./plugin/todoPlugin')

module.exports = function buildApplication (config) {
  const app = fastify({
    logger: {
      level: config.logLevel,
      prettyPrint: config.env !== 'production'
    }
  })

  app.register(todoPlugin, config)

  app.register(async function authPlugin (app, opts) {
    await app.register(basicAuth, { validate })

    app.addHook('preHandler', app.basicAuth)

    app.register(todoPlugin, {
      prefix: '/acme',
      mongo: config.mongoAcme
    })
  })

  return app
}

function validate (username, password, req, reply, done) {
  if (username === 'admin' && password === 'admin') {
    done()
  } else {
    done(new Error('Winter is coming'))
  }
}
