import type { TurboModule } from 'react-native/Libraries/TurboModule/RCTExport';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  md2(input: string): string;
  md4(input: string): string;
  md5(input: string): string;
  sha256(input: string): string;
  hmacSha256(input: string, key: string): string;
  uuidv4(): string;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeCryptopp');
