const renderHeader = (declarations) => {
  let ret = `#ifdef __cplusplus
extern "C" {
#endif

`
  for (const d of declarations) {
    switch (d.type) {
      case 'enum':
      case 'struct':
      case 'class':
        break;

      default:
        break;
    }
    // ret += s.renderHeader(d)
  }

  ret += `
#ifdef __cplusplus
}
#endif
`
  return ret
}

module.exports = {
  renderHeader
}
