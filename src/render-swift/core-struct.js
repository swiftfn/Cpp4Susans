const {getCDataType} = require('../render-c/data')

const renderCoreStruct = ($, declaration, renderBody) => {
  const {node} = declaration
  const swiftType = node.attr('name')
  const cType = getCDataType($, node).name

  return `public typealias ${swiftType} = ${cType}

extension ${swiftType} {
${renderBody()}
}`
}

module.exports = {
  renderCoreStruct
}
