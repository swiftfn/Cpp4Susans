const renderGroups = (groups, render) =>
  groups.flat().map(render).join('\n\n')

module.exports = {
  renderGroups
}
