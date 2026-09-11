import { Request, Response } from 'express';
import { Message } from '../models/Message.js';
import mongoose from 'mongoose';

// In-memory fallback cache if MongoDB database connection is offline
const inMemoryMessages: any[] = [];

const FORBIDDEN_PLAINTEXT_KEYS = [
  'message',
  'plaintext',
  'secretmessage',
  'decryptedmessage',
  'privatekey',
  'encryptionkey',
  'key',
  'secret',
];

export async function createMessage(req: Request, res: Response): Promise<void> {
  try {
    const bodyKeys = Object.keys(req.body || {}).map((k) => k.toLowerCase());
    const hasPlaintext = FORBIDDEN_PLAINTEXT_KEYS.some((forbiddenKey) => bodyKeys.includes(forbiddenKey));

    if (hasPlaintext) {
      res.status(400).json({
        success: false,
        error: 'Security Violation: Plaintext secret messages or private keys must never be transmitted to the backend.',
      });
      return;
    }

    const { cipher, encryptedPayload, iv, integrityHash, hmac, steganographyType } = req.body;

    if (!encryptedPayload || !iv || !integrityHash || !hmac) {
      res.status(400).json({
        success: false,
        error: 'Invalid payload: encryptedPayload, iv, integrityHash, and hmac are required.',
      });
      return;
    }

    const recordData = {
      cipher: cipher || 'AES-GCM',
      encryptedPayload,
      iv,
      integrityHash,
      hmac,
      steganographyType: steganographyType || 'none',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (mongoose.connection.readyState === 1) {
      const messageDoc = new Message(recordData);
      await messageDoc.save();
      res.status(201).json({ success: true, data: messageDoc });
    } else {
      const doc = { _id: `msg_${Date.now()}`, ...recordData };
      inMemoryMessages.unshift(doc);
      res.status(201).json({ success: true, data: doc });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Server error creating encrypted message.' });
  }
}

export async function getMessages(req: Request, res: Response): Promise<void> {
  try {
    if (mongoose.connection.readyState === 1) {
      const messages = await Message.find().sort({ createdAt: -1 }).select('-__v');
      res.status(200).json({ success: true, count: messages.length, data: messages });
    } else {
      res.status(200).json({ success: true, count: inMemoryMessages.length, data: inMemoryMessages });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Server error fetching encrypted messages.' });
  }
}

export async function getMessageById(req: Request, res: Response): Promise<void> {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
      const message = await Message.findById(id).select('-__v');
      if (!message) {
        res.status(404).json({ success: false, error: 'Message not found.' });
        return;
      }
      res.status(200).json({ success: true, data: message });
    } else {
      const found = inMemoryMessages.find((m) => m._id === id);
      if (!found) {
        res.status(404).json({ success: false, error: 'Message not found.' });
        return;
      }
      res.status(200).json({ success: true, data: found });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Server error fetching message.' });
  }
}

export async function deleteMessage(req: Request, res: Response): Promise<void> {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
      const deleted = await Message.findByIdAndDelete(id);
      if (!deleted) {
        res.status(404).json({ success: false, error: 'Message record not found.' });
        return;
      }
      res.status(200).json({ success: true, message: 'Message deleted successfully.' });
    } else {
      const idx = inMemoryMessages.findIndex((m) => m._id === id);
      if (idx !== -1) {
        inMemoryMessages.splice(idx, 1);
        res.status(200).json({ success: true, message: 'Message deleted successfully.' });
      } else {
        res.status(404).json({ success: false, error: 'Message record not found.' });
      }
    }
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Server error deleting message.' });
  }
}

