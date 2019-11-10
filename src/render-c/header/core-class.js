const {getDataType} = require('../data')

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

module.exports = {
  renderClassHeader
}
