const collectField = ($, node) => {
  return {
    type: node.prop('nodeName'),
    node
  }
}

const register = (registry) => {
  registry['FIELD'] = collectField
  registry['VARIABLE'] = collectField
}

module.exports = {
  register
}
