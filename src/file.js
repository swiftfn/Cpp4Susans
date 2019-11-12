const cheerio = require('cheerio')
const fs = require('fs')

const getCppHeaderBaseFileName = (cppHeaderFileName) =>
  cppHeaderFileName.substring(0, cppHeaderFileName.indexOf('.'))

const loadCastXml = (fileName) => {
  // https://github.com/Leonidas-from-XIV/node-xml2js
  const xml = fs.readFileSync(fileName)
  return cheerio.load(xml, {xmlMode: true})
}

const writeOutput = (files) => {
  const fileNames = Object.keys(files)
  for (const fileName of fileNames) {
    const content = files[fileName]
    console.log(`${fileName} ~${content.length} bytes`)
    fs.writeFileSync(`output/${fileName}`, content)
  }
}

module.exports = {
  getCppHeaderBaseFileName,
  loadCastXml,
  writeOutput
}
