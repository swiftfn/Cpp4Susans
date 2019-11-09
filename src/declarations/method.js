const collectMethod = ($, node) => {
  const methodType = node.prop('nodeName')
  return {
    type: methodType,
    node,
    isStatic: node.attr('static') === '1',
    returns: node.attr('returns'),
    args: node.children('Argument')
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
