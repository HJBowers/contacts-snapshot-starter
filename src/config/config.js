module.exports = (() => {

  let config = {}

  const getEnv = () => {
    return process.env.NODE_ENV
  }

  const makeConfig = () => {
    if ( getEnv() === 'development') {
      require('dotenv').config({path: __dirname + '/../../.env'})
    }
    config = {
      db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        name: process.env.DB_NAME
      }
    }
    return config
  }

  makeConfig()

  const getConfig = () => {
    return config
    // return Object.assign({}, config)
    // console.log('config::', config);
    // return JSON.parse(JSON.stringify(config))
  }

  return {
    getConfig,
    getEnv
  }

})()


// var c = require('./config').getConfig()
// console.log('c.db::', c.db);
//
// c.db.host = 'foo'
//
// console.log('c.db::', c.db);
//
// var c2 = require('./config').getConfig()
// console.log('c2.db::', c2.db);
