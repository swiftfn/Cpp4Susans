const {getDataType} = require('../../castxml')
const {renderGroups} = require('./class-struct')

const renderClassHeader = ($, declaration, render) => {
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
${renderGroups(groups1, render)}

typedef struct ${name} ${name};

${renderGroups(groups2, render)}
`
}

const register = (registry) => {
  registry['class'] = renderClassHeader
}

module.exports = {
  register
}
