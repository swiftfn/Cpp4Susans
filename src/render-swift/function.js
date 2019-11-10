const {getFunctionName} = require('../render-c/header/function')

const renderOperatorFunction = ($, declaration, render, cppHeaderBaseFileName) => {
  const {node, args} = declaration

  const cFunctionName = getFunctionName(declaration, cppHeaderBaseFileName)

  const opName = node.attr('name')

  const arg0 = args.eq(0).attr('name')
  const arg1 = args.eq(1).attr('name')
  return `infix ${opName}(${arg0}, ${arg1}) -> Double {
  return ${cFunctionName}(${arg0}, ${arg1})
}`
}

const register = (registry) => {
  registry['OPERATORFUNCTION'] = renderOperatorFunction
}

module.exports = {
  register
}
