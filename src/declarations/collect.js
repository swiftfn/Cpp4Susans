const {isTopScope} = require('../util')

// For avoiding cyclic dependencies
const registry = {}
require('./class-struct').register(registry)
require('./enum').register(registry)
require('./field').register(registry)
require('./function').register(registry)
require('./method').register(registry)

const getHeaderFileId = ($, fileName) => {
  const elem = $(`File[name$="/${fileName}"]`)
  // console.log(elem)
  return elem.attr('id')
}

// Select top nodes of the header file
const getTopNodes = ($, fileId) => {
  const topNodes = $(`:root > [file="${fileId}"]`)
  // console.log(topNodes.length)
  // console.log(topNodes)
  return topNodes
}

const getDeclarations = ($, topNodes) => {
  const collect = (node) => {
    const type = node.prop('nodeName')
    const collectFunc = registry[type]
    if (!collectFunc) {
      throw new Error(`Invalid node type: ${type}`)
    }
    return collectFunc($, node, collect)
  }

  const declarations = []

  topNodes.each((idx, node) => {
    node = $(node)

    if (!isTopScope(node)) {
      return
    }

    declarations.push(collect(node))
  })

  return declarations
}

const collectDeclarations = ($, cppHeaderFileName) => {
  const fileId = getHeaderFileId($, cppHeaderFileName)
  const topNodes = getTopNodes($, fileId)
  return getDeclarations($, topNodes)
}

module.exports = {
  collectDeclarations
}
