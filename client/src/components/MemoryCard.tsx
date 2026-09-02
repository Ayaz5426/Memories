import { mediaUrl } from '../api';
import type { Memory } from '../types';

function formatDate(date: string | null) {
  if (!date) return '';
  return new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function MemoryCard({ memory }: { memory: Memory }) {
  return (
    <article className="memory-card">
      <div className="memory-media">
        {memory.type === 'video' ? (
          <video src={mediaUrl(memory.file_url)} controls preload="metadata" />
        ) : (
          <img src={mediaUrl(memory.file_url)} alt={memory.caption || 'Memory'} loading="lazy" />
        )}
      </div>
      <div className="memory-body">
        {memory.caption && <p>{memory.caption}</p>}
        <div className="memory-meta">
          {memory.place_name && <span>{memory.place_name}</span>}
          {memory.taken_at && <span>{formatDate(memory.taken_at)}</span>}
        </div>
      </div>
    </article>
  );
}
