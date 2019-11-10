const {renderGroups} = require('../../render-util/groups')
const {getCDataType} = require('../data')

// C can access C++ struct fields directly.
// Just type cast.
const renderCoreStructHeader = ($, declaration, render) => {
  // C cannot have static fields
  const {node, fields} = declaration
  const name = getCDataType($, node)
  return `typedef struct ${name} {
${renderGroups([fields], render)}
} ${name};`
}

module.exports = {
  renderCoreStructHeader
}
