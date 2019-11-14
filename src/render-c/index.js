const {getBaseFileName} = require('../file')

const {getCHeaderFileName, getCImplFileName} = require('./file')
const {renderCHeader} = require('./header')
const {renderCImpl} = require('./impl')

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
  renderC
}
