const {getContextPath, getDataType} = require('../util')

const MethodType = {
  CONSTRUCTOR: 'CONSTRUCTOR',
  DESTRUCTOR: 'DESTRUCTOR',
  METHOD: 'METHOD',
  OPERATORMETHOD: 'OPERATORMETHOD'
}

const getMethodType = (node) => {
  const type = node.prop('nodeName')
  const validTypes = Object.keys(MethodType)
  if (!validTypes.includes(type)) {
    throw new Error(`Invalid method type: ${type}`)
  }
  return type
}

const getReturnType = ($, node, methodType) =>
  methodType === MethodType.CONSTRUCTOR
    ? getContextPath($, node)
    : methodType === MethodType.DESTRUCTOR
      ? 'void'
      : getDataType($, node.attr('returns'))

const collectMethod = ($, node) => {
  const methodType = getMethodType(node)
  return {
    type: 'method',
    node,

    isStatic: node.attr('static') === '1',
    methodType,

    returns: getReturnType($, node, methodType),
    args: node.children('Argument')
  }
}

module.exports = {
  MethodType,
  collectMethod
}
