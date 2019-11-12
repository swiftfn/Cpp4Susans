const {getCDataType} = require('../data')

const {renderArgs} = require('./arg')
const {convertOperatorName} = require('./op')
const {getSuffixes} = require('./overload')

// getContextPath returns empty result because functions are at top level,
// we need to prefix with cppHeaderBaseFileName so that there's no conflict among files
const getFunctionName = ($, declaration, cppHeaderBaseFileName) => {
  const {type, node} = declaration

  const originalName = node.attr('name')
  const convertedName = type == 'OPERATORFUNCTION'
    ? convertOperatorName(originalName)
    : name

  const suffixes = getSuffixes($, declaration)

  const parts = [cppHeaderBaseFileName, convertedName, suffixes]
  return parts.flat().join('_')
}

const renderFunctionSignature = ($, declaration, cppHeaderBaseFileName) => {
  const {args, returns} = declaration
  return (
    getCDataType($, returns) + ' ' +
    getFunctionName($, declaration, cppHeaderBaseFileName) +
    renderArgs($, args)
  )
}

const renderFunctionHeader = ($, declaration, render, cppHeaderBaseFileName) => {
  return renderFunctionSignature($, declaration, cppHeaderBaseFileName) + ';'
}

const register = (registry) => {
  registry['OPERATORFUNCTION'] = renderFunctionHeader
}

module.exports = {
  getFunctionName,
  renderFunctionSignature,
  register
}
