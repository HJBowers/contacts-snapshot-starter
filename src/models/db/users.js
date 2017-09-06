const db = require('./db')

const create = function(username, password, admin){
  return db.query(`
    INSERT INTO
      users (username, password, admin)
    VALUES
      ($1::text, $2::text, $3)
    RETURNING
      *
    `,
    [
      username,
      password,
      admin
    ])
    .catch(error => {
      console.error({message: 'Error occurred while executing users.create',
                     arguments: arguments})
      throw error
    })
}

const findById = function(userId){
  return db.any(`
    SELECT * FROM users WHERE id=$1::int
    `,
    [userId])
    .then( user => user[0])
    .catch(error => {
      console.error({message: 'Error occurred while executing users.findById',
                     arguments: arguments})
      throw error})
}

const findByUsername = function(username){
  return db.any(`
    SELECT id FROM users WHERE username=$1
    `,
    [username])
    .then( user => user[0])
    .catch(error => {
      console.error({message: 'Error occurred while executing users.findByUsername',
                     arguments: arguments});
      throw error})
}

const isValidPassword = function(userId, password) {
  return findById(userId)
  .then(user => {
    return true
    // bcrypt.compare(password, saltedPassword)
  })
  // .then(res => res)
}

const destroy = function(userId){
  return db.query(`
    DELETE FROM
      users
    WHERE
      id=$1::int
    `,
    [userId])
    .catch(error => {
      console.error({message: 'Error occurred while executing users.destroy',
                     arguments: arguments})
      throw error})
}

module.exports = {
  create,
  findById,
  findByUsername,
  isValidPassword,
  destroy
}
