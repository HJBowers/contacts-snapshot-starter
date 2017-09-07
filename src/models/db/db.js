const pgp = require('pg-promise')()
const config = require('../../config').makeConfig()

const connectionString = process.env.DATABASE_URL || config.db.url
const db = pgp(connectionString)

module.exports = db
