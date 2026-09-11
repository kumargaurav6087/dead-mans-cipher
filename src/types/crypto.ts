export type CipherAlgorithm = 'AES-GCM' | 'RSA-OAEP' | 'ECDH';

export interface CryptoKeyPairResult {
  publicKey: CryptoKey;
  privateKey: CryptoKey;
}

export interface EncryptedDataResult {
  ciphertext: ArrayBuffer;
  iv: Uint8Array;
  tag?: ArrayBuffer;
}

export interface SecureCipherPayload {
  version: "1.0";
  algorithm: "AES-GCM";
  ciphertext: string;
  iv: string;
  integrityHash: string;
  hmac: string;
  createdAt: string;
}
