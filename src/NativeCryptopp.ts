import type { TurboModule } from 'react-native/Libraries/TurboModule/RCTExport';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  quickSort(array: readonly number[]): number[];
  quickSortInPlace(array: number[]): void;
  md2(input: string): string;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeCryptopp');
