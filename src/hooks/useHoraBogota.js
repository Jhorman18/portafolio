import { useEffect, useState } from 'react';

const formato = new Intl.DateTimeFormat('es-CO', {
  timeZone: 'America/Bogota', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
});

/** Hora local de Bogotá, actualizada en vivo. */
export function useHoraBogota() {
  const [hora, setHora] = useState(() => formato.format(new Date()));
  useEffect(() => {
    const id = setInterval(() => setHora(formato.format(new Date())), 15000);
    return () => clearInterval(id);
  }, []);
  return hora;
}
