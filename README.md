# Contacts Snapshot starter project

## Dev Setup

1. Create your database: `createdb contacts_development`
2. Load your database with the schema: `npm run load_schema`
3. Install your dependencies: `npm install`
4. Run the server: `nodemon`



## Specifications

#### Authentication
- [x] Create a signup page with a form (links to the login page)
- [x] Create a login page with a form (links to the signup page)

- [x] Passwords are encrypted with bcrypt
- [x] Create a user table in the database -with Authorization role

- [x] Express-session is used to store sessions on the server side. Notice the differences between storing sessions on client side(using cookie-session) vs storing sessions on the server side (using express-session)
- [x] Redirect users who are not logged in to the login page (Make sure not logged in users can't see any of the pages or data other than the login and signup pages)
- [x] When a user signs up, a new user row is created in the user table
- [x] When a user logs in, their username and password are validated in the user table.
- [x] If the username/password combo doesn't exist or is invalid, the user receives an error.


#### Authorization
- [x] A user should have a role associated to it. The values are admin or regular.
- [x] Only a user with an admin role should be able to create a new contact.
- [x] If the logged in user is not an admin, going to the route /contacts/new should return a status code 403.
- [x] Only a user with an admin role should be able to delete a contact.
- [ ] If the logged in user is not an admin, going to the route /contacts/delete/:contactId should return a status code 403. The delete links on the page should not be shown if the logged in user is not an admin.

## Stretch Specs
- [ ] If you use express-session, use a persistent session store https://www.npmjs.com/package/connect-pg-simple to store the sessions (instead of the default in memory store that express-session uses)
- [ ] Add schema migrations for your database using https://github.com/theoephraim/node-pg-migrate
- [ ] A user should be able to have more than one role. For example, a user can have roles reporter, and editor, which would give them access to the resources that are available to both those roles.

## Resources
https://en.wikipedia.org/wiki/HTTP_403
