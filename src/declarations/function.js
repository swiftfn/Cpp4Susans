// A function is different from a method,
// it doesn't belong to a class or a struct.
const collectFunction = ($, node) => {
  const functionType = node.prop('nodeName')
  return {
    type: functionType,
    node,
    args: node.children('Argument'),
    returns: node.attr('returns')
  }
}

const register = (registry) => {
  registry['FUNCTION'] = collectFunction
  registry['OPERATORFUNCTION'] = collectFunction
}

module.exports = {
  register
}
