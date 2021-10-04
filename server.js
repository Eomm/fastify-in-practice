'use strict'

const { fastify } = require('fastify')

const app = fastify({
  logger: true
})

app.register(require('fastify-mongodb'), {
  url: process.env.MONGODB_URL || 'mongodb://localhost:27017/fastify-mongodb-example'
})

app.post('/todos', async function insertTodo (request, reply) {
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

app.put('/todos/:id', async function insertTodo (request, reply) {
  const todo = request.body
  const todosCollection = this.mongo.db.collection('todos')
  const result = await todosCollection.updateOne({ _id: this.mongo.ObjectId(request.params.id) }, {
    $set: {
      done: todo.done
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

app.listen(process.env.PORT || 8080)
