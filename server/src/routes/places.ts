import { Router } from 'express';
import { db, Place } from '../db/index.js';
import { AuthRequest, requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', (_req, res) => {
  const places = db
    .prepare(
      `SELECT p.*, COUNT(m.id) as memory_count
       FROM places p
       LEFT JOIN memories m ON m.place_id = p.id
       GROUP BY p.id
       ORDER BY p.visited_date DESC, p.created_at DESC`
    )
    .all() as (Place & { memory_count: number })[];

  res.json(places);
});

router.get('/:id', (req, res) => {
  const place = db.prepare('SELECT * FROM places WHERE id = ?').get(req.params.id) as Place | undefined;
  if (!place) {
    res.status(404).json({ error: 'Place not found' });
    return;
  }

  const memories = db
    .prepare('SELECT * FROM memories WHERE place_id = ? ORDER BY taken_at DESC, created_at DESC')
    .all(place.id);

  res.json({ ...place, memories });
});

router.post('/', requireAuth, (req: AuthRequest, res) => {
  const { name, location, description, visited_date, cover_image } = req.body as Partial<Place>;

  if (!name?.trim()) {
    res.status(400).json({ error: 'Name is required' });
    return;
  }

  const result = db
    .prepare(
      'INSERT INTO places (name, location, description, visited_date, cover_image) VALUES (?, ?, ?, ?, ?)'
    )
    .run(name.trim(), location ?? null, description ?? null, visited_date ?? null, cover_image ?? null);

  const place = db.prepare('SELECT * FROM places WHERE id = ?').get(result.lastInsertRowid) as Place;
  res.status(201).json(place);
});

router.put('/:id', requireAuth, (req: AuthRequest, res) => {
  const existing = db.prepare('SELECT * FROM places WHERE id = ?').get(req.params.id) as Place | undefined;
  if (!existing) {
    res.status(404).json({ error: 'Place not found' });
    return;
  }

  const { name, location, description, visited_date, cover_image } = req.body as Partial<Place>;

  db.prepare(
    `UPDATE places SET name = ?, location = ?, description = ?, visited_date = ?, cover_image = ?
     WHERE id = ?`
  ).run(
    name?.trim() ?? existing.name,
    location ?? existing.location,
    description ?? existing.description,
    visited_date ?? existing.visited_date,
    cover_image ?? existing.cover_image,
    req.params.id
  );

  const place = db.prepare('SELECT * FROM places WHERE id = ?').get(req.params.id) as Place;
  res.json(place);
});

router.delete('/:id', requireAuth, (req: AuthRequest, res) => {
  const existing = db.prepare('SELECT * FROM places WHERE id = ?').get(req.params.id);
  if (!existing) {
    res.status(404).json({ error: 'Place not found' });
    return;
  }

  db.prepare('DELETE FROM places WHERE id = ?').run(req.params.id);
  res.status(204).send();
});

export default router;
