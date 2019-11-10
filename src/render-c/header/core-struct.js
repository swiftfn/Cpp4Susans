const {getDataType} = require('../data')
const {renderGroups} = require('../groups')

// C can access C++ struct fields directly.
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

module.exports = {
  renderStructHeader
}
