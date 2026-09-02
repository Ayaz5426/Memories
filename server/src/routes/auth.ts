import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db/index.js';

const router = Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body as { username?: string; password?: string };

  if (!username || !password) {
    res.status(400).json({ error: 'Username and password required' });
    return;
  }

  const user = db
    .prepare('SELECT id, username, password_hash FROM admin_users WHERE username = ?')
    .get(username) as { id: number; username: string; password_hash: string } | undefined;

  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    res.status(500).json({ error: 'Server misconfigured' });
    return;
  }

  const token = jwt.sign({ id: user.id, username: user.username }, secret, { expiresIn: '7d' });
  res.json({ token, username: user.username });
});

export default router;
