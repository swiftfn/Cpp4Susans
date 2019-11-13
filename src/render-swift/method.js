const {getMethodName} = require('../render-c/header/method')

const {renderDeclArgs} = require('./arg-decl')
const {renderImplArgs} = require('./arg-impl')
const {getMethodSwiftReturnType} = require('./data')

const renderConstructor = ($, declaration) => {
  const {args} = declaration
  const cName = getMethodName($, declaration)
  const declArgs = renderDeclArgs($, args)
  const implArgs = renderImplArgs($, args)
  return `public init${declArgs} {
  ${cName}${implArgs}
}`
}

const renderDestructor = ($, declaration) => {
  return `public deinit {
}`
}

const renderMethodDecl = ($, declaration) => {
  const {type, node, args, returns} = declaration
  const swiftName = node.attr('name')
  const declArgs = renderDeclArgs($, args)
  const returnType = getMethodSwiftReturnType($, node, type, returns)
  return `public ${swiftName}${declArgs} -> ${returnType}`
}

const renderMethodImpl = ($, declaration) => {
  const {args} = declaration
  const cName = getMethodName($, declaration)
  const implArgs = renderImplArgs($, args)
  return `  return ${cName}${implArgs}`
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
TODO
}`
}

const register = (registry) => {
  registry['CONSTRUCTOR'] = renderConstructor
  registry['DESTRUCTOR'] = renderDestructor
  registry['METHOD'] = renderMethod
  registry['OPERATORMETHOD'] = renderOperatorMethod
  registry['CONVERTER'] = renderOperatorMethod
}

module.exports = {
  register
}
