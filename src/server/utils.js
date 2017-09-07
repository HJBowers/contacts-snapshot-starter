const renderError = function(error, response, response){
  response.send(`ERROR: ${error.message}\n\n${error.stack}`)
}

const renderUnauthorized = function(response, error) {
  response.status(403).render('common/unauthorized', { error, admin: null })
}

module.exports = {renderError, renderUnauthorized}
