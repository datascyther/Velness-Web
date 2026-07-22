interface CacheEntry {
  data: unknown;
  timestamp: number;
  ttl: number;
}

const cache = new Map<string, CacheEntry>();
const DEFAULT_TTL = 10 * 60 * 1000;

export function cacheGet<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > entry.ttl) {
    cache.delete(key);
    return null;
  }
  return entry.data as T;
}

export function cacheSet(key: string, data: unknown, ttl = DEFAULT_TTL): void {
  cache.set(key, { data, timestamp: Date.now(), ttl });
}
