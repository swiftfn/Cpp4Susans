const getCppHeaderBaseFileName = (cppHeaderFileName) =>
  cppHeaderFileName.substring(0, cppHeaderFileName.indexOf('.'))

module.exports = {
  getCppHeaderBaseFileName
}
