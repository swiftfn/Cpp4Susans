const {FunctionType} = require('../../castxml')
const {getFunctionName, renderFunctionSignature} = require('../header/function')

const renderOperatorFunctionBody = (declaration) => {
  const {node, functionType, args} = declaration
  const op = getFunctionName(functionType, node)
  const arg0 = args.eq(0).attr('name')
  const arg1 = args.eq(1).attr('name')
  return `return ${arg0} ${op} ${arg1}`
}

const renderBody = {
  [FunctionType.OPERATORFUNCTION]: renderOperatorFunctionBody
}

const renderFunctionImpl = ($, declaration) => {
  const {functionType} = declaration
  const body = renderBody[functionType](declaration)
  return `
${renderFunctionSignature($, declaration)} {
  ${body}
}
`
}

const register = (registry) => {
  registry['function'] = renderFunctionImpl
}

module.exports = {
  register
}
