const {getDataType} = require('../util')
const {renderGroups} = require('./class-struct')

const renderImpl = (declaration) => {
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
  return renderGroups(groups, (member) => member.renderImpl())
}

module.exports = {
  renderImpl
}
