// Returns whether the node has no parent node.
const hasNoContext = (node) =>
  node.attr('context') === '_1'

const isForwardDeclaration = (node) =>
  node.attr('incomplete') === '1'

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
  isForwardDeclaration,
  getContext,
  getContextPath
}
