const  chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../../src/server.js')

chai.use(chaiHttp)

describe('/', () => {
  it('should return a 200 status code', () => {
    return chai.request(app)
      .get('/')
      .then(res => {
      expect(res).to.have.status(200)
    })
  })
})
