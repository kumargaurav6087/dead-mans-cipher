import { Router } from 'express';
import { createPayload, getPayloadById } from '../controllers/payload.controller.js';

const router = Router();

router.post('/', createPayload);
router.get('/:id', getPayloadById);

export default router;
