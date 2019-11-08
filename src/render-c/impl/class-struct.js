const {getDataType} = require('../../castxml')
const {renderGroups} = require('../groups')

const renderClassStructImpl = ($, declaration, render) => {
  const {
    structs, classes,
    staticMethods,
    constructors, destructors,
    methods, operators
  } = declaration

  const groups = [
    structs, classes,
    staticMethods,
    constructors, destructors,
    methods, operators
  ]

  return renderGroups(groups, render)
}

const register = (registry) => {
  registry['class'] = renderClassStructImpl
  registry['struct'] = renderClassStructImpl
}

module.exports = {
  register
}
