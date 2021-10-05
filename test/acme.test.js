'use strict'

const { test, beforeEach } = require('tap')
const mongoClean = require('mongo-clean')
const { MongoClient } = require('mongodb')
const build = require('../app')

const testConfig = {
  env: 'test',
  logLevel: 'error',
  mongo: {
    url: 'mongodb://localhost:27017/test-two'
  },
  mongoAcme: {
    url: 'mongodb://localhost:27017/acme-two'
  }
}

beforeEach(async t => {
  if (t.context.app) {
    return
  }

  const c1 = await MongoClient.connect(testConfig.mongo.url, { w: 1 })
  await mongoClean(c1.db())
  c1.close()

  const c2 = await MongoClient.connect(testConfig.mongoAcme.url, { w: 1 })
  await mongoClean(c2.db())
  c2.close()

  const app = build(testConfig)
  t.context.app = app
  t.teardown(() => app.close())
})

test('check auth', async t => {
  const app = t.context.app

  const response = await app.inject({
    method: 'POST',
    url: '/acme/todos',
    payload: {
      text: 'test todo'
    }
  })

  t.equal(response.statusCode, 401)

  t.test('read todos', async t => {
    const app = t.context.app

    const response = await app.inject({
      method: 'GET',
      url: '/acme/todos'
    })

    t.equal(response.statusCode, 401)
  })

  t.test('read todos with wrong token', async t => {
    const app = t.context.app

    const response = await app.inject({
      method: 'GET',
      url: '/acme/todos',
      headers: {
        authorization: basicAuth('foo', 'admin')
      }
    })

    t.equal(response.statusCode, 401)
  })

  t.test('complete todos', async t => {
    const app = t.context.app

    const response = await app.inject({
      method: 'put',
      url: '/acme/todos/' + 'a'.repeat(24),
      payload: {
        done: true
      }
    })
    t.equal(response.statusCode, 401)
  })
})

test('create todo', async t => {
  const app = t.context.app

  const response = await app.inject({
    method: 'POST',
    url: '/acme/todos',
    payload: {
      text: 'test todo'
    },
    headers: {
      authorization: basicAuth('admin', 'admin')
    }
  })

  t.equal(response.statusCode, 201)

  const todo = response.json()
  t.ok(todo.id)

  t.test('read todos', async t => {
    const app = t.context.app

    const response = await app.inject({
      method: 'GET',
      url: '/acme/todos',
      headers: {
        authorization: basicAuth('admin', 'admin')
      }
    })

    t.equal(response.statusCode, 200)
    t.equal(response.json().length, 1)
    t.notOk(response.json()[0].done)
  })

  t.test('complete todos', async t => {
    const app = t.context.app

    const response = await app.inject({
      method: 'put',
      url: '/acme/todos/' + todo.id,
      payload: {
        done: true
      },
      headers: {
        authorization: basicAuth('admin', 'admin')
      }
    })
    t.equal(response.statusCode, 200)

    t.test('read updated todos', async t => {
      const app = t.context.app

      const response = await app.inject({
        method: 'GET',
        url: '/acme/todos',
        headers: {
          authorization: basicAuth('admin', 'admin')
        }
      })

      t.equal(response.statusCode, 200)
      t.equal(response.json().length, 1)
      t.ok(response.json()[0].done)
    })
  })
})

function basicAuth (username, password) {
  return 'Basic ' + Buffer.from(username + ':' + password).toString('base64')
}
