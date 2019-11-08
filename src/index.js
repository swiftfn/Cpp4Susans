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

const writeOutput = (files) => {
  const fileNames = Object.keys(files)
  for (const fileName of fileNames) {
    const content = files[fileName]
    console.log(fileName)
    console.log(content)
  }
}

async function main() {
  const $ = await loadXml(CAST_XML)
  const declarations = collectDeclarations($, CPP_HEADER)

  writeOutput(renderC($, declarations, CPP_HEADER))
  // writeOutput(renderSwift($, declarations))
}

main()
