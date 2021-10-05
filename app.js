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

  app.register(require('fastify-mongodb'), config.mongo)
  app.register(todoPlugin)

  return app
}
