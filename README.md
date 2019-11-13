Tool to automatically create bindings around C++ for other languages,
based on [CastXML](https://github.com/CastXML/CastXML),
which is based on Clang/LLVM

Supported languages:
* Swift: in progress
* Other languages: please contribute

Successfully works for C++ libraries:
* [Skia](https://github.com/google/skia): in progress
* Other libraries: please try and report

## Requirements

* [CastXML](https://github.com/CastXML/CastXML)
* Node.js 12+

## Parse C++ headers to CasXML files

```
npm run castxml
```

## Generate bindings for C and other languages

```
npm run bindings
```
