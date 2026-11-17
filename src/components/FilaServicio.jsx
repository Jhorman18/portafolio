import { Plus } from 'lucide-react';

/**
 * Fila de servicio (§7.3): lista editorial, no tarjeta. Al abrirse muestra tres
 * capacidades; el avatar camina hasta su altura y sostiene la pieza 3D.
 * En móvil la pieza es una imagen estática dentro de la fila.
 */
export default function FilaServicio({ servicio, indice, abierta, onAlternar }) {
  const idBtn = `svc-btn-${servicio.n}`;
  const idPanel = `svc-${servicio.n}`;
  return (
    <li className="servicio" style={{ '--i': indice }} data-fila-servicio={indice}>
      <h3 className="servicio-cab">
        <button
          className="servicio-btn"
          type="button"
          id={idBtn}
          aria-expanded={abierta}
          aria-controls={idPanel}
          onClick={() => onAlternar(indice)}
        >
          <span className="num label">{servicio.n}</span>
          <span className="tit h3">{servicio.titulo}</span>
          <span className="desc">{servicio.desc}</span>
          <span className="mas"><Plus size={20} strokeWidth={1.5} aria-hidden="true" /></span>
        </button>
      </h3>
      <div
        className={`servicio-panel ${abierta ? 'is-abierto' : ''}`}
        id={idPanel}
        role="region"
        aria-labelledby={idBtn}
        inert={!abierta}
      >
        <div className="interior">
          <div className="contenido">
            <ul className="caps label" aria-label="Capacidades">
              {servicio.caps.map((c) => <li key={c}>{c}</li>)}
            </ul>
            <img
              className="svc-imagen"
              src={`/piezas/${servicio.pieza}.webp`}
              width="224"
              height="224"
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </li>
  );
}
