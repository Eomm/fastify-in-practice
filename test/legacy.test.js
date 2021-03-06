'use strict'

const t = require('tap')
const helper = require('./helper')
const { build } = helper

const testConfig = {
  env: 'test',
  logger: false,
  mongo: {
    url: 'mongodb://localhost:27017/test',
    forceClose: true
  },
  mongoAcme: {
    url: 'mongodb://localhost:27017/acme-two'
  }
}

t.test('spin up phase - prepare data', async t => {
  await helper.cleanMongo(testConfig.mongo.url)
})

t.test('create', async t => {
  const app = build(testConfig)
  t.teardown(() => app.close())

  const response = await app.inject({
    method: 'POST',
    url: '/todos',
    payload: {
      text: 'test todo'
    }
  })

  t.equal(response.statusCode, 201)

  const todo = response.json()
  t.ok(todo.id, 'the id has been returned')

  t.test('read', async t => {
    const response = await app.inject({
      method: 'GET',
      url: '/todos'
    })

    t.equal(response.statusCode, 200)
    t.equal(response.json().length, 1)
    t.notOk(response.json()[0].done)
  })

  t.test('update', async t => {
    const response = await app.inject({
      method: 'put',
      url: '/todos/' + todo.id,
      payload: {
        done: true
      }
    })
    t.equal(response.statusCode, 200)
    t.equal(response.json().id, todo.id)
  })

  t.test('delete', async t => {
    const response = await app.inject({
      method: 'delete',
      url: '/todos/' + todo.id
    })
    t.equal(response.statusCode, 200)
    t.equal(response.json().id, todo.id)
  })
})

helper.to100(t, build, testConfig)
