const {getCDataType} = require('../data')

// C can access C++ struct fields directly.
// Just type cast.
const renderCoreStructHeader = ($, declaration, render) => {
  // Only render non-static fields,
  // because C cannot have static fields
  const {node, fields} = declaration
  const {name} = getCDataType($, node)

  // Fields look better when they are close together;
  // do not use renderGroups, because it renders 2 new lines
  return `typedef struct ${name} {
${fields.map(render).join('\n')}
} ${name};`
}

module.exports = {
  renderCoreStructHeader
}
