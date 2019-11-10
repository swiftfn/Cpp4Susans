const {getMethodName} = require('../render-c/header/method')

const {renderDeclArgs} = require('./arg-decl')
const {getMethodSwiftReturnType} = require('./data')

const renderConstructor = ($, declaration) => {
  return `public init() {
}`
}

const renderDestructor = ($, declaration) => {
  return `public deinit {
}`
}

const renderMethodDecl = ($, declaration) => {
  const {type, node, args, returns} = declaration
  const swiftName = node.attr('name')
  const renderedArgs = renderDeclArgs($, args)
  const returnType = getMethodSwiftReturnType($, node, type, returns)
  return `public ${swiftName}${renderedArgs} -> ${returnType}`
}

const renderMethodImpl = ($, declaration) => {
  const cName = getMethodName($, declaration)
  return `  return ${cName}()`
}

const renderMethod = ($, declaration) => {
  const decl = renderMethodDecl($, declaration)
  const impl = renderMethodImpl($, declaration)
  return `${decl} {
${impl}
}`
}

const renderOperatorMethod = ($, declaration) => {
  return `public op() -> {
}`
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
