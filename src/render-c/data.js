const {getContext, getContextPath} = require('../castxml')

const withContextPath = ($, node, name) => {
  const path = getContextPath($, node).join('_')
  const prefix = path ? path + '_' : ''
  return prefix + name
}

const getCDataType = ($, idOrNode) => {
  const node = typeof idOrNode === 'string' ? $(`[id="${idOrNode}"]`) : idOrNode
  const nodeName = node.prop('nodeName')
  const id = node.attr('id')
  const type = node.attr('type')
  const name = node.attr('name')

  switch (nodeName) {
    case 'FUNDAMENTALTYPE': {
      return {
        category: nodeName,
        name
      }
    }

    case 'CLASS': {
      return {
        category: nodeName,
        name: withContextPath($, node, name) + '_class'
      }
    }

    case 'STRUCT': {
      return {
        category: nodeName,
        name: withContextPath($, node, name) + '_struct'
      }
    }

    case 'ENUMERATION': {
      return {
        category: nodeName,
        name: withContextPath($, node, name)
      }
    }

    case 'TYPEDEF': {
      return getCDataType($, type)
    }

    case 'REFERENCETYPE': {
      return {
        ...getCDataType($, type),
        ref: true
      }
    }

    case 'POINTERTYPE': {
      const t = getCDataType($, type)
      t.name += '*'
      return {
        ...t,
        pointer: true
      }
    }

    // https://en.cppreference.com/w/cpp/language/cv
    case 'CVQUALIFIEDTYPE': {
      return getCDataType($, type)
    }

    default: {
      throw new Error(`Unknown data type: ${nodeName}, id: ${id}`)
    }
  }
}

const getMethodCReturnType = ($, node, methodType, returns) =>
  methodType === 'CONSTRUCTOR'
    ? getCDataType($, getContext($, node)).name + '*'
    : methodType === 'DESTRUCTOR'
      ? 'void'
      : getCDataType($, returns).name

module.exports = {
  getCDataType,
  getMethodCReturnType
}
