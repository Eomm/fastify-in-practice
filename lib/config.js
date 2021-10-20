'use strict'

module.exports = function loadConfig () {
  return {
    env: process.env.NODE_ENV || 'development',
    logger: {
      level: process.env.LOG_LEVEL || 'debug',
      prettyPrint: process.env.NODE_ENV !== 'production'
    },
    mongo: {
      url: process.env.MONGO_URL || 'mongodb://localhost:27017/my-todo-app',
      forceClose: true
    },
    mongoAcme: {
      url: process.env.MONGO_ACME_URL || 'mongodb://localhost:27017/acme'
    },
    listen: {
      host: '0.0.0.0',
      port: process.env.PORT || 8080
    }
  }
}
