const router = require('express').Router()
const Project = require('./projects-model')
const {checkId, checkPayload} = require('./projects-middleware')

router.get('/', (req, res, next) => {
  Project.get()
    .then(projects => res.json(projects))
    .catch(next)
})

router.get('/:id', checkId, (req, res, next) => {
  res.json(req.project)
})

router.post('/', checkPayload, (req, res, next) => {
  Project.insert(req.body)
    .then(newProject => res.status(201).json(newProject))
    .catch(next)
})

router.put('/:id', checkPayload, checkId, (req, res, next) => {
  Project.update(req.params.id, req.body)
    .then(updated => res.json(updated))
    .catch(next)
})

/* eslint-disable */
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  })
})
/* eslint-enable */

module.exports = router
