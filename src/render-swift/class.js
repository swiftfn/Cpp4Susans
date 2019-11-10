const renderClass = (declaration) => {
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

const register = (registry) => {
  registry['CLASS'] = renderClass
}

module.exports = {
  register
}
