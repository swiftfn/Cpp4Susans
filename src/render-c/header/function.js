const {renderArg, renderArgs} = require('./arg')

const getOptFunctionName = (node) => {
  // TODO Convert to valid C function name
  return node.attr('name') + '_op'
}

const getFunctionName = {
  OPERATORFUNCTION: getOptFunctionName
}

const renderFunctionSignature = ($, declaration, cppHeaderBaseFileName) => {
  const {type, node, returns, args} = declaration
  const name = getFunctionName[type](node)
  return (
    returns + ' ' +
    // getContextPath returns empty result because the function is at top level,
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
