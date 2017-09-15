require('chromedriver')
const expect = require('chai').expect
const webdriver = require('selenium-webdriver')
const test = require('selenium-webdriver/testing')
const By = webdriver.By
const dbTruncate = require('../helpers/db')

beforeEach('truncate the DB', () => {
  return dbTruncate()
}) //asynchronous bug

test.describe.only('Functional testing', () => {
  const driver = new webdriver.Builder()
      .forBrowser('chrome')
      .build()

  after('reset the test', () => {
    driver.close()
    driver.quit()
  })

  test.it('`/contacts/new` should display a `new contact` form', () => {
    driver.get('http://localhost:3000/contacts/new')
    driver.findElement(By.className('new-contact-form'))
    .then(newFormElement => newFormElement.isDisplayed())
    .then(isNewFormDisplayed => {
      expect(isNewFormDisplayed).to.be.true
    })
  })

  // test.it('submitting a form to /contacts/new should create a new contact and redirect to the /contacts/:contactId page for the created contact', () => {
  //   driver.post('http://localhost:3000/contacts/new')
  //   driver.send({
  //
  //   })
    // })

    test.it('`/` should list all contacts', () => {
      beforeEach('truncate the DB', () => {
        return dbTruncate()
      })
      driver.get('http://localhost:3000/')
      driver.findElement(By.className('contact-list-member'))
      .then(contacts => contacts.isDisplayed())
      .then(areContactsDisplayed => {
        expect(areContactsDisplayed).to.be.true
      })
    })

//Not working
    test.it('when delete button is clicked it should trigger an alert, once confirmed should remove deleted element from contact list', () => {
      beforeEach('truncate the DB', () => {
        return dbTruncate()
      })

      driver.get('http://localhost:3000/contacts/')
      driver.findElement(By.className('delete-contact-1'))
      .then(deleteBtn => deleteBtn.click())
      .then(alert => {
        setTimeout(() => {
          driver.switchTo().alert().accept()
        }, 2000)
      })
      .then(confirmDelete => {
        expect(confirmDelete).to.be.true
      })
  })
})
