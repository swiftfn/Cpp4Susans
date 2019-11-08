const collectEnum = ($, node) => {
  return {
    type: 'enum',
    node,
    values: node.children('EnumValue')
  }
}

module.exports = {
  collectEnum
}
