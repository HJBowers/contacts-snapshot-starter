const db = require('./db')

const create = function(user){
  return db.query(`
    INSERT INTO
      users (username, password, role)
    VALUES
      ($1::text, $2::text, $3)
    RETURNING
      *
    `,
    [
      user.username,
      user.password,
      user.role
    ])
    .catch(error => {
      console.error({message: 'Error occurred while executing users.create',
                     arguments: arguments});
      throw error
    });
}

const findById = function(userId){
  return db.any(`
    SELECT * FROM users WHERE id=$1::int LIMIT 1
    `,
    [userId])
    .then( users => users[0])
    .catch(error => {
      console.error({message: 'Error occurred while executing users.findById',
                     arguments: arguments});
      throw error});
}

const findByUsername = function(username){
  return db.any(`
    SELECT * FROM users WHERE username=$1::int LIMIT 1
    `,
    [username])
    .then( users => users[0])
    .catch(error => {
      console.error({message: 'Error occurred while executing users.findByUsername',
                     arguments: arguments});
      throw error});
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
                     arguments: arguments});
      throw error});
}

module.exports = {
  create,
  findById,
  findByUsername,
  destroy
}
