const {getDataType} = require('../data')
const {renderGroups} = require('../groups')

// C cannot access C++ class members.
// From C, access C++ class objects as opaque pointers, via public methods.
// Example: https://github.com/mono/skia/blob/xamarin-mobile-bindings/src/c/sk_types_priv.h
const renderClassHeader = ($, declaration) => {
  const {node} = declaration
  const name = getDataType($, node)
  return `
typedef struct ${name} ${name};
`
}

// C cann access C++ struct fields directly.
// Just type cast.
const renderStructHeader = ($, declaration, render) => {
  const {node, staticFields, fields} = declaration
  const name = getDataType($, node)
  return `
typedef struct ${name} {
${renderGroups([staticFields, fields], render)}
} ${name};
`
}

const doRender = {
  CLASS: renderClassHeader,
  STRUCT: renderStructHeader
}

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

${doRender[type]($, declaration, render)}

${renderGroups(groups2, render)}
`
}

const register = (registry) => {
  registry['CLASS'] = renderClassStructHeader
  registry['STRUCT'] = renderClassStructHeader
}

module.exports = {
  register
}
