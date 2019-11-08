const {getDataType} = require('../../castxml')
const {renderGroups} = require('./class-struct')

const renderStructHeader = ($, declaration, render) => {
  const {
    node,
    enums, structs, classes,
    staticFields, staticMethods,
    fields,
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
    staticFields,
    fields
  ]

  const groups3 = [
    staticMethods,
    constructors,
    destructors,
    methods,
    operators
  ]

  return `
${renderGroups(groups1, render)}

typedef struct ${name} {
${renderGroups(groups2, render)}
} ${name};

${renderGroups(groups3, render)}
`
}

const register = (registry) => {
  registry['struct'] = renderStructHeader
}

module.exports = {
  register
}
