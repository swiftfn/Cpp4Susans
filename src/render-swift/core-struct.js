const renderCoreStruct = ($, declaration, renderBody) => {
  return `
public typealias x = x

public extension x {
${renderBody()}
}
`
}

module.exports = {
  renderCoreStruct
}
