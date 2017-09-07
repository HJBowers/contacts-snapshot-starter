module.exports = (function() {

  let config = {}

  const getEnv = () => {
    return process.env.NODE_ENV
  }

  const makeConfig = () => {
    if (getEnv() === 'development' ) {
      require('dotenv').config({path: __dirname + '/../../.env'})
    }

    config = {
      db: {
        url: process.env.DATABASE_URL,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        name: process.env.DB_NAME
      },
      session: {
        secret: process.env.SESSION_SECRET
      }
    }
    return config
  }

  makeConfig()

  return {
    makeConfig,
    getEnv
  }
})()
