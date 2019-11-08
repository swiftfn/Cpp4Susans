const {renderMethodSignature} = require('../header/method')

const renderMethodImpl = ($, declaration) => {
  const {node, isStatic, methodType, returns, args} = declaration
  return `
${renderMethodSignature($, declaration)} {
  return
}
`
}

const register = (registry) => {
  registry['method'] = renderMethodImpl
}

module.exports = {
  register
}
