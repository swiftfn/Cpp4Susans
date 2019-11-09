const {FunctionType} = require('../../castxml')
const {renderArg, renderArgs} = require('./arg')

const getFunctionName = (functionType, node) => {
  switch (functionType) {
    case FunctionType.OPERATORFUNCTION:
      // TODO Convert to valid C function name
      return node.attr('name')

    default:
      throw new Error(`Unknown function type: ${functionType}`)
  }
}

const renderFunctionSignature = ($, declaration) => {
  const {node, functionType, returns, args} = declaration
  const name = getFunctionName(functionType, node)
  return (
    returns + ' ' +
    name + '_function' +
    renderArgs($, args)
  )
}

const renderFunctionHeader = ($, declaration) => {
  return renderFunctionSignature($, declaration) + ';\n'
}

const register = (registry) => {
  registry['function'] = renderFunctionHeader
}

module.exports = {
  getFunctionName,
  renderFunctionSignature,
  register
}
