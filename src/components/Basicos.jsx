import { useHoraBogota } from '../hooks/useHoraBogota';

/** Etiqueta de sección: número + raya que se dibuja + nombre (`04 — Proyectos`). */
export function Etiqueta({ numero, children }) {
  return (
    <p className="etiqueta label revelar">
      <span>{numero}</span>
      <span className="raya" aria-hidden="true" />
      <span className="txt">{children}</span>
    </p>
  );
}

/** Dato pendiente de confirmar: se deja visible a propósito (§0). */
export function Confirmar({ children = 'CONFIRMAR' }) {
  return <span className="confirmar">⟦{children}⟧</span>;
}

/** Tags de tecnología: texto mono separado por `·`. Nunca píldoras. */
export function Tags({ items, className = '', ...resto }) {
  return (
    <ul className={`tags ${className}`} {...resto}>
      {items.map((t) => <li key={t}>{t}</li>)}
    </ul>
  );
}

/** Pantalla montada: bisel, barra de 28 px con tres puntos neutros y la captura. */
export function Pantalla({ captura, className = '', decorativa = false, imgRef, prioridad = false, ...resto }) {
  return (
    <span className={`pantalla ${className}`} {...resto}>
      <span className="barra" aria-hidden="true"><i /><i /><i /></span>
      <img
        ref={imgRef}
        src={captura.src}
        width={captura.w}
        height={captura.h}
        alt={decorativa ? '' : captura.alt}
        loading={prioridad ? 'eager' : 'lazy'}
        decoding="async"
      />
    </span>
  );
}

/** Hora local de Bogotá en vivo. */
export function Reloj() {
  const hora = useHoraBogota();
  return <span className="reloj">{hora}</span>;
}
