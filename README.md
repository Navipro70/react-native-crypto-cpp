<div align="center">

# react-native-cryptopp-cpp

**The fastest native implementation of Cryptopp++ functions**

</div>

- **Cryptopp++** is a native C++ library that provides a comprehensive suite of cryptographic algorithms and utilities for secure data processing
- **react-native-cryptopp-cpp** is a React Native port of the Cryptopp++ library, implemented using C++, JSI (JavaScript Interface), and Turbo Modules for maximum performance

## Features

- High performance - everything is written in C++
- Uses JSI and C++ TurboModules instead of the "old" Bridge
- Super lightweight - adds only ~40KB to your app bundle
- Fully synchronous calls - no async/await, no Promises, no Bridge
- iOS, Android and Expo support

## Installation

To install the library, use the following command:

```sh
yarn add react-native-cryptopp-cpp
cd ios && pod install
```

## Usage

Import the functions you need from the library:

```js
import { md2, md4, md5, sha256, hmacSha256, uuidv4 } from 'react-native-cryptopp-cpp';

// Example usage
const hash = md5('your input string');
const uuid = uuidv4(true); // returns UUID in uppercase
```

## Available Functions

| Function     | Description                          | Parameters                  | Returns   |
|--------------|--------------------------------------|-----------------------------|-----------|
| `md2`        | Computes MD2 hash of the input       | `input: string`             | `string`  |
| `md4`        | Computes MD4 hash of the input       | `input: string`             | `string`  |
| `md5`        | Computes MD5 hash of the input       | `input: string`             | `string`  |
| `sha256`     | Computes SHA-256 hash of the input   | `input: string`             | `string`  |
| `hmacSha256` | Computes HMAC-SHA-256 of the input   | `input: string, key: string`| `string`  |
| `uuidv4`     | Generates a UUID v4                  | `isUpperCase?: boolean`      | `string`  |

## Contributing

If you need any specific function from Cryptopp++, please request it through an issue and it will implemented in the nearest time, or feel free to open a PR and it will be added to the library promptly.

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## Limitations

- This package supports only the **New Architecture** (Fabric + TurboModules)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
