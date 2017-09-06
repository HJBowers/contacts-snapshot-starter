const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const session = require('express-session')
const methodOverride = require('method-override')
const routes = require('./server/routes')
const middlewares = require('./server/middlewares')
const users = require('./models/users')

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

app.use(methodOverride('_method'))

app.use(middlewares.setDefaultResponseLocals)

let sess = {
  key: 'user_sid',
  secret: 'woofmeow',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000
  }
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1)
  sess.cookie.secure = true
}

app.use(session(sess))

app.route('/login')
  .get((request, response) => {
    response.render('users/login')
  })
  .post((request, response) => {
    const { username, password } = request.body
    users.findByUsername(username)
    .then((user) => {
      if (!user) {
        response.redirect('/login')
      } else {
        users.isValidPassword(user.id, password)
        .then((valid) => {
          console.log( 'valid::', valid )
          if (valid) {
            request.session.
            request.session.user = user.id
            response.redirect('/')
          } else {
            response.redirect('/login')
          }
        })
      }
    })
    .catch( error => next(error) )
  })

app.route('/signup')
  .get((request, response) => {
    response.render('users/signup')
  })
  .post((request, response) => {
    const { username, password, admin } = request.body
    console.log( 'request.body::', request.body )
    users.create(username, password, admin)
    response.redirect('/login')
  })

app.use(middlewares.sessionChecker)

app.use('/', routes)

app.use((request, response) => {
  response.render('common/not_found')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
