const {getCDataType} = require('../data')

const renderValue = ($, value) => {
  const node = $(value)
  const name = node.attr('name')
  const init = node.attr('init')
  return `${name} = ${init}`
}

const renderValues = ($, values) =>
  values.map((idx, value) =>
    '  ' + renderValue($, value)
  ).get().join(',\n')

const renderEnumForwardDeclaration = ($, declaration) => {
  const {node} = declaration
  const {name} = getCDataType($, node)
  return `enum ${name}`
}

const renderEnumHeader = ($, declaration) => {
  const {values} = declaration
  const forward = renderEnumForwardDeclaration($, declaration)
  return `${forward} {
${renderValues($, values)}
};`
}

const register = (registry) => {
  registry['ENUMERATION'] = renderEnumHeader
}

module.exports = {
  renderEnumForwardDeclaration,
  register
}
