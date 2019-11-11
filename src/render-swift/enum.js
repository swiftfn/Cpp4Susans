const renderValue = ($, value) => {
  const node = $(value)
  const name = node.attr('name')
  const init = node.attr('init')
  return `${name} = ${init}`
}

const renderValues = ($, values) => {
  const acc = []
  values.each((idx, value) => {
    acc.push('  ' + renderValue($, value))
  })
  return acc.join(',\n')
}

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
