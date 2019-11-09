const {getContextPath} = require('../../castxml')
const {convertOperatorName} = require('../op')

const {renderArg, renderArgs} = require('./arg')

const getMethodName = (methodType, node) => {
  switch (methodType) {
    case 'CONSTRUCTOR':
      return 'constructor'

    case 'DESTRUCTOR':
      return 'destructor'

    case 'METHOD':
      return node.attr('name') + '_method'

    case 'OPERATORMETHOD':
      const opName = node.attr('name')
      return convertOperatorName(opName) + '_op_method'
  }
}

const renderMethodSignature = ($, declaration) => {
  const {type, node, isStatic, returns, args} = declaration
  const name = getMethodName(type, node)
  const suffix = isStatic ? '_static' : ''
  const self = !isStatic && type !== 'CONSTRUCTOR'
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
  registry['CONSTRUCTOR'] = renderMethodHeader
  registry['DESTRUCTOR'] = renderMethodHeader
  registry['METHOD'] = renderMethodHeader
  registry['OPERATORMETHOD'] = renderMethodHeader
}

module.exports = {
  renderMethodSignature,
  register
}
