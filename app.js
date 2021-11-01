'use strict'

const fp = require('fastify-plugin')
const todoPlugin = require('./plugins/todo-plugin')

module.exports = fp(async function application (app, opts) {
  await app.register(require('fastify-env'), {
    schema: {
      type: 'object',
      properties: {
        PORT: { type: 'integer', default: 3000 },
        NODE_ENV: { type: 'string' },
        LOG_LEVEL: { type: 'string' },
        MONGO_URL: { type: 'string' },
        MONGO_ACME_URL: { type: 'string' }
      }
    }
  })

  app.register(todoPlugin, {
    mongo: {
      url: app.config.MONGO_URL
    }
  })

  app.register(async function authPlugin (app, opts) {
    app.register(require('./plugins/auth-plugin'))

    // uso di fastify-plugin
    app.register(todoPlugin, {
      prefix: '/acme',
      mongo: {
        url: app.config.MONGO_ACME_URL
      }
    })
  })
})
