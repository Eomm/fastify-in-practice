'use strict'

const fastify = require('fastify')
const appBuilder = require('../app')

const mongoClean = require('mongo-clean')
const { MongoClient } = require('mongodb')

function build (testConfig) {
  const server = fastify()
  process.env = {
    NODE_ENV: 'development',
    LOG_LEVEL: 'debug',
    MONGO_URL: testConfig.mongo.url,
    MONGO_ACME_URL: testConfig.mongoAcme.url
  }
  server.register(appBuilder)
  return server
}

async function cleanMongo (url) {
  const c = await MongoClient.connect(url, { w: 1 })
  await mongoClean(c.db())
  c.close()
}

function basicAuth (username, password) {
  return 'Basic ' + Buffer.from(username + ':' + password).toString('base64')
}

function to100 (t, build, testConfig) {
  t.test('complete not existing todo', async t => {
    const app = build(testConfig)
    t.teardown(() => app.close())

    const response = await app.inject({
      method: 'put',
      url: '/todos/' + 'a'.repeat(24),
      payload: {
        done: true
      }
    })
    t.equal(response.statusCode, 404)
  })

  t.test('delete not existing todo', async t => {
    const app = build(testConfig)
    t.teardown(() => app.close())

    const response = await app.inject({
      method: 'delete',
      url: '/todos/' + 'a'.repeat(24)
    })
    t.equal(response.statusCode, 404)
  })

  t.test('validation error', async t => {
    const app = build(testConfig)
    t.teardown(() => app.close())

    const response = await app.inject({
      method: 'put',
      url: '/todos/fooo',
      payload: {
        done: true
      }
    })
    t.equal(response.statusCode, 400)
  })
}

module.exports = {
  build,
  cleanMongo,
  to100,
  basicAuth
}
