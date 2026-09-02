import { Link } from 'react-router-dom';
import { mediaUrl } from '../api';
import type { Place } from '../types';

function formatDate(date: string | null) {
  if (!date) return '';
  return new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function PlaceCard({ place }: { place: Place }) {
  return (
    <Link to={`/places/${place.id}`} className="place-card">
      <div className="place-card-media">
        {place.cover_image ? (
          <img src={mediaUrl(place.cover_image)} alt={place.name} loading="lazy" />
        ) : (
          <div className="placeholder-media">{place.name.slice(0, 1)}</div>
        )}
      </div>
      <div className="place-card-body">
        <h3>{place.name}</h3>
        {place.location && <p className="muted">{place.location}</p>}
        {place.visited_date && <p className="date">{formatDate(place.visited_date)}</p>}
        <span className="badge">{place.memory_count ?? 0} memories</span>
      </div>
    </Link>
  );
}
