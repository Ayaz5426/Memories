const API_BASE = '/api';

function authHeaders(): HeadersInit {
  const token = localStorage.getItem('memories_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...authHeaders(),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Request failed (${res.status})`);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

export const api = {
  login: (username: string, password: string) =>
    request<{ token: string; username: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),

  getPlaces: () => request<import('./types').Place[]>('/places'),

  getPlace: (id: number) => request<import('./types').Place>(`/places/${id}`),

  createPlace: (data: Partial<import('./types').Place>) =>
    request<import('./types').Place>('/places', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updatePlace: (id: number, data: Partial<import('./types').Place>) =>
    request<import('./types').Place>(`/places/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deletePlace: (id: number) =>
    request<void>(`/places/${id}`, { method: 'DELETE' }),

  getMemories: () => request<import('./types').Memory[]>('/memories'),

  updateMemory: (id: number, data: Partial<import('./types').Memory>) =>
    request<import('./types').Memory>(`/memories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteMemory: (id: number) =>
    request<void>(`/memories/${id}`, { method: 'DELETE' }),

  uploadMemory: (formData: FormData) =>
    request<import('./types').Memory>('/upload', {
      method: 'POST',
      body: formData,
    }),
};

export function mediaUrl(path: string) {
  if (path.startsWith('http')) return path;
  return path;
}
