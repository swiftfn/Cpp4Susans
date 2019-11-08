const {getDataType} = require('../util')
const {renderGroups} = require('./class-struct')

const renderHeader = ($, declaration) => {
  const {
    node,
    enums, structs, classes,
    staticMethods,
    constructors, destructors,
    methods, operators
  } = declaration

  const name = getDataType($, node)

  const groups1 = [
    enums,
    structs,
    classes
  ]

  const groups2 = [
    staticMethods,
    constructors,
    destructors,
    methods,
    operators
  ]

  return `
${renderGroups(groups1, (member) => member.renderHeader())}

typedef struct ${name} {
  TODO
} ${name};

${renderGroups(groups2, (member) => member.renderHeader())}
`
}

module.exports = {
  renderHeader
}
