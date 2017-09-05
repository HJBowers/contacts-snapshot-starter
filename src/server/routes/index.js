const router = require('express').Router();
const contacts = require('./contacts')
const DbContacts = require('../../db/contacts');

router.get('/', (request, response) => {
  DbContacts.getContacts()
    .then((contacts) => {response.render('index', { contacts })})
    .catch( err => console.log('err', err) )
})

router.use('/contacts', contacts); // /contacts/search

// route for user login
router.get('/login', (request, response) => {
  response.render('login')
})

router.post('/login', (request, response) => {
  response.render('login')
})

router.get('/signup', (request, response) => {
  response.render('signup')
})

router.post('/signup', (request, response) => {
  response.render('signup')
})

module.exports = router;
