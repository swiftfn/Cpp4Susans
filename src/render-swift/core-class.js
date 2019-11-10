const renderCoreClass = ($, declaration, renderBody) => {
  const {node} = declaration
  const swiftType = node.attr('name')

  return `
public class ${swiftType} {
  var handle: OpaquePointer

${renderBody()}
}
`
}

module.exports = {
  renderCoreClass
}
