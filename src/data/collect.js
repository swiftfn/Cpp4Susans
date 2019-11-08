const {isTopScope} = require('../util')

const {collectClassOrStruct} = require('./class-struct')
const {collectEnum} = require('./enum')

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
  const declarations = []

  topNodes.each((idx, node) => {
    node = $(node)

    if (!isTopScope(node)) {
      return
    }

    const type = node.prop('nodeName')
    switch (type) {
      case 'CLASS':
      case 'STRUCT': {
        declarations.push(collectClassOrStruct($, node))
        break
      }

      case 'OPERATORFUNCTION': {
        // TODO
        break
      }

      case 'ENUMERATION': {
        declarations.push(collectEnum($, node))
        break
      }

      default: {
        console.log(`Unhandled node type "${type}"`, node)
      }
    }
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
