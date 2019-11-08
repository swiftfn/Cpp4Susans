const {FunctionType} = require('../declarations/function')
const {getContextPath} = require('../util')

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
  const renderedArgs = args.length === 0
    ? '()'
    : '(\n' + renderArgs($, args) + '\n)'
  return (
    returns + ' ' +
    getContextPath($, node) + '_' + name +
    renderedArgs
  )
}

const renderFunctionHeader = ($, declaration) => {
  return renderFunctionSignature($, declaration) + ';\n'
}

const register = (registry) => {
  registry['function'] = renderFunctionHeader
}

module.exports = {
  renderFunctionSignature,
  register
}
