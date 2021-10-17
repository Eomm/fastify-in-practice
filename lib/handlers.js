'use strict'

async function insertTodo (request, reply) {
  const todo = request.body // es: //  { text: '$(text)' }
  const todosCollection = this.mongo.db.collection('todos')
  const result = await todosCollection.insertOne(todo)
  reply.code(201)
  return { id: result.insertedId }
}

function readTodos (request, reply) {
  const todosCollection = this.mongo.db.collection('todos')
  return todosCollection.find().toArray().then(docs => {
    return docs.map(d => {
      d.id = d._id.toString()
      return d
    })
  })
}

async function updateTodo (request, reply) {
  const todo = request.body // es: { done: true }
  const todosCollection = this.mongo.db.collection('todos')
  const result = await todosCollection.updateOne(
    { _id: this.mongo.ObjectId(request.params.id) },
    {
      $set: {
        done: todo.done
      }
    })
  if (result.matchedCount === 0) {
    const error = new Error('Object not found: ' + request.params.id)
    error.status = 404
    throw error
  }
  return { id: request.params.id }
}

module.exports = {
  insertTodo,
  readTodos,
  updateTodo
}
