const {renderArgs: renderArgsUtil} = require('../render-util/arg')
const {getSwiftDataType} = require('./data')

const renderImplArg = ($, arg) => {
  const node = $(arg)
  const name = node.attr('name')
  const typeId = node.attr('type')
  const type = getSwiftDataType($, typeId)
  // TODO Convert Swift to C
  return name
}

const renderDeclArgs = ($, args) =>
  renderArgsUtil($, args, renderImplArg)

module.exports = {
  renderImplArg,
  renderImplArgs
}
