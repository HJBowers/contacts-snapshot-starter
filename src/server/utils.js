const renderError = function(error, response, response){
  response.send(`ERROR: ${error.message}\n\n${error.stack}`)
}

const renderUnauthorized = function(response) {
  response.status(403).send('You do not have access to this page.')
}

module.exports = {renderError, renderUnauthorized}
