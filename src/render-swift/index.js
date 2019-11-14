const {createRegistry} = require('../registry')
const {getBaseFileName, loadDeclarationsFromCastXml, writeFiles} = require('../render-util/file')
const {renderParts} = require('../render-util/groups')
const {indent} = require('../render-util/indent')

const registry = createRegistry([
  require('./class-struct'),
  require('./enum'),
  require('./function'),
  require('./method')
])

const renderSwift = ($, declarations, cppHeaderBaseFileName) => {
  // For convenience, when "render" below is passed directly in map:
  // array.map(render)
  const NO_INDENT = 'NO_INDENT_MAGIC'

  const render = (declaration, noIndent) => {
    const {type} = declaration
    const renderFunc = registry[type]

    if (!renderFunc) {
      throw new Error(`Invalid declaration type: ${type}`)
    }

    const text = renderFunc($, declaration, render, cppHeaderBaseFileName)
    return noIndent === NO_INDENT ? text : indent(text)
  }

  const parts = []

  parts.push('import CSkia')

  for (const d of declarations) {
    parts.push(render(d, NO_INDENT))
  }

  return renderParts(parts)
}

const getFileMap = ($, declarations, cppHeaderFileName) => {
  const cppHeaderBaseFileName = getBaseFileName(cppHeaderFileName)
  const swiftFileName = `${cppHeaderBaseFileName}.swift`

  return {
    [`swift/${swiftFileName}`]: renderSwift($, declarations, cppHeaderBaseFileName)
  }
}

const writeSwiftFiles = (castXmls) => {
  console.log('Generating C binding...')

  for (const castXml of castXmls) {
    const [$, declarations, cppHeaderFileName] = loadDeclarationsFromCastXml(castXml)
    const files = getFileMap($, declarations, cppHeaderFileName)
    writeFiles(files)
  }
}

module.exports = {
  writeSwiftFiles
}
