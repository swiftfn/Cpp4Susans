const renderArgs = ($, args, renderArg, indent) => {
  if (args.length === 0) {
    return '()'
  }

  const acc = []
  const idt = (indent || '')
  const argIdt = idt + '  '
  args.each((_, arg) => acc.push(argIdt + renderArg($, arg)))
  return '(\n' + acc.join(',\n') + '\n' + idt + ')'
}

module.exports = {
  renderArgs
}
