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
  const {name, description, completed} = req.body
  if (!name ||
    !description ||
    completed === undefined ||
    typeof name !==
    'string' ||
    typeof description !==
    'string' ||
    typeof completed !==
    'boolean') {
    next({message: 'name, description and completed are required', status: 400})
  }
  next()
}

module.exports = {
  checkId,
  checkPayload
}
