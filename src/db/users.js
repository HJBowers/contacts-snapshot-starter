const db = require('./db')
const bcrypt = require('bcrypt')
const saltRounds = 10

function saltedPassword(plainTextPassword, saltRounds) {
  bcrypt.hash(myPlaintextPassword, saltRounds)
}

const createUser = function(user){
  saltedPassword(user.password, saltRounds)
  .then(hash => {
    return db.query(`
      INSERT INTO
      users (username, password)
      VALUES
      ($1::text, $2::text)
      RETURNING
      *
      `,
      [
        user.username,
        hash,
      ])
      .catch(error => error);
  })
}

const getUser = function(userId){
  return db.one(`
    SELECT * FROM users WHERE id=$1::int
    `,
    [userId])
    .catch(error => error);
}

const deleteUser = function(userId){
  return db.query(`
    DELETE FROM
      users
    WHERE
      id=$1::int
    `,
    [userId])
    .catch(error => error);
}

module.exports = {
  createUser,
  getUser,
  deleteUser
}
