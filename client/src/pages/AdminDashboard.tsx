import { type FormEvent, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { api, mediaUrl } from '../api';
import { useAuth } from '../context/AuthContext';
import type { Confession, Memory, Place } from '../types';

export default function AdminDashboard() {
  const { isAuthenticated } = useAuth();
  const [places, setPlaces] = useState<Place[]>([]);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [confessions, setConfessions] = useState<Confession[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [placeForm, setPlaceForm] = useState({
    name: '',
    location: '',
    description: '',
    visited_date: '',
    cover_image: '',
  });
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const [uploadForm, setUploadForm] = useState({
    place_id: '',
    caption: '',
    taken_at: '',
    file: null as File | null,
  });

  async function refresh() {
    const [placesData, memoriesData, confessionsData] = await Promise.all([
      api.getPlaces(), api.getMemories(), api.getConfessions(),
    ]);
    setPlaces(placesData);
    setMemories(memoriesData);
    setConfessions(confessionsData);
  }

  useEffect(() => {
    refresh()
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  if (loading) return <div className="page-center">Loading admin panel...</div>;

  async function handleCreatePlace(e: FormEvent) {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const place = await api.createPlace({ ...placeForm, cover_image: '' });
      if (coverFile) {
        const formData = new FormData();
        formData.append('file', coverFile);
        formData.append('place_id', String(place.id));
        formData.append('caption', `${place.name} cover image`);
        const uploaded = await api.uploadMemory(formData);
        await api.updatePlace(place.id, { cover_image: uploaded.file_url });
      }
      setPlaceForm({ name: '', location: '', description: '', visited_date: '', cover_image: '' });
      setCoverFile(null);
      setMessage('Place created.');
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create place');
    }
  }

  async function handleUpload(e: FormEvent) {
    e.preventDefault();
    if (!uploadForm.file) {
      setError('Choose a photo or video file.');
      return;
    }

    setMessage('');
    setError('');
    const formData = new FormData();
    formData.append('file', uploadForm.file);
    if (uploadForm.place_id) formData.append('place_id', uploadForm.place_id);
    if (uploadForm.caption) formData.append('caption', uploadForm.caption);
    if (uploadForm.taken_at) formData.append('taken_at', uploadForm.taken_at);

    try {
      await api.uploadMemory(formData);
      setUploadForm({ place_id: '', caption: '', taken_at: '', file: null });
      setMessage('Memory uploaded.');
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    }
  }

  async function handleDeletePlace(id: number) {
    if (!confirm('Delete this place? Memories will remain but become unassigned.')) return;
    try {
      await api.deletePlace(id);
      setMessage('Place deleted.');
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  }

  async function handleDeleteMemory(id: number) {
    if (!confirm('Delete this memory permanently?')) return;
    try {
      await api.deleteMemory(id);
      setMessage('Memory deleted.');
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  }

  async function handleDeleteConfession(id: number) {
    if (!confirm('Delete this private message?')) return;
    try {
      await api.deleteConfession(id);
      setMessage('Private message deleted.');
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  }

  return (
    <div className="page">
      <section className="hero compact">
        <p className="eyebrow">Admin dashboard</p>
        <h1>Manage places, photos & videos</h1>
      </section>

      {message && <p className="banner success">{message}</p>}
      {error && <p className="banner error">{error}</p>}

      <div className="admin-grid">
        <section className="panel">
          <h2>Add a place</h2>
          <form onSubmit={handleCreatePlace} className="stack-form">
            <label>
              Name
              <input
                value={placeForm.name}
                onChange={(e) => setPlaceForm({ ...placeForm, name: e.target.value })}
                required
              />
            </label>
            <label>
              Location
              <input
                value={placeForm.location}
                onChange={(e) => setPlaceForm({ ...placeForm, location: e.target.value })}
                placeholder="City, Country"
              />
            </label>
            <label>
              Visited date
              <input
                type="date"
                value={placeForm.visited_date}
                onChange={(e) => setPlaceForm({ ...placeForm, visited_date: e.target.value })}
              />
            </label>
            <label>
              Description
              <textarea
                value={placeForm.description}
                onChange={(e) => setPlaceForm({ ...placeForm, description: e.target.value })}
                rows={3}
              />
            </label>
            <label>
              Cover image URL (optional)
              <input
                value={placeForm.cover_image}
                onChange={(e) => setPlaceForm({ ...placeForm, cover_image: e.target.value })}
                placeholder="/uploads/your-image.jpg"
              />
            </label>
            <label>
              Or upload a cover image
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)}
              />
            </label>
            <button type="submit">Create place</button>
          </form>
        </section>

        <section className="panel">
          <h2>Upload memory</h2>
          <form onSubmit={handleUpload} className="stack-form">
            <label>
              File
              <input
                type="file"
                accept="image/*,video/*"
                onChange={(e) =>
                  setUploadForm({ ...uploadForm, file: e.target.files?.[0] ?? null })
                }
                required
              />
            </label>
            <label>
              Place
              <select
                value={uploadForm.place_id}
                onChange={(e) => setUploadForm({ ...uploadForm, place_id: e.target.value })}
              >
                <option value="">Unassigned</option>
                {places.map((place) => (
                  <option key={place.id} value={place.id}>
                    {place.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Caption
              <input
                value={uploadForm.caption}
                onChange={(e) => setUploadForm({ ...uploadForm, caption: e.target.value })}
              />
            </label>
            <label>
              Taken on
              <input
                type="date"
                value={uploadForm.taken_at}
                onChange={(e) => setUploadForm({ ...uploadForm, taken_at: e.target.value })}
              />
            </label>
            <button type="submit">Upload</button>
          </form>
        </section>
      </div>

      <section className="section">
        <div className="section-header">
          <h2>Places</h2>
        </div>
        <div className="admin-list">
          {places.map((place) => (
            <div key={place.id} className="admin-row">
              <div>
                <strong>{place.name}</strong>
                <p className="muted">{place.location || 'No location'}</p>
              </div>
              <button type="button" className="danger" onClick={() => handleDeletePlace(place.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Private confessions</h2>
        </div>
        <div className="admin-list">
          {confessions.length === 0 ? (
            <div className="empty-state"><p>No private messages yet.</p></div>
          ) : confessions.map((item) => (
            <div key={item.id} className="admin-row">
              <div>
                <strong>{item.message}</strong>
                <p className="muted">{new Date(item.created_at).toLocaleString()}</p>
              </div>
              <button type="button" className="danger" onClick={() => handleDeleteConfession(item.id)}>Delete</button>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>All memories</h2>
        </div>
        <div className="admin-memory-list">
          {memories.map((memory) => (
            <div key={memory.id} className="admin-memory-row">
              <div className="admin-thumb">
                {memory.type === 'video' ? (
                  <video src={mediaUrl(memory.file_url)} muted />
                ) : (
                  <img src={mediaUrl(memory.file_url)} alt={memory.caption || 'Memory'} />
                )}
              </div>
              <div>
                <strong>{memory.caption || 'Untitled memory'}</strong>
                <p className="muted">{memory.place_name || 'Unassigned'}</p>
              </div>
              <button type="button" className="danger" onClick={() => handleDeleteMemory(memory.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
