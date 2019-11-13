const {getContextPath} = require('../../castxml/context')
const {getCDataType} = require('../data')
const {FILE_NAME: PRIV_FILE_NAME} = require('../priv')

const collect = ($, declarations, acc) => {
  for (const d of declarations) {
    const {type, node, classes, structs} = d

    if (type !== 'CLASS' && type !== 'STRUCT') {
      continue
    }

    const cppPath = getContextPath($, node)
    cppPath.push(node.attr('name'))

    const cppType = cppPath.join('::')
    const {name: cType} = getCDataType($, node)
    acc.push(`CPP4SUSANS_DEF_MAP_DECL(${cppType}, ${cType})`)

    collect($, classes, acc)
    collect($, structs, acc)
  }
}

const renderMapDecls = ($, declarations) => {
  const acc = [`#include "${PRIV_FILE_NAME}"`]
  collect($, declarations, acc)
  return acc.join('\n')
}

module.exports = {
  renderMapDecls
}
