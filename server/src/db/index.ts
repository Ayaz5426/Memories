import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '../../storage/data');
const dbPath = path.join(dataDir, 'memories.db');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

export const db = new Database(dbPath);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS places (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    location TEXT,
    description TEXT,
    visited_date TEXT,
    cover_image TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS memories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    place_id INTEGER,
    type TEXT NOT NULL CHECK(type IN ('photo', 'video')),
    file_url TEXT NOT NULL,
    caption TEXT,
    taken_at TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (place_id) REFERENCES places(id) ON DELETE SET NULL
  );

  CREATE TABLE IF NOT EXISTS confessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  );
`);

export function seedAdmin(username: string, password: string) {
  const existing = db.prepare('SELECT id FROM admin_users WHERE username = ?').get(username);
  if (existing) return;

  const passwordHash = bcrypt.hashSync(password, 10);
  db.prepare('INSERT INTO admin_users (username, password_hash) VALUES (?, ?)').run(
    username,
    passwordHash
  );
}

export interface Place {
  id: number;
  name: string;
  location: string | null;
  description: string | null;
  visited_date: string | null;
  cover_image: string | null;
  created_at: string;
}

export interface Memory {
  id: number;
  place_id: number | null;
  type: 'photo' | 'video';
  file_url: string;
  caption: string | null;
  taken_at: string | null;
  created_at: string;
}

export interface Confession {
  id: number;
  message: string;
  created_at: string;
}
