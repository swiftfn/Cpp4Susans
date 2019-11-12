const toCMacro = 'CPP4SUSANS_TO_C'
const toCppMacro = 'CPP4SUSANS_TO_CPP'

// https://github.com/mono/skia/blob/xamarin-mobile-bindings/src/c/CTypes_priv.h
const priv = {
  'cpp4susans_priv.h': `#ifndef cpp4susans_priv_CPP4SUSANS_C_HEADER
#define cpp4susans_priv_CPP4SUSANS_C_HEADER

#define CPP4SUSANS_DEF_MAP_DECL(CppType, CType)                     \\
  static inline const CppType& CPP4SUSANS_TO_CPP(const CType& t) {  \\
    return reinterpret_cast<const CppType&>(t);                     \\
  }                                                                 \\
  static inline const CppType* CPP4SUSANS_TO_CPP(const CType* t) {  \\
    return reinterpret_cast<const CppType*>(t);                     \\
  }                                                                 \\
  static inline CppType& CPP4SUSANS_TO_CPP(CType& t) {              \\
    return reinterpret_cast<CppType&>(t);                           \\
  }                                                                 \\
  static inline CppType* CPP4SUSANS_TO_CPP(CType* t) {              \\
    return reinterpret_cast<CppType*>(t);                           \\
  }                                                                 \\
  static inline const CType& CPP4SUSANS_TO_C(const CppType& t) {    \\
    return reinterpret_cast<const CType&>(t);                       \\
  }                                                                 \\
  static inline const CType* CPP4SUSANS_TO_C(const CppType* t) {    \\
    return reinterpret_cast<const CType*>(t);                       \\
  }                                                                 \\
  static inline CType& CPP4SUSANS_TO_C(CppType& t) {                \\
    return reinterpret_cast<CType&>(t);                             \\
  }                                                                 \\
  static inline CType* CPP4SUSANS_TO_C(CppType* t) {                \\
    return reinterpret_cast<CType*>(t);                             \\
  }

#endif
`
}

const toC = (catetory, text) => {
  return (catetory === 'CLASS' || catetory === 'STRUCT')
    ? `CPP4SUSANS_TO_C(${text})`
    : text
}

const toCpp = (catetory, text) => {
  return (catetory === 'CLASS' || catetory === 'STRUCT')
    ? `CPP4SUSANS_TO_CPP(${text})`
    : text
}

module.exports = {
  priv,
  toCMacro,
  toCppMacro,
  toC,
  toCpp
}
