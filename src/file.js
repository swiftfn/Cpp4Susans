const cheerio = require('cheerio')
const fs = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')

const getBaseFileName = (filePath) => {
  const basename = path.basename(filePath)
  const withoutExt = basename.substr(0, basename.lastIndexOf('.'))
  return withoutExt
}

const getDirName = (filePath) =>
  filePath.substr(0, filePath.lastIndexOf('/'))

// Loads CastXML file and passes it to Cheerio.
const loadCastXml = (fileName) => {
  // https://github.com/Leonidas-from-XIV/node-xml2js
  const xml = fs.readFileSync(fileName)
  return cheerio.load(xml, {xmlMode: true})
}

// Writes {filePath1: content1, filePath2: content2}.
const writeFiles = (files) => {
  const fileNames = Object.keys(files)
  for (const fileName of fileNames) {
    const path = `output/${fileName}`
    const content = files[fileName]

    console.log(`${fileName} ~${content.length} bytes`)

    const dir = getDirName(path)
    mkdirp.sync(dir)
    fs.writeFileSync(path, content)
  }
}

module.exports = {
  getBaseFileName,
  loadCastXml,
  writeFiles
}
