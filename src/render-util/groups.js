const renderGroups = (groups, render) =>
  groups.flat().map((member) => render(member)).join('\n\n')

module.exports = {
  renderGroups
}
