const {getFunctionName} = require('../render-c/header/function')

const {renderDeclArgs} = require('./arg-decl')
const {getMethodSwiftReturnType} = require('./data')

const renderOperatorFunction = ($, declaration, render, cppHeaderBaseFileName) => {
  const {type, node, args, returns} = declaration

  const cName = getFunctionName($, declaration, cppHeaderBaseFileName)

  const swiftName = node.attr('name')

  const renderedArgs = renderDeclArgs($, args)

  const returnType = getMethodSwiftReturnType($, node, type, returns)

  return `infix ${swiftName}${renderedArgs} -> ${returnType} {
  return ${cName}()
}`
}

const register = (registry) => {
  registry['OPERATORFUNCTION'] = renderOperatorFunction
}

module.exports = {
  register
}
