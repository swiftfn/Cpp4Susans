const renderGroups = (groups, render) =>
  groups.map((group) =>
    group.map((member) =>
      render(member)
    ).join('\n')
  ).join('\n')

module.exports = {
  renderGroups
}
