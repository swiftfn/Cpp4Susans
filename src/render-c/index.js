const {getBaseFileName, loadDeclarationsFromCastXml, writeFiles} = require('../render-util/file')

const {getCHeaderFileName, getCImplFileName} = require('./file')
const {renderCHeader} = require('./header')
const {renderCImpl} = require('./impl')
const {FILE_NAME: PRIV_FILE_NAME, CONTENT: PRIV_CONTENT} = require('./impl/priv')

const getPrivFileMap = () => (
  {[`c/impl/${PRIV_FILE_NAME}`]: PRIV_CONTENT}
)

const getFileMap = ($, declarations, cppHeaderFileName) => {
  const cppHeaderBaseFileName = getBaseFileName(cppHeaderFileName)
  const cHeaderFileName = getCHeaderFileName(cppHeaderBaseFileName)
  const cImplFileName = getCImplFileName(cppHeaderBaseFileName)

  const files = {
    cppHeaderFileName,
    cppHeaderBaseFileName,
    cHeaderFileName,
    cImplFileName
  }

  return {
    cHeaderFileName,
    files: {
      [`c/include/${cHeaderFileName}`]: renderCHeader($, declarations, files),
      [`c/impl/${cImplFileName}`]: renderCImpl($, declarations, files)
    }
  }
}

const writeUmbrellaHeader = (allHeaders) => {
  const content = allHeaders.map(h => `#include "${h}"`).join('\n')
  writeFiles({'c/include/cpp4susans_umbrella.h': content})
}

const writeCFiles = (castXmls) => {
  console.log('Generating C binding...')

  writeFiles(getPrivFileMap())

  const allHeaders = []
  for (const castXml of castXmls) {
    const [$, declarations, cppHeaderFileName] = loadDeclarationsFromCastXml(castXml)
    const {cHeaderFileName, files} = getFileMap($, declarations, cppHeaderFileName)
    allHeaders.push(cHeaderFileName)
    writeFiles(files)
  }

  writeUmbrellaHeader(allHeaders)
}

module.exports = {
  writeCFiles
}
