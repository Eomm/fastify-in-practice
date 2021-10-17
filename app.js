'use strict'

const { fastify } = require('fastify')
const todoPlugin = require('./plugins/todo-plugin')

module.exports = function buildApplication (config) {
  const app = fastify({
    logger: {
      level: config.logLevel,
      prettyPrint: config.env !== 'production'
    }
  })

  app.register(todoPlugin, config)

  app.register(async function authPlugin (app, opts) {
    app.register(require('./plugins/auth-plugin'))

    // uso di fastify-plugin
    app.register(todoPlugin, {
      prefix: '/acme',
      mongo: config.mongoAcme
    })
  })

  return app
}
