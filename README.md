# Contacts Snapshot starter project

## Dev Setup

1. Create your database: `createdb contacts_development`
1. Load your database with the schema: `npm run load_schema`
1. Install your dependencies: `npm install`
1. Run the server: `nodemon`


## Specifications

- All tests use the `contacts_test` database
- All "End to End" and Integrations tests are setup such that the database tables are truncated, and seeded before each test run.
- End to End testing: Test the http routes exposed in the server
  - You have `chai-http` installed
  - A test for the `/` GET route to make sure that the correct page is getting rendered and all the contacts are being received from the database
  - A test for the `/contacts/new` GET route that checks that the correct page is rendered
  - A test for the `/contacts` POST route that saves contact data to the database
  - A test for the `/contacts/:contactId` GET route that makes sure the correct data is returned
  - A test for the `/contacts/:contactId/delete` GET route that makes sure the correct data is deleted
  - A test for the `/search` GET route that checks that the search is returning the correct data and rendering the correct page

- Integration testing: Write tests to test all the database functions
  - A test to test the `createContact` function
  - A test to test the `getContacts` function
  - A test to test the `getContact` function
  - A test to test the `deleteContact` function
  - A test to test the `searchForContact` function

- UI Tests: Use a headless browser testing libary (like PhantomJS)
  - As a user when I navigate to the `/contacts/new` page I should see a form which lets me create a new contact
  - As a user when I submit the form on the `/contacts/new` page, a new contact should be created, and I should be navigated to the `/contacts/:contactId` page for the created contact.
  - As a user when I navigate to the `/` page, I should see a list of contacts on the page
  - As a user when I click on the delete link of a contact, it should confirm my delete action, and if I confirm the action, it should delete the contact.
  - As a user when I visit the home page `/`, and I search for a contact, it should show me a list of contacts


## Resources

- http://cmme.org/tdumitrescu/blog/2014/02/node-sql-testing/
