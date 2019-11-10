const {getCDataType} = require('../data')

const renderValue = ($, value) => {
  const node = $(value)
  const name = node.attr('name')
  const init = node.attr('init')
  return `${name} = ${init}`
}

const renderValues = ($, values) => {
  let acc = []
  values.each((idx, value) => {
    acc.push('  ' + renderValue($, value))
  })
  return acc.join(',\n')
}

const renderEnumHeader = ($, declaration) => {
  const {node, values} = declaration
  const name = getCDataType($, node)
  return `enum ${name} {
${renderValues($, values)}
};`
}

const register = (registry) => {
  registry['ENUMERATION'] = renderEnumHeader
}

module.exports = {
  register
}
