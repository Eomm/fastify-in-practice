'use strict'

const { test, beforeEach } = require('tap')
const mongoClean = require('mongo-clean')
const build = require('../app')

const testConfig = {
  env: 'test',
  logLevel: 'error',
  mongo: {
    url: 'mongodb://localhost:27017/test'
  }
}

beforeEach(async t => {
  if (t.context.app) {
    return
  }
  const app = build(testConfig)
  app.after((err, instance, done) => {
    if (err) throw err
    mongoClean(instance.mongo.db, done)
  })
  t.context.app = app
  t.teardown(() => app.close())
})

test('create todo', async t => {
  const app = t.context.app

  const response = await app.inject({
    method: 'POST',
    url: '/todos',
    payload: {
      text: 'test todo'
    }
  })

  t.equal(response.statusCode, 201)

  const todo = response.json()
  t.ok(todo.id)

  t.test('read todos', async t => {
    const app = t.context.app

    const response = await app.inject({
      method: 'GET',
      url: '/todos'
    })

    t.equal(response.statusCode, 200)
    t.equal(response.json().length, 1)
    t.notOk(response.json()[0].done)
  })

  t.test('complete todos', async t => {
    const app = t.context.app

    const response = await app.inject({
      method: 'put',
      url: '/todos/' + todo.id,
      payload: {
        text: 'test todo',
        done: true
      }
    })
    t.equal(response.statusCode, 200)

    t.test('read updated todos', async t => {
      const app = t.context.app

      const response = await app.inject({
        method: 'GET',
        url: '/todos'
      })

      t.equal(response.statusCode, 200)
      t.equal(response.json().length, 1)
      t.ok(response.json()[0].done)
    })
  })
})
