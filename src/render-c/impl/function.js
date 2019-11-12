const {renderFunctionSignature} = require('../header/function')
const {renderFunctionOrMethodBody} = require('./body')

const renderOperatorFunctionBody = ($, declaration) =>
  renderFunctionOrMethodBody($, declaration, true, true)

const renderBody = {
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
  registry['OPERATORFUNCTION'] = renderFunctionImpl
}

module.exports = {
  register
}
