const router = require('express').Router()
const Action = require('./actions-model')
const {checkId, checkPayload, checkProjectId} = require('./actions-middlware')

router.get('/', (req, res, next) => {
  Action.get()
    .then(actions => res.json(actions))
    .catch(next)
})

router.get('/:id', checkId, (req, res, next) => {
  res.json(req.action)
})

router.post('/', checkPayload, checkProjectId, (req, res, next) => {
  Action.insert(req.body)
    .then(newAction => res.status(201).json(newAction))
    .catch(next)
})

router.put('/:id', checkPayload, checkProjectId, checkId, (req, res, next) => {
  Action.update(req.params.id, req.body)
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
