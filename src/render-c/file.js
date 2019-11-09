const getCppHeaderBaseFileName = (cppHeaderFileName) =>
  cppHeaderFileName.substring(0, cppHeaderFileName.indexOf('.'))

const getCHeaderFileName = (cppHeaderBaseFileName) =>
  `${cppHeaderBaseFileName}_c.h`

const getCImplFileName = (cppHeaderBaseFileName) =>
  `${cppHeaderBaseFileName}_c.c`

module.exports = {
  getCppHeaderBaseFileName,
  getCHeaderFileName,
  getCImplFileName
}
