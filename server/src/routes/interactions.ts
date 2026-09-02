import { Router } from 'express';
import { InteractionEvent, db } from '../db/index.js';
import { AuthRequest, requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/', (req, res) => {
  const eventType = typeof req.body?.event_type === 'string' ? req.body.event_type.trim() : '';
  const eventValue = req.body?.event_value == null ? null : String(req.body.event_value).slice(0, 500);
  if (!eventType || eventType.length > 80) {
    res.status(400).json({ error: 'Event type is required' });
    return;
  }

  const result = db.prepare('INSERT INTO interaction_events (event_type, event_value) VALUES (?, ?)').run(eventType, eventValue);
  const event = db.prepare('SELECT * FROM interaction_events WHERE id = ?').get(result.lastInsertRowid) as InteractionEvent;
  res.status(201).json(event);
});

router.get('/', requireAuth, (_req: AuthRequest, res) => {
  const events = db.prepare('SELECT * FROM interaction_events ORDER BY created_at DESC, id DESC LIMIT 500').all() as InteractionEvent[];
  res.json(events);
});

router.delete('/:id', requireAuth, (req: AuthRequest, res) => {
  const result = db.prepare('DELETE FROM interaction_events WHERE id = ?').run(req.params.id);
  if (!result.changes) {
    res.status(404).json({ error: 'Interaction not found' });
    return;
  }
  res.status(204).send();
});

export default router;