import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api, mediaUrl } from '../api';
import MemoryCard from '../components/MemoryCard';
import type { Place } from '../types';

function formatDate(date: string | null) {
  if (!date) return '';
  return new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function PlaceDetail() {
  const { id } = useParams();
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    api
      .getPlace(Number(id))
      .then(setPlace)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="page-center">Loading place...</div>;
  if (error) return <div className="page-center error">{error}</div>;
  if (!place) return <div className="page-center">Place not found</div>;

  return (
    <div className="page">
      <Link to="/" className="back-link">← Back to gallery</Link>

      <section className="place-hero">
        {place.cover_image ? (
          <img className="place-hero-image" src={mediaUrl(place.cover_image)} alt={place.name} />
        ) : (
          <div className="place-hero-image placeholder-media">{place.name.slice(0, 1)}</div>
        )}
        <div className="place-hero-copy">
          <p className="eyebrow">{place.location || 'Destination'}</p>
          <h1>{place.name}</h1>
          {place.visited_date && <p className="date">{formatDate(place.visited_date)}</p>}
          {place.description && <p className="lead">{place.description}</p>}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Memories from this place</h2>
          <p className="muted">{place.memories?.length ?? 0} items</p>
        </div>
        {!place.memories?.length ? (
          <div className="empty-state">
            <p>No media for this place yet.</p>
          </div>
        ) : (
          <div className="memory-grid">
            {place.memories.map((memory) => (
              <MemoryCard key={memory.id} memory={memory} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
