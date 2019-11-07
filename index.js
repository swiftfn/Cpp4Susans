// https://github.com/Leonidas-from-XIV/node-xml2js

const fs = require('fs')
const cheerio = require('cheerio')

const {Struct} = require('./struct')

const CAST_XML = 'xml/SkSize.xml'
const CPP_HEADER = 'SkSize.h'

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

const renderC = (structures) => {
  let ret = `#include "${CPP_HEADER}"\n`

  for (const s of structures) {
    ret += s.renderC()
  }

  console.log(ret)
}

const renderSwift = (structures) => {
  let ret = ''

  for (const s of structures) {
    ret += s.renderSwift()
  }

  console.log(ret)
}

async function main() {
  const $ = await loadXml(CAST_XML)
  const fileId = getHeaderFileId($, CPP_HEADER)
  const topNodes = getTopNodes($, fileId)
  const structures = collectStructures($, topNodes)

  renderC(structures)
  renderSwift(structures)
}

main()
