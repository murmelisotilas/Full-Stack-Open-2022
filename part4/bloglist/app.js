const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const { info, error } = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')

info(`Connecting to ${config.MONGODB_URI}`)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        info('Connected to MongoDB')
    })
    .catch(error => {
        error('Error connecting to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use('/api/blogs', blogsRouter)

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app