// A function is different from a method,
// it doesn't belong to a class or a struct.
const collectFunction = ($, node) => {
  const functionType = node.prop('nodeName')
  return {
    type: functionType,
    node,
    returns: node.attr('returns'),
    args: node.children('Argument')
  }
}

const register = (registry) => {
  registry['OPERATORFUNCTION'] = collectFunction
}

module.exports = {
  register
}
