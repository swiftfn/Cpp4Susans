const renderGroups = (groups, renderMember) =>
  groups.map((group) =>
    group.map((member) =>
      renderMember(member)
    ).join('\n')
  ).join('\n')

module.exports = {
  renderGroups
}
