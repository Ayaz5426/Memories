export interface Place {
  id: number;
  name: string;
  location: string | null;
  description: string | null;
  visited_date: string | null;
  cover_image: string | null;
  created_at: string;
  memory_count?: number;
  memories?: Memory[];
}

export interface Memory {
  id: number;
  place_id: number | null;
  type: 'photo' | 'video';
  file_url: string;
  caption: string | null;
  taken_at: string | null;
  created_at: string;
  place_name?: string;
}
