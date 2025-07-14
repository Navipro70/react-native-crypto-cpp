import NativeCryptopp from './NativeCryptopp';

export function quickSort(array: number[]): number[] {
  return NativeCryptopp.quickSort(array);
}

export function md2(input: string): string {
  return NativeCryptopp.md2(input);
}

