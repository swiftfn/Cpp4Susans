const {execSync} = require('child_process')
const glob = require('glob')
const {getBaseFileName} = require('../file')

const castxml = '/Users/ndao/src/clang/CastXML/build/bin/castxml'

const libDir = '/Users/ndao/src/canvas/am-node/skia'

// Paths are relative to libDir
const headerPatterns = [
  'include/core/*.h'
]

const std = 'c++14'

const clangDir = '/Users/ndao/opt/clang+llvm-9.0.0'

const includeDirs = [
  libDir,
  `${libDir}/include/config`,
  `${clangDir}/include/c++/v1`,
  '/Library/Developer/CommandLineTools/SDKs/MacOSX10.15.sdk/usr/include'
]

const flags = [
  '-DSK_CPU_LENDIAN'
]

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
