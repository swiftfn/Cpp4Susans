// When there's method overload, there may be duplicate function/method names.
// We dedup by adding suffixes.
const getSuffixes = ($, declaration) => {
  const {type, isStatic, args} = declaration

  const stat = isStatic ? ['static'] : []

  const argTypeNameList = args.map((idx, arg) => {
    const node = $(arg)
    const typeId = node.attr('type')
    const name = node.attr('name') || `arg${idx}`
    return [typeId, name]
  }).get()

  return [stat, type, argTypeNameList].flat()
}

module.exports = {
  getSuffixes
}
