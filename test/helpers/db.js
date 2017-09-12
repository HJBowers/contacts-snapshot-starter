require('../config/env')
const db = require('../../src/db/db')
const QueryFile = require('pg-promise').QueryFile
const path = require('path')
const fs = require('fs')

const sql = (file) => {
  const fullPath = path.join(__dirname, file)
  return new QueryFile(fullPath)
}

const seedFiles = {
  contacts: sql('../seed/contacts.sql')
}

const truncateTables = () => {
 const tables = ['contacts']
 return Promise.all(tables.map((table) => {
   db.none(`TRUNCATE ${table} RESTART IDENTITY`)
 }))
}

const seedTables = () => {
  return db.none(seedFiles.contacts)
}

const initDB = () => {
  return truncateTables()
  .then(() => {
    return seedTables()
  })
}

module.exports = initDB
