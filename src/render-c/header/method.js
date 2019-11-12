const {getContextPath} = require('../../castxml')
const {getMethodCReturnType} = require('../data')

const {renderArgs} = require('./arg')
const {convertOperatorName} = require('./op')
const {getSuffixes} = require('./overload')

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
  const {type, node} = declaration

  const originalName = getOriginalMethodName(type, node)
  const convertedName = type == 'OPERATORMETHOD'
    ? convertOperatorName(originalName)
    : originalName

  const suffixes = getSuffixes($, declaration)

  const parts = [getContextPath($, node), convertedName, suffixes]
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
