'use strict'

const schemas = require('./lib/schemas')

function todoPlugin (app, opts, next) {
  app.post('/todos', {
    schema: {
      body: schemas.todoSchema
    }
  }, async function insertTodo (request, reply) {
    const todo = request.body
    const todosCollection = this.mongo.db.collection('todos')
    const result = await todosCollection.insertOne(todo)
    reply.code(201)
    return { id: result.insertedId }
  })

  app.get('/todos', function readTodos (request, reply) {
    const todosCollection = this.mongo.db.collection('todos')
    return todosCollection.find().toArray()
  })

  app.put('/todos/:id', {
    schema: {
      params: schemas.todoIdSchema,
      body: schemas.todoUpdateSchema
    }
  }, async function insertTodo (request, reply) {
    const todo = request.body
    const todosCollection = this.mongo.db.collection('todos')
    const result = await todosCollection.updateOne(
      { _id: this.mongo.ObjectId(request.params.id) },
      {
        $set: {
          done: todo.done,
          dateModified: new Date()
        }
      })
    if (result.matchedCount === 0) {
      const error = new Error('Object not found: ' + request.params.id)
      error.status = 404
      throw error
    }
    return { id: request.params.id }
  })

  next()
}

module.exports = todoPlugin
