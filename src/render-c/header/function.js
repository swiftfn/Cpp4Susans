const {getDataType} = require('../data')
const {convertOperatorName} = require('../op')
const {renderArg, renderArgs} = require('./arg')

const TAGS = {
  OPERATORFUNCTION: ['op']
}

// getContextPath returns empty result because functions are at top level,
// we need to prefix with cppHeaderBaseFileName so that there's no conflict among files
const getFunctionName = (declaration, cppHeaderBaseFileName) => {
  const {type, node} = declaration
  const originalName = node.attr('name')
  const convertedName = type == 'OPERATORFUNCTION'
    ? convertOperatorName(originalName)
    : name
  const tag = TAGS[type]
  const parts = [cppHeaderBaseFileName, convertedName, tag, 'function']
  return parts.flat().join('_')
}

const renderFunctionSignature = ($, declaration, cppHeaderBaseFileName) => {
  const {returns, args} = declaration
  return (
    getDataType($, returns) + ' ' +
    getFunctionName(declaration, cppHeaderBaseFileName) +
    renderArgs($, args)
  )
}

const renderFunctionHeader = ($, declaration, render, cppHeaderBaseFileName) => {
  return renderFunctionSignature($, declaration, cppHeaderBaseFileName) + ';\n'
}

const register = (registry) => {
  registry['OPERATORFUNCTION'] = renderFunctionHeader
}

module.exports = {
  getFunctionName,
  renderFunctionSignature,
  register
}
