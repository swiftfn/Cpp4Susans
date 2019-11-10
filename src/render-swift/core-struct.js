const {getDataType} = require('../render-c/data')

const renderCoreStruct = ($, declaration, renderBody) => {
  const {node} = declaration
  const swiftType = node.attr('name')
  const cType = getDataType($, node)

  return `
public typealias ${swiftType} = ${cType}

extension ${swiftType} {
${renderBody()}
}
`
}

module.exports = {
  renderCoreStruct
}
