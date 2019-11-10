const indent = (text) => {
  const lines = text.split('\n')
  const indented = lines.map(l => '  ' + l)
  return indented.join('\n')
}

module.exports = {
  indent
}
