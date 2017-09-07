const router = require('express').Router()
const contactsRoutes = require('./contacts')
const middlewares = require('../middlewares')
const contacts = require('../../models/contacts')
const users = require('../../models/users')

router.route('/login')
  .get((request, response) => {
    const message = request.session.message
    response.render('users/login', { message, admin: false })
  })
  .post((request, response, next) => {
    const { username, password } = request.body
    users.findByUsername(username)
    .then((records) => {
      const user = records[0]
      if (!user) {
        request.session.message = 'That user does not exist, how about signing up?'
        response.redirect('/login')
      } else {
        users.isValidPassword(user.id, password)
        .then((valid) => {
          if (valid) {
            request.session.message = null
            request.session.user = user
            response.redirect('/')
          } else {
            request.session.message = 'Invalid username or password combination. Please try again.'
            response.redirect('/login')
          }
        })
      }
    })
    .catch( error => next(error) )
  })

router.route('/signup')
  .get((request, response) => {
    response.render('users/signup', { admin: false })
  })
  .post((request, response) => {
    const { username, password, admin } = request.body
    users.create(username, password, admin)
    response.redirect('/login')
  })

router.use(middlewares.sessionChecker)

router.get('/', (request, response, next) => {
  const admin = request.session.user.admin || null
  contacts.findAll()
    .then((contacts) => {
      response.render('contacts/index', { contacts, admin })
    })
    .catch( error => next(error) )
})

router.use('/contacts', contactsRoutes)

router.use(middlewares.logErrors)
router.use(middlewares.errorHandler)
router.use(middlewares.notFoundHandler)

module.exports = router
