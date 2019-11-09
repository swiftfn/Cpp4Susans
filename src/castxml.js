// Return whether the node has parent.
const hasNoContext = (node) => {
  return node.attr('context') === '_1'
}

// Returns array of parent nodes leading to this node.
const getContextPath = ($, node) => {
  if (hasNoContext(node)) {
    return []
  }

  const parentId = node.attr('context')
  const parent = $(`[id="${parentId}"]`)
  const parentPath = getContextPath($, parent)
  parentPath.push(parent.attr('name'))
  return parentPath
}

module.exports = {
  hasNoContext,
  getContextPath
}
