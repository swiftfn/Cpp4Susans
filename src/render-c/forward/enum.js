const {getCDataType} = require('../data')

const renderValue = ($, value, suffix) => {
  const node = $(value)
  const name = node.attr('name')

  // Enum values need to be unique across all enums, to avoid error:
  // "redefinition of enumerator"
  const uniqueName = name.includes(suffix)
    ? name
    : `${name}_${suffix}`

  const init = node.attr('init')
  return `${uniqueName} = ${init}`
}

const renderValues = ($, values, suffix) =>
  values.map((idx, value) =>
    '  ' + renderValue($, value, suffix)
  ).get().join(',\n')

const renderEnumHeader = ($, declaration) => {
  const {node, values} = declaration
  const {name} = getCDataType($, node)
  return `typedef enum ${name} {
${renderValues($, values, name)}
} ${name};`
}

const register = (registry) => {
  registry['ENUMERATION'] = renderEnumHeader
}

module.exports = {
  register
}
