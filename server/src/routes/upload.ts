import { Router } from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from '../db/index.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, '../storage/uploads');

fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = /^(image\/|video\/)/;
    if (allowed.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image and video files are allowed'));
    }
  },
});

router.post('/', requireAuth, upload.single('file'), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: 'File is required' });
    return;
  }

  const type = req.file.mimetype.startsWith('video/') ? 'video' : 'photo';
  const fileUrl = `/uploads/${req.file.filename}`;
  const placeId = req.body.place_id ? Number(req.body.place_id) : null;
  const caption = req.body.caption || null;
  const takenAt = req.body.taken_at || null;

  const result = db
    .prepare(
      'INSERT INTO memories (place_id, type, file_url, caption, taken_at) VALUES (?, ?, ?, ?, ?)'
    )
    .run(placeId, type, fileUrl, caption, takenAt);

  const memory = db.prepare('SELECT * FROM memories WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(memory);
});

export default router;
