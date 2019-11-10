const {getMethodName} = require('../render-c/header/method')

const renderConstructor = ($, declaration) => {
  return `
public init() {
}
`
}

const renderDestructor = ($, declaration) => {
  return `
public deinit {
}
`
}

const renderMethod = ($, declaration) => {
  const {node} = declaration
  const swiftName = node.attr('name')
  const cName = getMethodName($, declaration)
  return `
public ${swiftName}() -> TODO {
  ${cName}()
}
`
}

const renderOperatorMethod = ($, declaration) => {
  return `
public op() -> {
}
`
}

const register = (registry) => {
  registry['CONSTRUCTOR'] = renderConstructor
  registry['DESTRUCTOR'] = renderDestructor
  registry['METHOD'] = renderMethod
  registry['OPERATORMETHOD'] = renderOperatorMethod
}

module.exports = {
  register
}
