const {getCppHeaderBaseFileName} = require('../file')

const {getCHeaderFileName, getCImplFileName} = require('./file')
const {renderCHeader} = require('./header')
const {renderCImpl} = require('./impl')
const {FILE_NAME: PRIV_FILE_NAME, CONTENT: PRIV_CONTENT} = require('./priv')

const renderC = ($, declarations, cppHeaderFileName) => {
  const cppHeaderBaseFileName = getCppHeaderBaseFileName(cppHeaderFileName)
  const cHeaderFileName = getCHeaderFileName(cppHeaderBaseFileName)
  const cImplFileName = getCImplFileName(cppHeaderBaseFileName)

  const files = {
    cppHeaderFileName,
    cppHeaderBaseFileName,
    cHeaderFileName,
    cImplFileName
  }

  return {
    [PRIV_FILE_NAME]: PRIV_CONTENT,
    [cHeaderFileName]: renderCHeader($, declarations, files),
    [cImplFileName]: renderCImpl($, declarations, files)
  }
}

module.exports = {
  renderC
}
