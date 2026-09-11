export interface CryptoConfig {
  algorithm: 'AES-GCM' | 'RSA-OAEP' | 'ECDH';
  keySize: number;
}

export type { SecureCipherPayload } from '@/types/crypto';
