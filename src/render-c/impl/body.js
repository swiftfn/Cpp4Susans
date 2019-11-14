const {getContextPath} = require('../../castxml/context')

const {getCDataType} = require('../data')

const {renderArgs} = require('./arg')
const {TO_CPP_MACRO, toC} = require('./priv')

const getContainerName = ($, node) =>
  getContextPath($, node).join('::')

const getSubject = ($, declaration, isFunction) => {
  if (isFunction) {
    return ''
  }

  const {node, belongsToClass, isStatic} = declaration
  return isStatic
    ? getContainerName($, node) + '::'
    : belongsToClass ? `${TO_CPP_MACRO}(self)->` : `${TO_CPP_MACRO}(self).`
}

const renderFunctionOrMethodBody = ($, declaration, isFunction, isOperator) => {
  const {node, args, returns} = declaration

  const subject = getSubject($, declaration, isFunction)

  const nodeName = node.attr('name')
  const actionName = isOperator ? 'operator' + nodeName : nodeName

  const renderedArgs = renderArgs($, args)

  const {category: returnCategory, name: returnType} = getCDataType($, returns)

  const call = `${subject}${actionName}${renderedArgs}`

  return returnType === 'void'
    ? `  ${call};`
    : `  return ${toC(returnCategory, call)};`
}

module.exports = {
  getContainerName,
  renderFunctionOrMethodBody
}
