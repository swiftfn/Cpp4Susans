const {getContextPath} = require('../castxml')

const withContextPath = ($, node, name) => {
  const path = getContextPath($, node).join('.')
  const prefix = path ? path + '.' : ''
  return prefix + name
}

const cppFundamentalTypeToSwift = (cppFundamentalType) => {
  switch (cppFundamentalType) {
    case 'bool':
      return 'Bool'

    case 'float':
      return 'Float'

    case 'int':
      return 'Int32'

    case 'void':
      return 'Void'

    default:
      throw new Error(`Unknown C++ fundamental type: ${cppFundamentalType}`)
  }
}

const getSwiftDataType = ($, idOrNode) => {
  const node = typeof idOrNode === 'string' ? $(`[id="${idOrNode}"]`) : idOrNode
  const nodeName = node.prop('nodeName')
  const id = node.attr('id')
  const type = node.attr('type')
  const name = node.attr('name')

  switch (nodeName) {
    case 'FUNDAMENTALTYPE': {
      return cppFundamentalTypeToSwift(name)
    }

    case 'CLASS': {
      return withContextPath($, node, name) + '_class'
    }

    case 'CLASS':
    case 'STRUCT':
    case 'ENUMERATION': {
      return withContextPath($, node, name)
    }

    case 'TYPEDEF': {
      return getSwiftDataType($, type)
    }

    case 'REFERENCETYPE': {
      return getSwiftDataType($, type)
    }

    case 'POINTERTYPE': {
      return 'UnsafePointer<' + getSwiftDataType($, type) + '>'
    }

    case 'CVQUALIFIEDTYPE': {
      return getSwiftDataType($, type)
    }

    default: {
      throw new Error(`Unknown data type: ${nodeName}, id: ${id}`)
    }
  }
}

const getMethodSwiftReturnType = ($, node, methodType, returns) =>
  methodType === 'CONSTRUCTOR'
    ? getContextPath($, node).join('.')
    : methodType === 'DESTRUCTOR'
      ? 'Void'
      : getSwiftDataType($, returns)

module.exports = {
  getSwiftDataType,
  getMethodSwiftReturnType
}
