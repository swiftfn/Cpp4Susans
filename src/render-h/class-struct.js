const renderGroups = (groups, render) =>
  groups.flat().map((member) => render(member)).join('\n')

module.exports = {
  renderGroups
}
