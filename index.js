// https://github.com/Leonidas-from-XIV/node-xml2js

const fs = require('fs')
const cheerio = require('cheerio')

const {Struct} = require('./struct')

const XML = 'xml/SkSize.xml'
const H = 'SkSize.h'

const loadXml = (fileName) => {
  const xml = fs.readFileSync(fileName)
  return cheerio.load(xml, {xmlMode: true})
}

const getHeaderFileId = ($, fileName) => {
  const elem = $(`File[name$="/${fileName}"]`)
  // console.log(elem)
  return elem.attr('id')
}

const isTopScope = (node) => {
  return node.attr('context') === '_1'
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
        const s = new Struct($, node)
        structures.push(s)
        break

      case 'OPERATORFUNCTION':
        // TODO
        break

      default:
        console.log(`Unhandled node type "${type}"`, node)
    }
  })

  return structures
}

const renderStructures = (structures) => {
  for (const s of structures) {
    console.log(s.render())
  }
}

async function main() {
  const $ = await loadXml(XML)
  const fileId = getHeaderFileId($, H)
  const topNodes = getTopNodes($, fileId)
  const structures = collectStructures($, topNodes)
  renderStructures(structures)
}

main()
