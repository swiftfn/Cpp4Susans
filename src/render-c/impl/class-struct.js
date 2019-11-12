const {renderGroups} = require('../../render-util/groups')

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
  registry['CLASS'] = renderClassStructImpl
  registry['STRUCT'] = renderClassStructImpl
}

module.exports = {
  register
}
