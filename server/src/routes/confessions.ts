import { Router } from 'express';
import { Confession, db } from '../db/index.js';
import { AuthRequest, requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/', (req, res) => {
  const message = typeof req.body?.message === 'string' ? req.body.message.trim() : '';
  if (!message) {
    res.status(400).json({ error: 'Message is required' });
    return;
  }
  if (message.length > 2000) {
    res.status(400).json({ error: 'Message is too long' });
    return;
  }

  const result = db.prepare('INSERT INTO confessions (message) VALUES (?)').run(message);
  const confession = db.prepare('SELECT * FROM confessions WHERE id = ?').get(result.lastInsertRowid) as Confession;
  res.status(201).json(confession);
});

router.get('/', requireAuth, (_req: AuthRequest, res) => {
  const confessions = db.prepare('SELECT * FROM confessions ORDER BY created_at DESC, id DESC').all() as Confession[];
  res.json(confessions);
});

router.delete('/:id', requireAuth, (req: AuthRequest, res) => {
  const result = db.prepare('DELETE FROM confessions WHERE id = ?').run(req.params.id);
  if (!result.changes) {
    res.status(404).json({ error: 'Confession not found' });
    return;
  }
  res.status(204).send();
});

export default router;