const {getDataType} = require('../util')

const renderFieldHeader = ($, declaration) => {
  return 'TODO renderFieldHeader'
}

const register = (registry) => {
  registry['field'] = renderFieldHeader
}

module.exports = {
  register
}
