'use strict'

const todoSchema = {
  type: 'object',
  additionalProperties: false,
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

const todoUpdateSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    done: {
      type: 'boolean',
      default: false
    }
  }
}

const todoIdSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      minLength: 40,
      maxLength: 40
    }
  }
}

module.exports = {
  todoSchema,
  todoUpdateSchema,
  todoIdSchema
}
