const renderImpl = (declarations) => {
  let ret = `#include "${CPP_HEADER}"
#include "c_${CPP_HEADER}"\n`

  for (const d of declarations) {
    switch (d.type) {
      case 'enum':
      case 'struct':
      case 'class':
        break;

      default:
        break;
    }
    // ret += s.renderCImpl()
  }

  return ret
}

module.exports = {
  renderImpl
}
