const {renderFunctionSignature} = require('../header/function')

const renderOperatorFunctionBody = (declaration) => {
  const {node, args} = declaration
  const opName = node.attr('name')
  const arg0 = args.eq(0).attr('name')
  const arg1 = args.eq(1).attr('name')
  return `return operator${opName}(${arg0}, ${arg1});`
}

const renderBody = {
  OPERATORFUNCTION: renderOperatorFunctionBody
}

const renderFunctionImpl = ($, declaration, render, cppHeaderBaseFileName) => {
  const {type} = declaration
  const body = renderBody[type](declaration)
  return `
${renderFunctionSignature($, declaration, cppHeaderBaseFileName)} {
  ${body}
}
`
}

const register = (registry) => {
  registry['OPERATORFUNCTION'] = renderFunctionImpl
}

module.exports = {
  register
}
