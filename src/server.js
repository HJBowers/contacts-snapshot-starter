const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const methodOverride = require('method-override')
const routes = require('./server/routes')
const middlewares = require('./server/middlewares')
const config = require('./config').makeConfig()

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(methodOverride('_method'))

app.use(middlewares.setDefaultResponseLocals)

let sess = {
  key: 'user_sid',
  store: new (require('connect-pg-simple')(session))(),
  secret: config.session.secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 10 * 60 * 1000 // 10 minutes
  }
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1)
  sess.cookie.secure = true
}

app.use(session(sess))

app.use('/', routes)

app.use((request, response) => {
  response.render('common/not_found')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
