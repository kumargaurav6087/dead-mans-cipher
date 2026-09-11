import mongoose from 'mongoose';
import { env } from './environment.js';

export async function connectDatabase(): Promise<void> {
  try {
    await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB Connection Error:', error instanceof Error ? error.message : error);
    console.log('Warning: Running with in-memory fallback store if MongoDB is offline.');
  }
}

