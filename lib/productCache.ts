// Simple in-memory cache for product listings
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

interface CacheEntry {
  data: any;
  timestamp: number;
}

export function getCacheKey(page: number, limit: number): string {
  return `products_${page}_${limit}`;
}

export function getFromCache(key: string): any | null {
  const entry = cache.get(key) as CacheEntry | undefined;
  if (!entry) return null;
  
  if (Date.now() - entry.timestamp > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  
  return entry.data;
}

export function setInCache(key: string, data: any): void {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
}

export function invalidateCache(): void {
  cache.clear();
}
