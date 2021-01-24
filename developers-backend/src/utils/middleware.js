const logger = require('./logger')
const MongoQS = require('mongo-querystring')
const qs = new MongoQS({  whitelist:
  { name: true ,
    idade: true,
    sexo: true,
    hobby:true,
    datanascimento:true } } )

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  //logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const queryStringHandler = ( request, _response, next ) => {

  if(request.query){
    const query = qs.parse(request.query)
    request.queryString = query 
  }
  next()
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  queryStringHandler
}