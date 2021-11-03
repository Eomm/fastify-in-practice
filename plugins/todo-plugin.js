'use strict'

const schemas = require('../lib/schemas')
const handlers = require('../lib/handlers')

function todoPlugin (app, opts, next) {
  app.register(require('fastify-mongodb'), opts.mongo)

  app.post('/todos', {
    schema: {
      body: schemas.todoInputSchema
    }
  }, handlers.createTodo)

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

  app.delete('/todos/:id', {
    schema: {
      params: schemas.todoIdSchema
    }
  }, handlers.deleteTodo)

  next()
}

module.exports = todoPlugin
