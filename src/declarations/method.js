const {getContext} = require('../castxml/context')

// A method can belong to a class or a struct.
const collectMethod = ($, node) => {
  const methodType = node.prop('nodeName')

  const parent = getContext($, node)
  const belongsToClass = parent.prop('nodeName') === 'CLASS'

  return {
    type: methodType,
    node,
    belongsToClass,
    isStatic: node.attr('static') === '1',
    args: node.children('Argument'),
    returns: node.attr('returns')
  }
}

const register = (registry) => {
  registry['CONSTRUCTOR'] = collectMethod
  registry['DESTRUCTOR'] = collectMethod
  registry['METHOD'] = collectMethod
  registry['OPERATORMETHOD'] = collectMethod
}

module.exports = {
  register
}
