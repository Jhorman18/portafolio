import { useCallback, useSyncExternalStore } from 'react';

export function useMediaQuery(query) {
  const suscribir = useCallback((cb) => {
    const mq = window.matchMedia(query);
    mq.addEventListener('change', cb);
    return () => mq.removeEventListener('change', cb);
  }, [query]);
  return useSyncExternalStore(suscribir, () => window.matchMedia(query).matches, () => false);
}
