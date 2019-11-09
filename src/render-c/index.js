const {renderCHeader} = require('./header')
const {renderCImpl} = require('./impl')

const renderC = ($, declarations, cppHeaderFileName) => {
  const cppHeaderBaseFileName = cppHeaderFileName.substring(0, cppHeaderFileName.indexOf('.'))
  const cHeaderSignature = `${cppHeaderBaseFileName}_C_HEADER`
  const cHeaderFileName = `${cppHeaderBaseFileName}_c.h`
  const cImplFileName = `${cppHeaderBaseFileName}_c.c`

  return output = {
    [cHeaderFileName]: renderCHeader($, declarations, cHeaderSignature),
    [cImplFileName]: renderCImpl($, declarations, cppHeaderFileName, cHeaderFileName)
  }
}

module.exports = {
  renderC
}
