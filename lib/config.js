'use strict'

module.exports = async function loadConfig () {
  return {
    env: process.env.NODE_ENV || 'development',
    logLevel: process.env.LOG_LEVEL || 'debug',
    mongo: {
      url: process.env.MONGO_URL || 'mongodb://localhost:27017/test'
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
