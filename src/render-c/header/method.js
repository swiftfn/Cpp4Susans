const {getContextPath} = require('../../castxml')
const {getMethodCReturnType} = require('../data')
const {renderArgs} = require('./arg')
const {convertOperatorName} = require('./op')

const TAGS = {
  CONSTRUCTOR: ['constructor'],
  DESTRUCTOR: ['destructor'],
  METHOD: ['method'],
  OPERATORMETHOD: ['op', 'method']
}

const getOriginalMethodName = (methodType, node) => {
  switch (methodType) {
    case 'CONSTRUCTOR':
    case 'DESTRUCTOR':
      return []

    case 'METHOD':
    case 'OPERATORMETHOD':
      return [node.attr('name')]
  }
}

const getMethodName = ($, declaration) => {
  const {type, node, isStatic, args} = declaration

  const originalName = getOriginalMethodName(type, node)
  const convertedName = type == 'OPERATORMETHOD'
    ? convertOperatorName(originalName)
    : originalName

  const tag = TAGS[type]

  const suffix = isStatic ? ['static'] : []

  // When there's method overload, there may be duplicate method names.
  // Dedup by simply including arg names to the method name.
  // In the future when there's problem, we can also include arg types.
  const argNames = args.map((idx, arg) => $(arg).attr('name') || `arg${idx}`).get()

  const parts = [getContextPath($, node), convertedName, tag, suffix, argNames]
  return parts.flat().join('_')
}

const renderMethodSignature = ($, declaration) => {
  const {type, node, isStatic, args, returns} = declaration
  const selfId = !isStatic && type !== 'CONSTRUCTOR'
    ? node.attr('context')
    : undefined
  return (
    getMethodCReturnType($, node, type, returns) + ' ' +
    getMethodName($, declaration) +
    renderArgs($, args, selfId)
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
  getMethodName,
  renderMethodSignature,
  register
}
