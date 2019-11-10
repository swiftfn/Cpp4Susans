const {getContextPath} = require('../../castxml')
const {getCDataType} = require('../data')
const {renderMethodSignature} = require('../header/method')
const {renderArgs} = require('./arg')

const getContainerName = ($, node) =>
  getContextPath($, node).join('.')

const renderContructorBody = ($, declaration) => {
  const {node, args} = declaration
  const className = getContainerName($, node)
  const renderedArgs = renderArgs($, args)
  return `  return new ${className}${renderedArgs};`
}

const renderDestructorBody = () => {
  return `  delete self;`
}

const renderMethodBody = ($, declaration, isOperator) => {
  const {type, node, belongsToClass, isStatic, args, returns} = declaration
  const methodName = node.attr('name')
  const actionName = isOperator ? 'operator' + methodName : methodName
  const renderedArgs = renderArgs($, args)
  const returnType = getCDataType($, returns)
  const subject = isStatic
    ? getContainerName($, node) + '.'
    : belongsToClass ? 'self->' : 'self.'
  const call = `${subject}${actionName}${renderedArgs};`
  return returnType === 'void'
    ? `  ${call}`
    : `  return ${call}`
}

const renderNormalMethodBody = ($, declaration) => {
  return renderMethodBody($, declaration, false)
}

const renderOperatorBody = ($, declaration) => {
  return renderMethodBody($, declaration, true)
}

const renderBody = {
  'CONSTRUCTOR': renderContructorBody,
  'DESTRUCTOR': renderDestructorBody,
  'METHOD': renderNormalMethodBody,
  'OPERATORMETHOD': renderOperatorBody
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
}

module.exports = {
  register
}
