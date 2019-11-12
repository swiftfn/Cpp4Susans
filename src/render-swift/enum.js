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

const renderEnum = ($, declaration) => {
  const {node, values} = declaration
  const swiftType = node.attr('name')

  return `public enum ${swiftType}: Int32 {
${renderValues($, values)}
}`
}

const register = (registry) => {
  registry['ENUMERATION'] = renderEnum
}

module.exports = {
  register
}
