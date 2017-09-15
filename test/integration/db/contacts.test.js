const chai = require('chai')
const expect = chai.expect
const app = require('../../../src/server.js')
const dbTruncate = require('../../helpers/db')
const db = require('../../../src/db/contacts')

const should = chai.should

beforeEach('truncate the DB', () => {
  return dbTruncate()
})

describe('createContact', () => {
  beforeEach('truncate the DB', () => {
    return dbTruncate()
  })

  it('should create a new contact in the database', () => {
    const newContact = {
      first_name: 'Murphy',
      last_name: 'Cat'
    }
    return db.createContact(newContact)
    .then((contactArray) => {
      expect(contactArray).to.be.an('array')
      expect(contactArray[0]).to.eql({ id: 4, first_name: 'Murphy', last_name: 'Cat' })
    })
  })
})

describe('getContacts', () => {
  beforeEach('truncate the DB', () => {
    return dbTruncate()
  })
  it('should get all contacts in the database', () => {
    return db.getContacts()
    .then((res) => {
      expect(res).to.be.an("array")
      expect(res).to.eql([
        {
          "first_name": "Jared",
          "id": 1,
          "last_name": "Grippe"
        },
        {
          "first_name": "Tanner",
          "id": 2,
          "last_name": "Welsh"
        },
        {
          "first_name": "NeEddra",
          "id": 3,
          "last_name": "James"
        }
      ])
    })
  })
})

describe('getContact', () => {
  beforeEach('truncate the DB', () => {
    return dbTruncate()
  })
  it('should get a single contact in the database', () => {
    return db.getContact(1)
    .then((contact) => {
      expect(contact).to.be.an("object")
      expect(contact).to.eql({first_name: "Jared", "id": 1, last_name: "Grippe"})
    })
  })
})

describe('deleteContact', () => {
  beforeEach('truncate the DB', () => {
    return dbTruncate()
  })
  it('should delete a specific contact in the database', () => {
    return db.deleteContact(1)
    .then((contact) => {
      expect(contact).to.eql([])
    })
  })
})

describe('searchForContact', () => {
  beforeEach('truncate the DB', () => {
    return dbTruncate()
  })
  it('should search for a contact in the database', () => {
    return db.searchForContact('j')
    .then((res) => {
      expect(res).to.eql([
       {
         "first_name": "Jared",
         "id": 1,
         "last_name": "Grippe"
       },
       {
         "first_name": "NeEddra",
         "id": 3,
         "last_name": "James"
       }
     ])
    })
  })
})
