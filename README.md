# Memories

A personal gallery for marriage moments and places you've visited — built with **React** (frontend) and **Node/Express** (backend).

## Features

- Public gallery of places and recent photos/videos
- Place detail pages with all media from each destination
- Admin login to manage content
- Upload photos and videos (up to 100 MB each)
- Create and delete places
- SQLite database — no external DB setup required

## Project structure

```
memories/
├── client/     React + Vite frontend
├── server/     Express API + SQLite + file uploads
└── package.json
```

## Quick start

### 1. Install dependencies

```bash
cd server && npm install
cd ../client && npm install
```

### 2. Configure environment

Copy the example env file and set your admin credentials:

```bash
cp server/.env.example server/.env
```

Edit `server/.env`:

```
PORT=3001
JWT_SECRET=your-long-random-secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
CLIENT_URL=http://localhost:5173
```

### 3. Run locally

In one terminal (API):

```bash
cd server && npm run dev
```

In another terminal (frontend):

```bash
cd client && npm run dev
```

Open **http://localhost:5173**

- Public gallery: `/`
- Admin login: `/admin/login`
- Admin dashboard: `/admin`

Default admin credentials come from `server/.env` (username `admin`, password `change-me` until you update it).

## Admin workflow

1. Sign in at `/admin/login`
2. **Add a place** — name, location, visit date, description
3. **Upload memories** — choose a photo or video, optionally assign to a place, add caption/date
4. View the public gallery to see your collection

## API overview

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/api/auth/login` | — | Admin login |
| GET | `/api/places` | — | List places |
| GET | `/api/places/:id` | — | Place + its memories |
| POST | `/api/places` | Admin | Create place |
| DELETE | `/api/places/:id` | Admin | Delete place |
| GET | `/api/memories` | — | List all memories |
| POST | `/api/upload` | Admin | Upload photo/video |
| DELETE | `/api/memories/:id` | Admin | Delete memory |

Uploaded files are stored in `server/uploads/` and served at `/uploads/...`.

## Production notes

- Change `JWT_SECRET` and `ADMIN_PASSWORD` before deploying
- Consider cloud storage (S3, Cloudinary) for media in production
- Build the client with `cd client && npm run build` and serve static files from Express if needed

## Deploy on Render

1. Push the repository to GitHub and create a new Render Blueprint from it.
2. Render will detect `render.yaml` and create the web service.
3. Set `ADMIN_USERNAME` and `ADMIN_PASSWORD` in the Render environment variables.
4. Keep the persistent disk enabled because it stores the SQLite database and uploaded media.

## License

Private — for personal use.
