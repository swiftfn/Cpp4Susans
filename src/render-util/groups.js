const renderGroups = (groups, render) =>
  groups.flat().map(render).join('\n\n')

const renderParts = (parts) =>
  parts.filter(text => text.length > 0).join('\n\n')

module.exports = {
  renderGroups,
  renderParts
}
