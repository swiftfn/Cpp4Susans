const {
  castxml,
  libDir,
  headerPatterns,
  std,
  clangDir,
  includeDirs,
  flags
} = require('../../config')

const {execSync} = require('child_process')
const glob = require('glob')
const {getBaseFileName} = require('../render-util/file')

const parse = (headerFile, xmlFile) => {
  execSync(
    `${castxml} -x c++ -std=${std} --castxml-gccxml ` +
    includeDirs.map(dir => `-I ${dir} `).join('') +
    flags.join(' ') + ' ' +
    `-o ${xmlFile} ` +
    headerFile
  )
}

const getXmlFile = (headerFile) => {
  const baseFileName = getBaseFileName(headerFile)
  return `input/${baseFileName}.xml`
}

for (const headerPattern of headerPatterns) {
  const headerFiles = glob.sync(libDir + '/' + headerPattern)

  for (const headerFile of headerFiles) {
    const xmlFile = getXmlFile(headerFile)
    console.log(headerFile + ' -> ' + xmlFile)
    parse(headerFile, xmlFile)
  }
}
