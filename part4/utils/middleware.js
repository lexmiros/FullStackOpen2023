const logger = require('./logger')
const jwt = require("jsonwebtoken")
const config = require("../utils/config")

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const auth = request.get("authorization")
 
  if (!auth) {
    return next()
  }
  if (!auth.startsWith("Bearer ")) {
    return response.status(401).json({error: "Invalid token type"})
  }

  request.token = auth.replace("Bearer ", "");
  next()
}

const extractUser = (request, response, next) => {
  if (!request.token) {
    return next()
  }
  const decodedToken = jwt.verify(request.token, config.SECRET)
  request.user = decodedToken.id.toString()

  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  extractUser
}