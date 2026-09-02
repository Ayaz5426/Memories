import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { seedAdmin } from './db/index.js';
import authRoutes from './routes/auth.js';
import placesRoutes from './routes/places.js';
import memoriesRoutes from './routes/memories.js';
import uploadRoutes from './routes/upload.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = Number(process.env.PORT) || 3001;

seedAdmin(
  process.env.ADMIN_USERNAME || 'admin',
  process.env.ADMIN_PASSWORD || 'change-me'
);

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../../storage/uploads')));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/places', placesRoutes);
app.use('/api/memories', memoriesRoutes);
app.use('/api/upload', uploadRoutes);

const clientDist = path.join(__dirname, '../../client/dist');
app.use(express.static(clientDist));
app.get('*', (_req, res) => {
  res.sendFile(path.join(clientDist, 'index.html'));
});

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (err.message === 'Only image and video files are allowed') {
    res.status(400).json({ error: err.message });
    return;
  }
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Memories API running on http://localhost:${port}`);
});
