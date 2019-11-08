const FunctionType = {
  OPERATORFUNCTION: 'OPERATORFUNCTION'
}

const MethodType = {
  CONSTRUCTOR: 'CONSTRUCTOR',
  DESTRUCTOR: 'DESTRUCTOR',
  METHOD: 'METHOD',
  OPERATORMETHOD: 'OPERATORMETHOD'
}

const hasNoContext = (node) => {
  return node.attr('context') === '_1'
}

const withContextPath = ($, node, name) => {
  const path = getContextPath($, node)
  const prefix = path ? path + '_' : ''
  return prefix + name
}

const getContextPath = ($, node) => {
  if (hasNoContext(node)) {
    return ''
  }

  const parentId = node.attr('context')
  const parent = $(`[id="${parentId}"]`)
  const parentPath = getContextPath($, parent)
  const prefix = parentPath ? parentPath + '_' : ''
  return prefix + parent.attr('name')
}

const getDataType = ($, idOrNode) => {
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
      return getDataType($, node.attr('type'))
    }

    case 'REFERENCETYPE': {
      return getDataType($, node.attr('type'))
    }

    case 'POINTERTYPE': {
      return getDataType($, node.attr('type')) + '*'
    }

    case 'CVQUALIFIEDTYPE': {
      return getDataType($, node.attr('type'))
    }

    default: {
      throw new Error(`Unknown data type: ${type}, id: ${node.attr('id')}`)
    }
  }
}

module.exports = {
  FunctionType,
  MethodType,
  hasNoContext,
  getContextPath,
  getDataType
}
