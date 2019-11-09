const {renderMethodSignature} = require('../header/method')

const renderMethodImpl = ($, declaration) => {
  const {node, isStatic, returns, args} = declaration
  return `
${renderMethodSignature($, declaration)} {
  return
}
`
}

const register = (registry) => {
  registry['CONSTRUCTOR'] = renderMethodImpl
  registry['DESTRUCTOR'] = renderMethodImpl
  registry['METHOD'] = renderMethodImpl
  registry['OPERATORMETHOD'] = renderMethodImpl
}

module.exports = {
  register
}
