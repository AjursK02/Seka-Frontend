type CachedEntry<T> = {
  expiresAt: number;
  value?: T;
  promise?: Promise<T>;
};

const requestCache = new Map<string, CachedEntry<unknown>>();

export function cachedRequest<T>(key: string, ttlMs: number, fetcher: () => Promise<T>): Promise<T> {
  const now = Date.now();
  const cached = requestCache.get(key);

  if (cached?.value !== undefined && cached.expiresAt > now) {
    return Promise.resolve(cached.value as T);
  }

  if (cached?.promise) {
    return cached.promise as Promise<T>;
  }

  const promise = fetcher()
    .then((value) => {
      requestCache.set(key, {
        value,
        expiresAt: Date.now() + ttlMs,
      });

      return value;
    })
    .catch((error) => {
      const current = requestCache.get(key);
      if (current?.promise === promise) {
        requestCache.delete(key);
      }
      throw error;
    });

  requestCache.set(key, {
    promise,
    expiresAt: now + ttlMs,
  });

  return promise;
}

export function invalidateRequestCache(prefix?: string) {
  if (!prefix) {
    requestCache.clear();
    return;
  }

  for (const key of requestCache.keys()) {
    if (key.startsWith(prefix)) {
      requestCache.delete(key);
    }
  }
}
