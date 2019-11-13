// Return whether the node has parent.
const hasNoContext = (node) => {
  return node.attr('context') === '_1'
}

const getContext = ($, node) => {
  const contextId = node.attr('context')
  return $(`[id="${contextId}"]`)
}

// Returns array of parent node names leading to this node.
const getContextPath = ($, node) => {
  if (hasNoContext(node)) {
    return []
  }

  const parent = getContext($, node)
  const parentPath = getContextPath($, parent)
  parentPath.push(parent.attr('name'))
  return parentPath
}

module.exports = {
  hasNoContext,
  getContext,
  getContextPath
}
