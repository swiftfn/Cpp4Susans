const {renderArg} = require('./arg')

const renderFieldHeader = ($, declaration) => {
  return '  ' + renderArg($, declaration.node) + ';'
}

const register = (registry) => {
  registry['field'] = renderFieldHeader
}

module.exports = {
  register
}
