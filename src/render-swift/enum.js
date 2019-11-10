const {getCDataType} = require('../render-c/data')

const renderEnum = ($, declaration) => {
  const {node} = declaration
  const swiftType = node.attr('name')
  const cType = getCDataType($, node)

  return `public typealias ${swiftType} = ${cType}`
}

const register = (registry) => {
  registry['ENUMERATION'] = renderEnum
}

module.exports = {
  register
}
