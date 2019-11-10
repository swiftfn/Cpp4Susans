const getCHeaderFileName = (cppHeaderBaseFileName) =>
  `${cppHeaderBaseFileName}_c.h`

const getCImplFileName = (cppHeaderBaseFileName) =>
  `${cppHeaderBaseFileName}_c.c`

module.exports = {
  getCHeaderFileName,
  getCImplFileName
}
