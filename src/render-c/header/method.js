const {withContextPath, getMethodCReturnType} = require('../data')

const {renderArgs} = require('./arg')
const {convertOperatorName} = require('./op')
const {getSuffixes} = require('./overload')

const getOriginalMethodName = (methodType, node) => {
  switch (methodType) {
    // Rely on methodType being included in the final name
    case 'CONSTRUCTOR':
    case 'DESTRUCTOR':
    case 'CONVERTER':
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
    ? originalName.map(convertOperatorName).join('_')
    : originalName.join('_')

  const suffixes = getSuffixes($, declaration)

  const parts = [withContextPath($, node, convertedName), suffixes]
  return parts.flat().join('_')
}

const renderMethodSignature = ($, declaration) => {
  const {type, node, isStatic, args, returns} = declaration

  const methodName = getMethodName($, declaration)
  // console.log('renderMethodSignature', methodName)

  const selfId = !isStatic && type !== 'CONSTRUCTOR'
    ? node.attr('context')
    : undefined
  const renderedArgs = renderArgs($, args, selfId)

  const returnType = getMethodCReturnType($, node, type, returns)

  return returnType + ' ' + methodName + renderedArgs
}

const renderMethodHeader = ($, declaration) => {
  return renderMethodSignature($, declaration) + ';'
}

const register = (registry) => {
  registry['CONSTRUCTOR'] = renderMethodHeader
  registry['DESTRUCTOR'] = renderMethodHeader
  registry['METHOD'] = renderMethodHeader
  registry['OPERATORMETHOD'] = renderMethodHeader
  registry['CONVERTER'] = renderMethodHeader
}

module.exports = {
  getMethodName,
  renderMethodSignature,
  register
}
