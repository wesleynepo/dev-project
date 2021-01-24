const config = require('./src/utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./src/utils/logger')
const middleware = require('./src/utils/middleware')
const mongoose = require('mongoose')
const developerRouter = require('./src/routes/developer')
require('express-async-errors')

logger.info('connecting to', config.MONGODB_URI )

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then( () => {
    logger.info('Connected to MongoDB')
  })
  .catch((error) => {
    logger.info('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())

app.use(middleware.queryStringHandler)

app.use('/api/developers', developerRouter )

app.use(middleware.errorHandler)

app.use(middleware.unknownEndpoint)

module.exports = app