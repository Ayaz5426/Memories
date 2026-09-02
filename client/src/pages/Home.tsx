import { useEffect, useState } from 'react';
import { api } from '../api';
import MemoryCard from '../components/MemoryCard';
import PlaceCard from '../components/PlaceCard';
import type { Memory, Place } from '../types';

export default function Home() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([api.getPlaces(), api.getMemories()])
      .then(([placesData, memoriesData]) => {
        setPlaces(placesData);
        setMemories(memoriesData);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page-center">Loading memories...</div>;
  if (error) return <div className="page-center error">{error}</div>;

  return (
    <div className="page">
      <section className="hero">
        <p className="eyebrow">Welcome back</p>
        <h1>Memories of our marriage & the places we've visited</h1>
        <p className="lead">
          A living album of photos and videos from the moments and destinations that matter most.
        </p>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Places</h2>
          <p className="muted">{places.length} destinations</p>
        </div>
        {places.length === 0 ? (
          <div className="empty-state">
            <p>No places yet. Sign in as admin to add your first destination.</p>
          </div>
        ) : (
          <div className="place-grid">
            {places.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        )}
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Recent memories</h2>
          <p className="muted">{memories.length} photos & videos</p>
        </div>
        {memories.length === 0 ? (
          <div className="empty-state">
            <p>No photos or videos uploaded yet.</p>
          </div>
        ) : (
          <div className="memory-grid">
            {memories.slice(0, 12).map((memory) => (
              <MemoryCard key={memory.id} memory={memory} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
