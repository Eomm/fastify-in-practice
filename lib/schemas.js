'use strict'

const todoSchema = {
  type: 'object',
  properties: {
    text: {
      type: 'string',
      minLength: 1,
      maxLength: 80
    },
    done: {
      type: 'boolean',
      default: false
    }
  },
  required: ['text']
}

module.exports = {
  todoSchema
}
