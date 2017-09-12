const pgp = require('pg-promise')()
const config = require('../config/config').getConfig()

const connObject = {
  host: config.db.host, //pgp(config.host) equivalent???
  port: config.db.port,
  database: config.db.name
}

const db = pgp(connObject)

module.exports = db
