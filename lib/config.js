'use strict'

module.exports = async function loadConfig () {
  return {
    mongo: {
      url: process.env.MONGO_URL || 'mongodb://localhost:27017/test'
    },
    listen: {
      host: '0.0.0.0',
      port: process.env.PORT || 8080
    }
  }
}