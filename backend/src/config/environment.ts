import dotenv from 'dotenv';

dotenv.config();

export const env = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/dead_mans_cipher',
  JWT_SECRET: process.env.JWT_SECRET || 'default_secret_key',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
};
