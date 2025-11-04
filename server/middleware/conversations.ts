import { Request, Response, NextFunction } from 'express';
import { storage } from '../storage';

export async function deleteConversationById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: 'Missing conversation ID' });
    }

    const success = await storage.deleteConversation(id);
    
    if (!success) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error deleting conversation:', error);
    next(error);
  }
}