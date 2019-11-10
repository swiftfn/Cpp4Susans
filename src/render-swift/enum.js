const renderEnum = ($, declaration) => {
  const {node} = declaration
  const name = declaration.attr('name')
  return `public typealias ${name} = ${name}`
}

const register = (registry) => {
  registry['ENUMERATION'] = renderEnum
}

module.exports = {
  register
}
