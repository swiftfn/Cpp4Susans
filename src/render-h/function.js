const {FunctionType} = require('../declarations/function')
const {getContextPath, getDataType} = require('../util')

const getFunctionName = (functionType, node) => {
  switch (functionType) {
    case FunctionType.OPERATORFUNCTION:
      // TODO Convert to valid C function name
      return node.attr('name')

    default:
      throw new Error(`Unknown function type: ${functionType}`)
  }
}

const renderArg = ($, arg) => {
  const node = $(arg)
  const name = node.attr('name')
  const typeId = node.attr('type')
  const type = getDataType($, typeId)
  return `${type} ${name}`
}

const renderArgs = ($, args) => {
  let acc = []
  args.each((idx, arg) => {
    acc.push('  ' + renderArg($, arg))
  })
  return acc.join(',\n')
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
  return renderFunctionSignature($, declaration) + ';'
}

const register = (registry) => {
  registry['function'] = renderFunctionHeader
}

module.exports = {
  renderFunctionSignature,
  register
}
