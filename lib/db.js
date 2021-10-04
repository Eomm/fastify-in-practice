'use strict'

const fs = require('fs').promises

const dbFileName = './db.json'

function database (options) {
  let isLoaded = false
  let memoryDb = {}

  return {
    insert, update, readAll
  }

  async function insert (obj) {
    const id = Math.random().toString(36).substring(4)
    obj._id = id
    obj.date = new Date()
    memoryDb[id] = obj
    await fs.writeFile(dbFileName, JSON.stringify(memoryDb))
    return id
  }

  async function update (obj) {
    await load()
    if (!memoryDb[obj._id]) {
      const error = new Error('Object not found: ' + obj._id)
      error.status = 404
      throw error
    }
    Object.assign(memoryDb[obj._id], obj)
    await fs.writeFile(dbFileName, JSON.stringify(memoryDb))
    return memoryDb[obj._id]
  }

  async function readAll () {
    await load()
    return Object.values(memoryDb)
  }

  async function load () {
    if (!isLoaded) {
      memoryDb = JSON.parse(await fs.readFile(dbFileName, 'utf8'))
      isLoaded = true
    }
  }
}

module.exports = database
