const renderCoreClass = ($, declaration, renderBody) => {
  return `
public class x {
  var handle: OpaquePointer

${renderBody()}
}
`
}

module.exports = {
  renderCoreClass
}
