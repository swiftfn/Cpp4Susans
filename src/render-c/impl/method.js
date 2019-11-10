const {getContextPath} = require('../../castxml')
const {getDataType} = require('../data')
const {renderMethodSignature} = require('../header/method')
const {renderArgs} = require('./arg')

const renderContructorBody = ($, declaration) => {

}

const renderDestructorBody = () => {
  return `  delete self;`
}

const renderMethodBody = ($, declaration, isOperator) => {
  const {type, node, isStatic, returns, args} = declaration
  const methodName = node.attr('name')
  const actionName = isOperator ? 'operator' + methodName : methodName
  const renderedArgs = renderArgs($, args)
  const returnType = getDataType($, returns)
  const subject = isStatic
    ? getContextPath($, node).join('.') + '.'
    : type === 'CLASS' ? 'self->' : 'self.'
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
  'METHOD': renderMethodBody,
  'OPERATORMETHOD': renderOperatorBody
}

const renderMethodImpl = ($, declaration) => {
  const {type} = declaration
  return `
${renderMethodSignature($, declaration)} {
${renderBody[type]($, declaration)}
}
`
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
