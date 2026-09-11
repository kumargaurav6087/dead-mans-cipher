import { Router } from 'express';
import { getMessages, createMessage, getMessageById, deleteMessage } from '../controllers/message.controller.js';

const router = Router();

router.get('/', getMessages);
router.post('/', createMessage);
router.get('/:id', getMessageById);
router.delete('/:id', deleteMessage);

export default router;
