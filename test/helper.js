'use strict'

const mongoClean = require('mongo-clean')
const { MongoClient } = require('mongodb')

async function cleanMongo (url) {
  const c = await MongoClient.connect(url, { w: 1 })
  await mongoClean(c.db())
  c.close()
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
  cleanMongo,
  to100
}
