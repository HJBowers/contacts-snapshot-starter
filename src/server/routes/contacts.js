const contacts = require('../../models/contacts')
const { userHasAccess } = require('../../authorization')
const { renderError, renderUnauthorized } = require('../utils')

const router = require('express').Router()

router.get('/new', (request, response) => {
  const {user} = request.session
  try {
    userHasAccess(user, 'createContact')
    response.render('contacts/new')
  }
  catch(e) {
    renderUnauthorized(response, e)
  }
})

router.post('/', (request, response, next) => {
  const {user} = request.session
  try {
    userHasAccess(user, 'createContact')
    contacts.create(request.body)
    .then(function(contact) {
      if (contact) return response.redirect(`/contacts/${contact[0].id}`)
      next()
    })
    .catch( error => next(error) )
  }
  catch(e) {
    renderUnauthorized(response, e)
  }
})

router.get('/:contactId', (request, response, next) => {
  const contactId = request.params.contactId
  if (!contactId || !/^\d+$/.test(contactId)) return next()
  contacts.findById(contactId)
    .then(function(contact) {
      if (contact) return response.render('contacts/show', { contact })
      next()
    })
    .catch( error => next(error) )
})


router.delete('/:contactId', (request, response, next) => {
  const {user} = request.session
  try {
    userHasAccess(user, 'deleteContact')
    contacts.destroy(contactId)
      .then(function(contact) {
        if (contact) return response.redirect('/')
        next()
      })
    .catch( error => next(error) )
  }
  catch(e) {
    renderUnauthorized(response, e)
  }
})

router.get('/search', (request, response, next) => {
  const query = request.query.q
  contacts.search(query)
    .then(function(contacts) {
      if (contacts) return response.render('contacts/index', { query, contacts })
      next()
    })
    .catch( error => next(error) )
})

module.exports = router
