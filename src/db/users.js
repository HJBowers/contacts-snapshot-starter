const db = require('./db')

const createUser = function(contact){
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
      user.password,
    ])
    .catch(error => error);
}

const getUsers = function(){
  return db.query(`
    SELECT
      *
    FROM
      users
    `, [])
    .catch(error => error);
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
  getUsers,
  getUser,
  deleteUser
}
