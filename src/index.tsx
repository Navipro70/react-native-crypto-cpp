import Cryptopp from './NativeCryptopp';

export function multiply(a: number, b: number): number {
  return Cryptopp.multiply(a, b);
}
