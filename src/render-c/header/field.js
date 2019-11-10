const {renderArg} = require('./arg')

// TODO Add getter and setter for static field

const renderFieldHeader = ($, declaration) => {
  return '  ' + renderArg($, declaration.node) + ';'
}

const register = (registry) => {
  registry['FIELD'] = renderFieldHeader
}

module.exports = {
  register
}
