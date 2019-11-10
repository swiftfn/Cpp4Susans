const renderOperatorFunction = ($, declaration) => {
  const {node, args} = declaration
  const opName = node.attr('name')
  const arg0 = args.eq(0).attr('name')
  const arg1 = args.eq(1).attr('name')
  return `
infix ${opName}(lhs: Double, rhs: Double) -> Double {
return lhs * lhs + rhs * rhs
}

return operator${opName}(${arg0}, ${arg1});
`
}

const register = (registry) => {
  registry['OPERATORFUNCTION'] = renderOperatorFunction
}

module.exports = {
  register
}
