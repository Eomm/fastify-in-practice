'use strict'

const { fastify } = require('fastify')
const todoPlugin = require('./todo')

module.exports = function buildApplication (config) {
  const app = fastify({
    logger: {
      level: config.logLevel,
      prettyPrint: config.env !== 'production'
    }
  })

  app.register(todoPlugin, config)
  app.register(todoPlugin, {
    prefix: '/acme',
    mongo: config.mongoAcme
  })

  return app
}
