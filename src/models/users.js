const db = require('./db/users');

module.exports = {
  create: db.create,
  findById: db.findById,
  findByUsername: db.findByUsername,
  isValidPassword: db.isValidPassword,
  destroy: db.destroy
}
