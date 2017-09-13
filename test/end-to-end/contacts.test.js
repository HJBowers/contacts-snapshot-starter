const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../../src/server.js')
const dbHelper = require('../helpers/db')
const supertest = require('supertest')
const sinon = require('sinon')
const ejs = require('ejs')
const path = require('path')

chai.use(chaiHttp)

describe('/', () => {
  beforeEach('truncate the DB', () => {
    return dbHelper()
  })

  it('should return a 200 status code and checks that the correct page is rendered', () => {
    var spy = sinon.spy(ejs, '__express')

    return supertest(app)
    .get('/')
    .expect(200)
    .then(res => {
      //console.log(spy);
      expect(spy.calledWith(path.resolve(__dirname + '/../../src/views/index.ejs'))).to.be.true
      spy.restore()
    })
  })

})
