import { Document, Types } from 'mongoose';

export interface IPayload extends Document {
  messageId: Types.ObjectId;
  payloadType: string;
  encodedPayload: string;
  metadata: Record<string, any>;
  createdAt: Date;
}
