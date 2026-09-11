import { Schema, model } from 'mongoose';
import { IMessage } from '../types/message.js';

const MessageSchema = new Schema<IMessage>({
  userId: { type: Schema.Types.Mixed, required: false, default: null },
  encryptedPayload: { type: String, required: true },
  cipher: { type: String, required: true, default: 'AES-GCM' },
  iv: { type: String, required: true },
  integrityHash: { type: String, required: true },
  hmac: { type: String, required: true },
  steganographyType: { type: String, enum: ['text', 'svg', 'none'], default: 'none' },
}, { timestamps: true });

export const Message = model<IMessage>('Message', MessageSchema);
