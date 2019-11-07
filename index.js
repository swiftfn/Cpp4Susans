// https://github.com/Leonidas-from-XIV/node-xml2js

const fs = require('fs')
const cheerio = require('cheerio')

const {Enum} = require('./enum')
const {StructOrClass} = require('./struct-class')
const {isTopScope} = require('./util')

const CAST_XML = 'input/SkSize.xml'
const CPP_HEADER = 'SkSize.h'

// const CAST_XML = 'input/SkCanvas.xml'
// const CPP_HEADER = 'SkCanvas.h'

const loadXml = (fileName) => {
  const xml = fs.readFileSync(fileName)
  return cheerio.load(xml, {xmlMode: true})
}

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

const collectStructures = ($, topNodes) => {
  const structures = []

  topNodes.each((idx, node) => {
    node = $(node)

    if (!isTopScope(node)) {
      return
    }

    const type = node.prop('nodeName')
    switch (type) {
      case 'STRUCT':
      case 'CLASS': {
        structures.push(new StructOrClass($, node))
        break
      }

      case 'OPERATORFUNCTION': {
        // TODO
        break
      }

      case 'ENUMERATION': {
        structures.push(new Enum($, node))
        break
      }

      default: {
        console.log(`Unhandled node type "${type}"`, node)
      }
    }
  })

  return structures
}

const renderCHeader = (structures) => {
  let ret = `#include "${CPP_HEADER}"\n`

  for (const s of structures) {
    ret += s.renderCHeader()
  }

  return ret
}

const renderCImpl = (structures) => {
  return `TODO`
}

const renderSwift = (structures) => {
  let ret = ''

  for (const s of structures) {
    ret += s.renderSwift()
  }

  return ret
}

async function main() {
  const $ = await loadXml(CAST_XML)
  const fileId = getHeaderFileId($, CPP_HEADER)
  const topNodes = getTopNodes($, fileId)
  const structures = collectStructures($, topNodes)

  console.log(renderCHeader(structures))
  console.log(renderCImpl(structures))
  console.log(renderSwift(structures))
}

main()
