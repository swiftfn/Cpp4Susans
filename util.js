const hasNoContext = (node) => {
  return node.attr('context') === '_1'
}

exports.isTopScope = (node) => {
  // "incomplete" means forward declaration
  return hasNoContext(node) && node.attr('incomplete') !== '1'
}

exports.isPublic = (node) => {
  // console.log(node[0])
  return node.attr('access') === 'public'
}

exports.getMemberIds = (node) => {
  // console.log(node[0])
  const members = node.attr('members')
  return members.split(' ')
}

exports.getContextPath = ($, node) => {
  if (hasNoContext(node)) {
    return ''
  }

  const parentId = node.attr('context')
  const parent = $(`[id="${parentId}"]`)
  const parentPath = exports.getContextPath($, parent)
  const prefix = parentPath ? parentPath + '_' : ''
  return prefix + parent.attr('name')
}

exports.withContextPath = ($, node, name) => {
  const path = exports.getContextPath($, node)
  const prefix = path ? path + '_' : ''
  return prefix + name
}

exports.getDataType = ($, idOrNode) => {
  const node = typeof idOrNode === 'string' ? $(`[id="${idOrNode}"]`) : idOrNode

  const type = node.prop('nodeName')
  switch (type) {
    case 'FUNDAMENTALTYPE': {
      return node.attr('name')
    }

    case 'STRUCT':
    case 'CLASS': {
      return exports.withContextPath($, node, node.attr('name')) + '_t'
    }

    case 'ENUMERATION': {
      return exports.withContextPath($, node, node.attr('name'))
    }

    case 'TYPEDEF': {
      return exports.getDataType($, node.attr('type'))
    }

    case 'REFERENCETYPE': {
      return exports.getDataType($, node.attr('type'))
    }

    case 'POINTERTYPE': {
      return exports.getDataType($, node.attr('type')) + '*'
    }

    case 'CVQUALIFIEDTYPE': {
      return exports.getDataType($, node.attr('type'))
    }

    default: {
      throw new Error(`Unknown data type: ${type}, id: ${node.attr('id')}`)
    }
  }

  console.log(node[0])
  return node.attr('name')
}
