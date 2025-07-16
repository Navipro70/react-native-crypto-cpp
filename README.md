# react-native-cryptopp-cpp

Cryptopp implementation in React Native as a C++ module. This library provides cryptographic functions such as hashing and UUID generation.

## Installation

To install the library, use the following command:

```sh
npm install react-native-cryptopp-cpp
```

## Usage

Import the functions you need from the library:

```js
import { md2, md4, md5, sha256, hmacSha256, uuidv4 } from 'react-native-cryptopp-cpp';

// Example usage
const hash = md5('your input string');
const uuid = uuidv4();
```

## Available Functions

| Function     | Description                          | Parameters                  | Returns   |
|--------------|--------------------------------------|-----------------------------|-----------|
| `md2`        | Computes MD2 hash of the input       | `input: string`             | `string`  |
| `md4`        | Computes MD4 hash of the input       | `input: string`             | `string`  |
| `md5`        | Computes MD5 hash of the input       | `input: string`             | `string`  |
| `sha256`     | Computes SHA-256 hash of the input   | `input: string`             | `string`  |
| `hmacSha256` | Computes HMAC-SHA-256 of the input   | `input: string, key: string`| `string`  |
| `uuidv4`     | Generates a UUID v4                  | None                        | `string`  |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
