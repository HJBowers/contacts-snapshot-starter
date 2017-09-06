const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const session = ('express-session')
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

app.route('/login')
  .get((req, res) => {
    res.render('users/login')
  })
  .post((req, res) => {

  })

app.use('/', routes)

app.use((request, response) => {
  response.render('common/not_found')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
