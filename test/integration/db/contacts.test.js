const chai = require('chai')
const expect = chai.expect
const app = require('../../src/server.js')
const dbTruncate = require('../helpers/db')
const queries = require('../../src/db/contacts')

const should = chai.should

describe.only('createContact', () => {
  it('should create a new contact in the database', () => {
    const newContact = {
      first_name: 'Murphy',
      last_name: 'Cat'
    }
    return queries.createContact(newContact)
    .then((contact) => {
      expect(contact).to.eql(newContact)
    }
  }
})

describe('getContacts', () => {
  it('should get all contacts in the database', () => {

  }
})

describe('getContact', () => {
  it('should get a single contact in the database', () => {

  }
})

describe('deleteContact', () => {
  it('should delete a specific contact in the database', () => {

  }
})

describe('searchForContact', () => {
  it('should search for a contact in the database', () => {

  }
})
