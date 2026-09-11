import { Schema, model } from 'mongoose';
import { IUser } from '../types/auth.js';

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true });

export const User = model<IUser>('User', UserSchema);
