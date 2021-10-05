'use strict'

const build = require('./app')
const configLoader = require('./lib/config')

async function run () {
  const config = await configLoader()
  const app = build(config)
  return app.listen(config.listen)
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
