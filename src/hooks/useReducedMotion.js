import { useSyncExternalStore } from 'react';

const consulta = () => window.matchMedia('(prefers-reduced-motion: reduce)');
const suscribir = (cb) => {
  const mq = consulta();
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};

/** true cuando el visitante pidió menos movimiento (§9). */
export function useReducedMotion() {
  return useSyncExternalStore(suscribir, () => consulta().matches, () => false);
}

export const prefiereMenosMovimiento = () => consulta().matches;
