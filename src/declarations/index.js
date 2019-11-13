const {hasNoContext} = require('../castxml')
const {createRegistry} = require('../registry')

const registry = createRegistry([
  require('./class-struct'),
  require('./enum'),
  require('./field'),
  require('./function'),
  require('./method')
])

const getHeaderFileId = ($, fileName) => {
  const elem = $(`File[name$="/${fileName}"]`)
  // console.log(elem)
  return elem.attr('id')
}

const isTopScope = (node) => {
  // "incomplete" means forward declaration
  return hasNoContext(node) && node.attr('incomplete') !== '1'
}

// Select top nodes of the header file
const getTopNodes = ($, fileId) => {
  const topNodes = $(`:root > [file="${fileId}"]`)
  // console.log(topNodes.length)
  // console.log(topNodes)
  return topNodes
}

const IGNORED_TOP_TYPES = ['TYPEDEF', 'VARIABLE']

const getDeclarations = ($, topNodes) => {
  const collect = (node) => {
    const type = node.prop('nodeName')

    const collectFunc = registry[type]
    if (!collectFunc) {
      const id = node.attr('id')
      throw new Error(`Invalid node type: ${type}, id: ${id}`)
    }

    return collectFunc($, node, collect)
  }

  return topNodes
    .filter((idx, node) => {
      const n = $(node)
      const type = n.prop('nodeName')
      return isTopScope(n) && !IGNORED_TOP_TYPES.includes(type)
    })
    .map((idx, node) => collect($(node)))
    .get()
}

const collectDeclarations = ($, cppHeaderFileName) => {
  const fileId = getHeaderFileId($, cppHeaderFileName)
  const topNodes = getTopNodes($, fileId)
  return getDeclarations($, topNodes)
}

module.exports = {
  collectDeclarations
}
