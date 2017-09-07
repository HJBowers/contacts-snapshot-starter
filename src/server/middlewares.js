const errorHandler = (error, request, response, next) => {
  response.status(500).render('common/error');
};

const logErrors = (error, request, response, next) => {
  console.error(error.stack)
  next(error);
};

const notFoundHandler = (request, response) => {
  response.status(404).render('common/not_found', {name: 'Foobar'})
}

const sessionChecker = (request, response, next) => {
  if (!(request.cookies.user_sid && request.session.user)) {
    response.redirect('/login')
  } else {
    next()
  }
}

const setDefaultResponseLocals = (request, response, next) => {
  response.locals.query = ''
  next()
}

module.exports = { errorHandler, logErrors, notFoundHandler, sessionChecker, setDefaultResponseLocals };
