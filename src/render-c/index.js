const {getBaseFileName, loadDeclarationsFromCastXml, writeFiles} = require('../render-util/file')
const {renderParts} = require('../render-util/groups')

const {renderForwardDeclarations} = require('./forward')
const {renderHeader} = require('./header')
const {renderImpl} = require('./impl')
const {FILE_NAME: PRIV_FILE_NAME, CONTENT: PRIV_CONTENT} = require('./impl/priv')

const getFileMap = ($, declarations, cppHeaderFileName) => {
  const cppHeaderBaseFileName = getBaseFileName(cppHeaderFileName)
  const cHeaderFileName = `${cppHeaderBaseFileName}_c.h`
  const cImplFileName = `${cppHeaderBaseFileName}_c.cpp`

  const files = {
    cppHeaderFileName,
    cppHeaderBaseFileName,
    cHeaderFileName,
    cImplFileName
  }

  return {
    cHeaderFileName,
    files: {
      [`c/include/${cHeaderFileName}`]: renderHeader($, declarations, files),
      [`c/impl/${cImplFileName}`]: renderImpl($, declarations, files)
    }
  }
}

const writeUmbrellaHeader = (allForwardDeclarations, allHeaders) => {
  const parts = []

  parts.push(`#ifndef CPP4SUSANS_UMBRELLA_HEADER
#define CPP4SUSANS_UMBRELLA_HEADER`
  )

  parts.push(renderParts(allForwardDeclarations))
  parts.push(allHeaders.map(h => `#include "${h}"`).join('\n'))

  parts.push('#endif')

  const content = renderParts(parts) + '\n'
  writeFiles({'c/include/cpp4susans_umbrella.h': content})
}

const writeCFiles = (castXmls) => {
  console.log('Generating C binding...')

  writeFiles({[`c/impl/${PRIV_FILE_NAME}`]: PRIV_CONTENT})

  const allForwardDeclarations = []
  const allHeaders = []
  for (const castXml of castXmls) {
    const [$, declarations, cppHeaderFileName] = loadDeclarationsFromCastXml(castXml)

    const forwardDeclarations = renderForwardDeclarations($, declarations)
    allForwardDeclarations.push(forwardDeclarations)

    const {cHeaderFileName, files} = getFileMap($, declarations, cppHeaderFileName)
    allHeaders.push(cHeaderFileName)

    writeFiles(files)
  }

  writeUmbrellaHeader(allForwardDeclarations, allHeaders)
}

module.exports = {
  writeCFiles
}
