import { Request, Response } from 'express';

const inMemoryPayloads = new Map<string, any>();

export async function createPayload(req: Request, res: Response): Promise<void> {
  try {
    const { encryptedPayload, steganographyType } = req.body;
    if (!encryptedPayload) {
      res.status(400).json({ success: false, error: 'encryptedPayload is required.' });
      return;
    }
    const id = `payload_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const payloadDoc = {
      id,
      encryptedPayload,
      steganographyType: steganographyType || 'text',
      createdAt: new Date().toISOString(),
    };
    inMemoryPayloads.set(id, payloadDoc);
    res.status(201).json({ success: true, data: payloadDoc });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Error creating payload.' });
  }
}

export async function getPayloadById(req: Request, res: Response): Promise<void> {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const payload = inMemoryPayloads.get(id);
    if (!payload) {
      res.status(404).json({ success: false, error: 'Payload not found.' });
      return;
    }
    res.status(200).json({ success: true, data: payload });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Error retrieving payload.' });
  }
}

