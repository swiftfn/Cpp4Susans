const {getDataType} = require('../../castxml')
const {renderGroups} = require('../groups')

const renderClassStructHeader = ($, declaration, render) => {
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

  const renderClass = () => {
    return `
typedef struct ${name} ${name};
`
  }

  const renderStruct = () => {
    return `
typedef struct ${name} {
${renderGroups(groups2, render)}
} ${name};
`
  }

  return `
${renderGroups(groups1, render)}


${renderGroups(groups3, render)}
`
}

const register = (registry) => {
  registry['class'] = renderClassStructHeader
  registry['struct'] = renderClassStructHeader
}

module.exports = {
  register
}
