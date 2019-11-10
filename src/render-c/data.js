const {getContextPath} = require('../castxml')

const withContextPath = ($, node, name) => {
  const path = getContextPath($, node).join('_')
  const prefix = path ? path + '_' : ''
  return prefix + name
}

const getCDataType = ($, idOrNode) => {
  const node = typeof idOrNode === 'string' ? $(`[id="${idOrNode}"]`) : idOrNode
  const type = node.prop('nodeName')

  switch (type) {
    case 'FUNDAMENTALTYPE': {
      return node.attr('name')
    }

    case 'CLASS': {
      return withContextPath($, node, node.attr('name')) + '_class'
    }

    case 'STRUCT': {
      return withContextPath($, node, node.attr('name')) + '_struct'
    }

    case 'ENUMERATION': {
      return withContextPath($, node, node.attr('name'))
    }

    case 'TYPEDEF': {
      return getCDataType($, node.attr('type'))
    }

    case 'REFERENCETYPE': {
      return getCDataType($, node.attr('type'))
    }

    case 'POINTERTYPE': {
      return getCDataType($, node.attr('type')) + '*'
    }

    case 'CVQUALIFIEDTYPE': {
      return getCDataType($, node.attr('type'))
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
