const FILE_NAME = 'cpp4susans_priv.h'

const TO_C_MACRO = 'CPP4SUSANS_TO_C'
const TO_CPP_MACRO = 'CPP4SUSANS_TO_CPP'

// https://github.com/mono/skia/blob/xamarin-mobile-bindings/src/c/CTypes_priv.h
const CONTENT = `#ifndef cpp4susans_priv_CPP4SUSANS_C_HEADER
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
  FILE_NAME,
  CONTENT,
  TO_C_MACRO,
  TO_CPP_MACRO,
  toC,
  toCpp
}
