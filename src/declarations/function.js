const {getDataType} = require('../castxml')

const collectFunction = ($, node) => {
  const functionType = node.prop('nodeName')
  return {
    type: functionType,
    node,
    returns: getDataType($, node.attr('returns')),
    args: node.children('Argument')
  }
}

const register = (registry) => {
  registry['OPERATORFUNCTION'] = collectFunction
}

module.exports = {
  register
}
