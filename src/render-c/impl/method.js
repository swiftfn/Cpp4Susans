const {renderMethodSignature} = require('../header/method')

const {renderArgs} = require('./arg')
const {getContainerName, renderFunctionOrMethodBody} = require('./body')
const {TO_C_MACRO} = require('./priv')

const renderContructorBody = ($, declaration) => {
  const {node, args} = declaration
  const className = getContainerName($, node)
  const renderedArgs = renderArgs($, args)
  return `  return ${TO_C_MACRO}(new ${className}${renderedArgs});`
}

const renderDestructorBody = () => {
  return `  delete self;`
}

const renderNormalMethodBody = ($, declaration) => {
  return renderFunctionOrMethodBody($, declaration, false, false)
}

const renderOperatorBody = ($, declaration) => {
  return renderFunctionOrMethodBody($, declaration, false, true)
}

const renderBody = {
  'CONSTRUCTOR': renderContructorBody,
  'DESTRUCTOR': renderDestructorBody,
  'METHOD': renderNormalMethodBody,
  'OPERATORMETHOD': renderOperatorBody,
  'CONVERTER': renderOperatorBody
}

const renderMethodImpl = ($, declaration) => {
  const {type} = declaration
  return `${renderMethodSignature($, declaration)} {
${renderBody[type]($, declaration)}
}`
}

const register = (registry) => {
  registry['CONSTRUCTOR'] = renderMethodImpl
  registry['DESTRUCTOR'] = renderMethodImpl
  registry['METHOD'] = renderMethodImpl
  registry['OPERATORMETHOD'] = renderMethodImpl
  registry['CONVERTER'] = renderMethodImpl
}

module.exports = {
  register
}
