const {renderParts} = require('../render-util/groups')

const renderValues = ($, values) => {
  const inits = []
  const uniques = []
  const duplicates = []

  values.each((idx, value) => {
    const node = $(value)
    const name = node.attr('name')
    const init = node.attr('init')

    if (inits.includes(init)) {
      duplicates.push(`  public static let ${name} = ${init}`)
    } else {
      uniques.push(`  ${name} = ${init}`)
      inits.push(init)
    }
  })

  return renderParts([uniques.join(',\n'), duplicates.join('\n')])
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
