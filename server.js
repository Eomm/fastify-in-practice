'use strict'

const { fastify } = require('fastify')
const Db = require('./lib/db')
const app = fastify({ logger: true })

const todoDb = Db({})

app.post('/todos', async function insertTodo (request, reply) {
  const { todo } = request.body
  const id = await todoDb.insert(todo)
  reply.code(201)
  return { id }
})

app.get('/todos', function readTodos (request, reply) {
  return todoDb.readTodos()
})

app.put('/todos/:id', async function insertTodo (request, reply) {
  const { todo } = request.body
  const todoUpdated = await todoDb.update({
    _id: request.params.id,
    done: todo.done
  })
  reply.code(201)
  return todoUpdated
})

app.listen(process.env.PORT || 3000)
