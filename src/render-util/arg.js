const collectRenderArgs = ($, args, renderArg) =>
  args.map((idx, arg) => renderArg($, arg, idx)).get()

const formatRenderedArgs = (renderedArgs, extraIndent) => {
  if (renderedArgs.length === 0) {
    return '()'
  }

  const idt = (extraIndent || '')
  const argIdt = idt + '  '
  const acc = renderedArgs.map((renderedArg) => argIdt + renderedArg)
  return '(\n' + acc.join(',\n') + '\n' + idt + ')'
}

const formatRenderArgs = ($, args, renderArg, extraIndent) => {
  const renderedArgs = collectRenderArgs($, args, renderArg)
  return formatRenderedArgs(renderedArgs, extraIndent)
}

module.exports = {
  collectRenderArgs,
  formatRenderedArgs,
  formatRenderArgs
}
