const {MethodType} = require('../declarations/method')
const {getContextPath} = require('../castxml')

const {renderArg, renderArgs} = require('./arg')

const getMethodName = (methodType, node) => {
  switch (methodType) {
    case MethodType.CONSTRUCTOR:
      return 'constructor'

    case MethodType.DESTRUCTOR:
      return 'destructor'

    case MethodType.METHOD:
      return node.attr('name')

    case MethodType.OPERATORMETHOD:
      // TODO Convert to valid C function name
      return node.attr('name')

    default:
      throw new Error(`Unknown method type: ${methodType}`)
  }
}

const renderMethodSignature = ($, declaration) => {
  const {node, isStatic, methodType, returns, args} = declaration
  const name = getMethodName(methodType, node)
  const suffix = isStatic ? '_static' : ''
  const self = !isStatic && methodType !== MethodType.CONSTRUCTOR
    ? node.attr('context')
    : undefined
  return (
    returns + ' ' +
    getContextPath($, node) + '_' + name + suffix +
    renderArgs($, args, self)
  )
}

const renderMethodHeader = ($, declaration) => {
  return renderMethodSignature($, declaration) + ';'
}

const register = (registry) => {
  registry['method'] = renderMethodHeader
}

module.exports = {
  renderMethodSignature,
  register
}
