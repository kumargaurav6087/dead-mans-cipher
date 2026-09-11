export interface EncryptedMessageRecord {
  id: string;
  userId: string;
  encryptedPayload: string;
  cipher: string;
  iv: string;
  integrityHash: string;
  hmac: string;
  steganographyType?: 'text' | 'svg' | 'none';
  createdAt: string;
  updatedAt: string;
}
