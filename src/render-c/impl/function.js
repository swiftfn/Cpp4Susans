const {renderFunctionSignature} = require('../header/function')
const {renderFunctionOrMethodBody} = require('./body')

const renderFunctionBody = ($, declaration) =>
  renderFunctionOrMethodBody($, declaration, true, false)

const renderOperatorFunctionBody = ($, declaration) =>
  renderFunctionOrMethodBody($, declaration, true, true)

const renderBody = {
  FUNCTION: renderFunctionBody,
  OPERATORFUNCTION: renderOperatorFunctionBody
}

const renderFunctionImpl = ($, declaration, render, cppHeaderBaseFileName) => {
  const {type} = declaration
  const body = renderBody[type]($, declaration)
  return `${renderFunctionSignature($, declaration, cppHeaderBaseFileName)} {
${body}
}`
}

const register = (registry) => {
  registry['FUNCTION'] = renderFunctionImpl
  registry['OPERATORFUNCTION'] = renderFunctionImpl
}

module.exports = {
  register
}
