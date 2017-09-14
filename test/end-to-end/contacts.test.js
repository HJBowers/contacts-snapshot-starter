const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../../src/server.js')
const dbHelper = require('../helpers/db')
const supertest = require('supertest')
const sinon = require('sinon')
const ejs = require('ejs')
const path = require('path')

const should = chai.should
chai.use(chaiHttp)

describe('/', () => {
  beforeEach('truncate the DB', () => {
    return dbHelper()
  })
  it('should return a 200 status code and checks that the index page is rendered', () => {
    var spy = sinon.spy(ejs, '__express')
    return supertest(app)
    .get('/')
    .expect(200)
    .then(res => {
      expect(spy.calledWith(path.resolve(__dirname + '/../../src/views/index.ejs'))).to.be.true
      spy.restore()
    })
  })
})

describe('/contacts/new', () => {
  beforeEach('truncate the DB', () => {
    return dbHelper()
  })
  it('should return a 200 status code and checks that the new page is rendered', () => {
    var spy = sinon.spy(ejs, '__express')
    return supertest(app)
    .get('/contacts/new')
    .expect(200)
    .then(res => {
      expect(spy.calledWith(path.resolve(__dirname + '/../.,/src/views/new.ejs'))).to.be.true
      spy.restore()
    })
  })
})

describe('/contacts', () => {
  beforeEach('truncate the DB', () => {
    return dbHelper()
  })
  it('should have a body with new contact, and database length should increase by 1', () => {
    return supertest(app)
    .post('/contacts/')
    .send({
      first_name: 'Murphy',
      last_name: 'Cat'
    })
    .then( (res) => {
      console.log("TEST:::", res.headers);
      expect(res.headers.location).to.equal('/contacts/4')
      expect(res).to.have.status(302)
      expect(res).to.redirect
    })
  })
})
