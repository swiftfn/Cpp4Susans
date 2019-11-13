const glob = require('glob')

const {collectDeclarations} = require('./declarations')
const {getBaseFileName, loadCastXml, writeFiles} = require('./file')
const {renderC} = require('./render-c')
const {renderSwift} = require('./render-swift')

const {FILE_NAME: PRIV_FILE_NAME, CONTENT: PRIV_CONTENT} = require('./render-c/priv')

function main() {
  const castXmls = glob.sync('input/*.xml')
  // const castXmls = ['input/SkBitmap.xml']

  writeFiles({[PRIV_FILE_NAME]: PRIV_CONTENT})

  for (const castXml of castXmls) {
    console.log(`Processing ${castXml}...`)

    const baseFileName = getBaseFileName(castXml)
    const cppHeader = `${baseFileName}.h`

    const $ = loadCastXml(castXml)
    const declarations = collectDeclarations($, cppHeader)

    writeFiles(renderC($, declarations, cppHeader))
    writeFiles(renderSwift($, declarations, cppHeader))
  }
}

main()
