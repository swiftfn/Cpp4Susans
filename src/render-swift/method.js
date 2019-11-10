const {getMethodName} = require('../render-c/header/method')
const {getMethodSwiftReturnType} = require('./data')

const renderConstructor = ($, declaration) => {
  return `public init() {
}`
}

const renderDestructor = ($, declaration) => {
  return `public deinit {
}`
}

const renderMethod = ($, declaration) => {
  const {type, node, returns} = declaration
  const swiftName = node.attr('name')
  const cName = getMethodName($, declaration)
  const returnType = getMethodSwiftReturnType($, node, type, returns)
  return `public ${swiftName}() -> ${returnType} {
  ${cName}()
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
