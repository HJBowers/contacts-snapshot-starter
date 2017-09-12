module.exports = (() => {

  let config = {}

  const getEnv = () {
    return process.env.NODE_ENV
  }

  const makeConfig = () => {
    console.log(process.env)
    if ( getEnv() === 'development') {
      require('dotenv').config({path: __dirname + '/../../.env'})
    }

    config = {
      db = {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        name: process.env.DB_NAME
      }
    }
    return config
  }

  const getConfig = () => {
    return config
  }
  
})
