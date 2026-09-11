import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import messageRoutes from './routes/message.routes.js';
import payloadRoutes from './routes/payload.routes.js';
import historyRoutes from './routes/history.routes.js';
import { errorMiddleware } from './middleware/error.middleware.js';
import { env } from './config/environment.js';

const app: Express = express();

app.use(cors({ origin: env.CLIENT_URL || 'http://localhost:3000' }));
app.use(express.json());

// Health Check Endpoint
app.get('/api/health', (req: Request, res: Response) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.status(200).json({
    success: true,
    message: "Dead Man's Cipher API is running",
    database: dbStatus,
  });
});

app.use('/api/messages', messageRoutes);
app.use('/api/payloads', payloadRoutes);
app.use('/api/history', historyRoutes);

app.use(errorMiddleware);

export default app;
