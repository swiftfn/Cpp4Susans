const {getCppHeaderBaseFileName, getCHeaderFileName, getCImplFileName} = require('./file')
const {renderCHeader} = require('./header')
const {renderCImpl} = require('./impl')

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

  return output = {
    [cHeaderFileName]: renderCHeader($, declarations, files),
    [cImplFileName]: renderCImpl($, declarations, files)
  }
}

module.exports = {
  renderC
}
