const {renderGroups} = require('../../render-util/groups')
const {getDataType} = require('../data')

// C can access C++ struct fields directly.
// Just type cast.
const renderCoreStructHeader = ($, declaration, render) => {
  // C cannot have static fields
  const {node, fields} = declaration
  const name = getDataType($, node)
  return `typedef struct ${name} {
${renderGroups([fields], render)}
} ${name};`
}

module.exports = {
  renderCoreStructHeader
}
