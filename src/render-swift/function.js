const {getFunctionName} = require('../render-c/header/function')
const {getMethodSwiftReturnType} = require('./data')

const renderOperatorFunction = ($, declaration, render, cppHeaderBaseFileName) => {
  const {type, node, args, returns} = declaration

  const cFunctionName = getFunctionName(declaration, cppHeaderBaseFileName)

  const opName = node.attr('name')

  const arg0 = args.eq(0).attr('name')
  const arg1 = args.eq(1).attr('name')

  const returnType = getMethodSwiftReturnType($, node, type, returns)

  return `infix ${opName}(${arg0}, ${arg1}) -> ${returnType} {
  return ${cFunctionName}(${arg0}, ${arg1})
}`
}

const register = (registry) => {
  registry['OPERATORFUNCTION'] = renderOperatorFunction
}

module.exports = {
  register
}
