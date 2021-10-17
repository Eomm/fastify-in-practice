'use strict'

const build = require('./app')

const config = require('./lib/config')()
const app = build(config)
app.listen(config.listen)
