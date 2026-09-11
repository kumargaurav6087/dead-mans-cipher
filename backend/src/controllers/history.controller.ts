import { Request, Response } from 'express';
import { Message } from '../models/Message.js';
import mongoose from 'mongoose';

export async function getHistory(req: Request, res: Response): Promise<void> {
  try {
    let records: any[] = [];
    if (mongoose.connection.readyState === 1) {
      records = await Message.find()
        .sort({ createdAt: -1 })
        .select('_id cipher steganographyType createdAt');
    }

    const formattedHistory = records.map((doc, idx) => ({
      id: `#${String(idx + 1).padStart(3, '0')}`,
      recordId: doc._id,
      cipher: doc.cipher || 'AES-GCM',
      steganographyType: doc.steganographyType || 'none',
      status: 'Encrypted',
      createdAt: doc.createdAt ? new Date(doc.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Today',
    }));

    res.status(200).json({
      success: true,
      count: formattedHistory.length,
      data: formattedHistory,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Server error fetching history.' });
  }
}

