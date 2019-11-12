const {collectDeclarations} = require('./declarations')
const {loadCastXml, writeOutput} = require('./file')
const {renderC} = require('./render-c')
const {renderSwift} = require('./render-swift')

const CAST_XML = 'input/SkSize.xml'
const CPP_HEADER = 'SkSize.h'

// const CAST_XML = 'input/SkCanvas.xml'
// const CPP_HEADER = 'SkCanvas.h'

async function main() {
  const $ = await loadCastXml(CAST_XML)
  const declarations = collectDeclarations($, CPP_HEADER)

  writeOutput(renderC($, declarations, CPP_HEADER))
  writeOutput(renderSwift($, declarations, CPP_HEADER))
}

main()
