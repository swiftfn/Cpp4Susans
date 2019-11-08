const {getDataType} = require('../util')
const {renderGroups} = require('./class-struct')

const render = (declaration) => {
  const {
    node,
    enums, structs, classes,
    staticMethods,
    constructors, destructors,
    methods, operators
  } = declaration
  const name = node.attr('name')

  const groups = [
    enums,
    structs,
    classes,
    staticMethods,
    constructors,
    destructors,
    methods,
    operators
  ]

  return `
public class ${name} {
}
`
}

module.exports = {
  render
}
