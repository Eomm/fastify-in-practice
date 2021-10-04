'use strict'

const { fastify } = require('fastify')
const configLoader = require('./lib/config')
const schemas = require('./lib/schemas')

async function run () {
  const config = await configLoader()

  const app = fastify({
    logger: true
  })

  app.register(require('fastify-mongodb'), config.mongo)

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
      body: schemas.todoSchema
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
    reply.code(201)
    return { id: request.params.id }
  })

  return app.listen(config.listen)
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
