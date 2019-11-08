const fs = require('fs')
const cheerio = require('cheerio')

const {collectDeclarations} = require('./declarations')
const {renderC} = require('./render-c')
const {renderSwift} = require('./render-swift')

const CAST_XML = 'input/SkSize.xml'
const CPP_HEADER = 'SkSize.h'

// const CAST_XML = 'input/SkCanvas.xml'
// const CPP_HEADER = 'SkCanvas.h'

const loadXml = (fileName) => {
  // https://github.com/Leonidas-from-XIV/node-xml2js
  const xml = fs.readFileSync(fileName)
  return cheerio.load(xml, {xmlMode: true})
}

async function main() {
  const $ = await loadXml(CAST_XML)
  const declarations = collectDeclarations($, CPP_HEADER)

  console.log(renderC($, declarations))
  // console.log(renderSwift($, declarations))
}

main()
