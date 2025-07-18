import NativeCryptopp from './NativeCryptopp';

export function md2(input: string): string {
  return NativeCryptopp.md2(input);
}

export function md4(input: string): string {
  return NativeCryptopp.md4(input);
}

export function md5(input: string): string {
  return NativeCryptopp.md5(input);
}

export function sha256(input: string): string {
  return NativeCryptopp.sha256(input);
}

export function hmacSha256(input: string, key: string): string {
  return NativeCryptopp.hmacSha256(input, key);
}

export function uuidv4(isUpperCase: boolean = false): string {
  return NativeCryptopp.uuidv4(isUpperCase);
}
