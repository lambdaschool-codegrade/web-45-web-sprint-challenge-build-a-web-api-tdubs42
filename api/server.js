const express = require('express')
const logger = require('./middleware')
const projectsRouter = require('./projects/projects-router')
const actionsRouter = require('./actions/actions-router')
const helmet = require('helmet')
const server = express()

server.use(express.json())
server.use(helmet())

server.use('/api/projects', logger, projectsRouter)
server.use('/api/actions', logger, actionsRouter)

server.get('*', (req, res) => {
  res.send(`<h1>The Batcave</h1>`)
})

module.exports = server
