const collectEnum = ($, node) => {
  return {
    type: 'ENUMERATION',
    node,
    values: node.children('EnumValue')
  }
}

const register = (registry) => {
  registry['ENUMERATION'] = collectEnum
}

module.exports = {
  register
}
