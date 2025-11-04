import { storage } from '../../../server/storage';

export default async function handler(req: any, res: any) {
  const { id } = req.query as { id?: string };

  if (!id) {
    res.status(400).json({ error: 'Missing id' });
    return;
  }

  if (req.method === 'DELETE') {
    try {
      const success = await storage.deleteConversation(id);
      if (!success) {
        res.status(404).json({ error: 'Conversation not found' });
        return;
      }
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Delete conversation error:', error);
      res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to delete conversation' });
    }
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
}
