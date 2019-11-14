const {getBaseFileName} = require('../file')

const {getCHeaderFileName, getCImplFileName} = require('./file')
const {renderCHeader} = require('./header')
const {renderCImpl} = require('./impl')
const {FILE_NAME: PRIV_FILE_NAME, CONTENT: PRIV_CONTENT} = require('./impl/priv')

const renderCPriv = () => (
  {[`c/impl/${PRIV_FILE_NAME}`]: PRIV_CONTENT}
)

const renderC = ($, declarations, cppHeaderFileName) => {
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
    [`c/include/${cHeaderFileName}`]: renderCHeader($, declarations, files),
    [`c/impl/${cImplFileName}`]: renderCImpl($, declarations, files)
  }
}

module.exports = {
  renderCPriv,
  renderC
}
