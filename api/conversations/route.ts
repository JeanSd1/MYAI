import { storage } from '../../server/storage';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const conversations = await storage.getAllConversations();
    res.status(200).json(conversations);
  } catch (error) {
    console.error('Get conversations error:', error);
    res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to get conversations' });
  }
}
