'use strict'

const { fastify } = require('fastify')
const schemas = require('./lib/schemas')
const handlers = require('./lib/handlers')

const app = fastify({
  logger: {
    level: 'info',
    prettyPrint: true
  }
})

app.register(require('fastify-mongodb'), {
  url: 'mongodb://localhost:27017/my-todo-app',
  forceClose: true
})

app.post('/todos', {
  schema: {
    body: schemas.todoInputSchema
  }
}, handlers.insertTodo)

app.get('/todos', {
  schema: {
    response: {
      200: schemas.todosArraySchema
    }
  }
}, handlers.readTodos)

app.put('/todos/:id', {
  schema: {
    params: schemas.todoIdSchema,
    body: schemas.todoUpdateSchema
  }
}, handlers.updateTodo)

app.listen(8080)
