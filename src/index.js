const glob = require('glob')

const {collectDeclarations} = require('./declarations')
const {getBaseFileName, loadCastXml, writeFiles} = require('./file')
const {renderC, renderCPriv} = require('./render-c')
const {renderSwift} = require('./render-swift')

const main = () => {
  // const castXmls = ['input/SkMatrix.xml']

  const castXmls = glob.sync('input/*.xml')
  // const skipToIdx = castXmls.findIndex((path) => path.endsWith('/SkYUVAIndex.xml'))
  // castXmls.splice(0, skipToIdx)

  writeFiles(renderCPriv())

  for (const castXml of castXmls) {
    console.log(`\nProcessing ${castXml}...`)

    const baseFileName = getBaseFileName(castXml)
    const cppHeader = `${baseFileName}.h`

    const $ = loadCastXml(castXml)
    const declarations = collectDeclarations($, cppHeader)

    writeFiles(renderC($, declarations, cppHeader))
    writeFiles(renderSwift($, declarations, cppHeader))
  }
}

main()
