const {getDataType} = require('../../castxml')
const {renderGroups} = require('../groups')

const renderClassStructHeader = ($, declaration, render) => {
  const {
    type,
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

  // C cannot access C++ class members.
  // From C, access C++ class objects as opaque pointers, via public methods.
  // Example: https://github.com/mono/skia/blob/xamarin-mobile-bindings/src/c/sk_types_priv.h
  const renderClass = () => {
    return `
typedef struct ${name} ${name};
`
  }

  // C cann access C++ struct fields directly.
  // Just type cast.
  const renderStruct = () => {
    return `
typedef struct ${name} {
${renderGroups(groups2, render)}
} ${name};
`
  }

  return `
${renderGroups(groups1, render)}

${type === 'class' ? renderClass() : renderStruct()}

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
