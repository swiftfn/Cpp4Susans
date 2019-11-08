const renderSwift = (declarations) => {
  let ret = 'import CSkia\n\n'

  for (const d of declarations) {
    switch (d.type) {
      case 'enum':
      case 'struct':
      case 'class':
        break;

      default:
        break;
    }
    // ret += s.renderSwift(d)
  }

  return ret
}

module.exports = {
  renderSwift
}
