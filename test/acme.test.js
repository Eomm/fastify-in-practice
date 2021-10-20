'use strict'

const t = require('tap')
const build = require('../app')
const helper = require('./helper')
const { basicAuth } = helper

const testConfig = {
  env: 'test',
  logger: false,
  mongo: {
    url: 'mongodb://localhost:27017/test-two'
  },
  mongoAcme: {
    url: 'mongodb://localhost:27017/acme-two'
  }
}

t.test('prepare data', async t => {
  await helper.cleanMongo(testConfig.mongoAcme.url)
})

t.test('check auth', async t => {
  const app = build(testConfig)
  t.teardown(() => app.close())

  t.test('insert', async t => {
    const response = await app.inject({
      method: 'POST',
      url: '/acme/todos',
      payload: {
        text: 'test todo'
      }
    })
    t.equal(response.statusCode, 401)
  })

  t.test('read', async t => {
    const response = await app.inject({
      method: 'GET',
      url: '/acme/todos'
    })

    t.equal(response.statusCode, 401)
  })

  t.test('update', async t => {
    const response = await app.inject({
      method: 'put',
      url: '/acme/todos/' + 'a'.repeat(24),
      payload: {
        done: true
      }
    })
    t.equal(response.statusCode, 401)
  })

  t.test('read todos with wrong token', async t => {
    const response = await app.inject({
      method: 'GET',
      url: '/acme/todos',
      headers: {
        authorization: basicAuth('foo', 'admin')
      }
    })
    t.equal(response.statusCode, 401)
  })
})

t.test('create todo', async t => {
  const app = build(testConfig)
  t.teardown(() => app.close())

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
