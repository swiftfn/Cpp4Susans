const {renderArg} = require('./arg')

const renderFieldHeader = ($, declaration) => {
  return '  ' + renderArg($, declaration.node) + ';'
}

const register = (registry) => {
  registry['FIELD'] = renderFieldHeader
}

module.exports = {
  register
}
