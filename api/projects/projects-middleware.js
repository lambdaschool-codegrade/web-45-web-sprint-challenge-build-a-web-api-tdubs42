const Project = require('./projects-model')

const checkId = (req, res, next) => {
  Project.get(req.params.id)
    .then(project => {
      if (!project) {
        next({message: 'project with that id not found', status: 404})
      }
      req.project = project
      next()
    })
    .catch(next)
}

const checkPayload = (req, res, next) => {
  if (!req.body.name ||
    !req.body.description ||
    typeof req.body.name !==
    'string' ||
    typeof req.body.description !==
    'string') {
    next({message: 'name and description are required', status: 400})
  }
  next()
}

module.exports = {
  checkId,
  checkPayload
}
