import { Schema, model } from 'mongoose';
import { IPayload } from '../types/payload.js';

const PayloadSchema = new Schema<IPayload>({
  messageId: { type: Schema.Types.ObjectId, ref: 'Message', required: true },
  payloadType: { type: String, required: true },
  encodedPayload: { type: String, required: true },
  metadata: { type: Schema.Types.Mixed, default: {} },
}, { timestamps: true });

export const Payload = model<IPayload>('Payload', PayloadSchema);
