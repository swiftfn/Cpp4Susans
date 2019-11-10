const {getContextPath} = require('../castxml')

const withContextPath = ($, node, name) => {
  const path = getContextPath($, node).join('_')
  const prefix = path ? path + '_' : ''
  return prefix + name
}

const getCDataType = ($, idOrNode) => {
  const node = typeof idOrNode === 'string' ? $(`[id="${idOrNode}"]`) : idOrNode
  const nodeName = node.prop('nodeName')
  const type = node.attr('type')
  const name = node.attr('name')

  switch (nodeName) {
    case 'FUNDAMENTALTYPE': {
      return name
    }

    case 'CLASS': {
      return withContextPath($, node, name) + '_class'
    }

    case 'STRUCT': {
      return withContextPath($, node, name) + '_struct'
    }

    case 'ENUMERATION': {
      return withContextPath($, node, name)
    }

    case 'TYPEDEF': {
      return getCDataType($, type)
    }

    case 'REFERENCETYPE': {
      return getCDataType($, type)
    }

    case 'POINTERTYPE': {
      return getCDataType($, type) + '*'
    }

    case 'CVQUALIFIEDTYPE': {
      return getCDataType($, type)
    }

    default: {
      throw new Error(`Unknown data type: ${type}, id: ${node.attr('id')}`)
    }
  }
}

const getMethodCReturnType = ($, node, methodType) =>
  methodType === 'CONSTRUCTOR'
    ? getContextPath($, node).join('_') + '*'
    : methodType === 'DESTRUCTOR'
      ? 'void'
      : getCDataType($, node.attr('returns'))

module.exports = {
  getCDataType,
  getMethodCReturnType
}
