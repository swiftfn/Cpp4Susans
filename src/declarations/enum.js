const collectEnum = ($, node) => {
  return {
    type: 'enum',
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
