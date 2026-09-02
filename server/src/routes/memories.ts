import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { db, Memory } from '../db/index.js';
import { AuthRequest, requireAuth } from '../middleware/auth.js';

const router = Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, '../../uploads');

router.get('/', (_req, res) => {
  const memories = db
    .prepare(
      `SELECT m.*, p.name as place_name
       FROM memories m
       LEFT JOIN places p ON p.id = m.place_id
       ORDER BY m.taken_at DESC, m.created_at DESC`
    )
    .all();

  res.json(memories);
});

router.put('/:id', requireAuth, (req: AuthRequest, res) => {
  const existing = db.prepare('SELECT * FROM memories WHERE id = ?').get(req.params.id) as Memory | undefined;
  if (!existing) {
    res.status(404).json({ error: 'Memory not found' });
    return;
  }

  const { place_id, caption, taken_at } = req.body as {
    place_id?: number | null;
    caption?: string | null;
    taken_at?: string | null;
  };

  db.prepare('UPDATE memories SET place_id = ?, caption = ?, taken_at = ? WHERE id = ?').run(
    place_id !== undefined ? place_id : existing.place_id,
    caption !== undefined ? caption : existing.caption,
    taken_at !== undefined ? taken_at : existing.taken_at,
    req.params.id
  );

  const memory = db.prepare('SELECT * FROM memories WHERE id = ?').get(req.params.id);
  res.json(memory);
});

router.delete('/:id', requireAuth, (req: AuthRequest, res) => {
  const existing = db.prepare('SELECT * FROM memories WHERE id = ?').get(req.params.id) as Memory | undefined;
  if (!existing) {
    res.status(404).json({ error: 'Memory not found' });
    return;
  }

  const filename = path.basename(existing.file_url);
  const filePath = path.join(uploadsDir, filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  db.prepare('DELETE FROM memories WHERE id = ?').run(req.params.id);
  res.status(204).send();
});

export default router;
