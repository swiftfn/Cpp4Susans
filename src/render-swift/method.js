const renderConstructor = ($, declaration) => {
  return `init() {...}`
}

const renderDestructor = ($, declaration) => {
  return `deinit {...}`
}

const renderMethod = ($, declaration) => {
  return `method() {...}`
}

const renderOperatorMethod = ($, declaration) => {
  return `op() {...}`
}

const register = (registry) => {
  registry['CONSTRUCTOR'] = renderConstructor
  registry['DESTRUCTOR'] = renderDestructor
  registry['METHOD'] = renderMethod
  registry['OPERATORMETHOD'] = renderOperatorMethod
}

module.exports = {
  register
}
