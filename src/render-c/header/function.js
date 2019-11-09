const {getDataType} = require('../data')
const {convertOperatorName} = require('../op')
const {renderArg, renderArgs} = require('./arg')

const getOpFunctionName = (node) => {
  const opName = node.attr('name')
  return convertOperatorName(opName) + '_op'
}

const getFunctionName = {
  OPERATORFUNCTION: getOpFunctionName
}

const renderFunctionSignature = ($, declaration, cppHeaderBaseFileName) => {
  const {type, node, returns, args} = declaration
  const name = getFunctionName[type](node)
  return (
    getDataType($, returns) + ' ' +
    // getContextPath returns empty result because functions are at top level,
    // we need to prefix with cppHeaderBaseFileName so that there's no conflict among files
    cppHeaderBaseFileName + '_' + name + '_function' +
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
  renderFunctionSignature,
  register
}
