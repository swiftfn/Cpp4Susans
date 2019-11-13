const {getFunctionName} = require('../render-c/header/function')

const {renderDeclArgs} = require('./arg-decl')
const {getMethodSwiftReturnType} = require('./data')

const doRenderFunction = ($, declaration, cppHeaderBaseFileName, isOperator) => {
  const {type, node, args, returns} = declaration

  const cName = getFunctionName($, declaration, cppHeaderBaseFileName)
  const swiftName = node.attr('name')

  const renderedArgs = renderDeclArgs($, args)
  const returnType = getMethodSwiftReturnType($, node, type, returns)

  return `public ${isOperator ? 'infix ' : ''}${swiftName}${renderedArgs} -> ${returnType} {
  return ${cName}()
}`
}

const renderFunction = ($, declaration, render, cppHeaderBaseFileName) =>
  doRenderFunction($, declaration, cppHeaderBaseFileName, false)

const renderOperatorFunction = ($, declaration, render, cppHeaderBaseFileName) =>
  doRenderFunction($, declaration, cppHeaderBaseFileName, true)

const register = (registry) => {
  registry['FUNCTION'] = renderFunction
  registry['OPERATORFUNCTION'] = renderOperatorFunction
}

module.exports = {
  register
}
