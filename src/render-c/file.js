const getCHeaderFileName = (cppHeaderBaseFileName) =>
  `${cppHeaderBaseFileName}_c.h`

const getCImplFileName = (cppHeaderBaseFileName) =>
  `${cppHeaderBaseFileName}_c.cpp`

module.exports = {
  getCHeaderFileName,
  getCImplFileName
}
