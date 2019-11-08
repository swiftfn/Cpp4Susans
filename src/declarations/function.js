const {getDataType} = require('../castxml')

const FunctionType = {
  OPERATORFUNCTION: 'OPERATORFUNCTION'
}

const collectFunction = ($, node) => {
  const functionType = node.prop('nodeName')
  return {
    type: 'function',
    node,

    functionType,

    returns: getDataType($, node.attr('returns')),
    args: node.children('Argument')
  }
}

const register = (registry) => {
  const functionTypes = Object.keys(FunctionType)
  for (const type of functionTypes) {
    registry[type] = collectFunction
  }
}

module.exports = {
  FunctionType,
  register
}
