import { Document, Types } from 'mongoose';

export interface IMessage extends Document {
  userId?: Types.ObjectId | string;
  encryptedPayload: string;
  cipher: string;
  iv: string;
  integrityHash: string;
  hmac: string;
  steganographyType: 'text' | 'svg' | 'none';
  createdAt: Date;
  updatedAt: Date;
}
