const renderConstructor = ($, declaration) => {

}

const renderDestructor = ($, declaration) => {

}

const renderMethod = ($, declaration) => {

}

const renderOperatorMethod = ($, declaration) => {

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
