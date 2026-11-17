/**
 * Botón primario (§6): la única píldora del sistema.
 * Hover: el texto rueda hacia arriba y la flecha avanza 4 px.
 */
export default function Boton({ as: Etiqueta = 'button', children, flecha = true, className = '', cargando = false, exito = false, ...resto }) {
  const clases = ['btn', cargando && 'is-cargando', exito && 'is-exito', className].filter(Boolean).join(' ');
  return (
    <Etiqueta className={clases} {...resto}>
      <span className="roll">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      {flecha && <span className="flecha" aria-hidden="true">→</span>}
      <span className="progreso-btn" aria-hidden="true" />
    </Etiqueta>
  );
}
