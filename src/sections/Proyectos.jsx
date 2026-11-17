import { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Titular from '../components/Titular';
import FilaProyecto from '../components/FilaProyecto';
import { Etiqueta } from '../components/Basicos';
import { filtros, proyectos } from '../data/proyectos';

import DetalleProyecto from '../components/DetalleProyecto';

/** 7.4 Proyectos — "Pantallas en el espacio". */
export default function Proyectos() {
  const [filtro, setFiltro] = useState('Todos');
  const [abierto, setAbierto] = useState(null);
  const cursor = useRef(null);
  const estadoCursor = useRef({ x: -200, y: -200, tx: -200, ty: -200, visible: false, raf: 0 });

  const visibles = proyectos.filter((p) => filtro === 'Todos' || p.categorias.includes(filtro));

  useEffect(() => {
    // El alto de la página cambia al filtrar: ScrollTrigger recalcula posiciones
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [filtro]);

  // Cursor-etiqueta "Ver": sigue al cursor con inercia (lerp 0.15), solo sobre la captura
  useEffect(() => {
    const c = estadoCursor.current;
    const el = cursor.current;
    const bucle = () => {
      c.x += (c.tx - c.x) * 0.15;
      c.y += (c.ty - c.y) * 0.15;
      el.style.transform = `translate3d(${c.x}px, ${c.y}px, 0)`;
      c.raf = c.visible || Math.abs(c.tx - c.x) > 0.5 ? requestAnimationFrame(bucle) : 0;
    };
    const mover = (e) => {
      c.tx = e.clientX; c.ty = e.clientY;
      if (c.visible && !c.raf) c.raf = requestAnimationFrame(bucle);
    };
    window.addEventListener('pointermove', mover, { passive: true });
    return () => {
      window.removeEventListener('pointermove', mover);
      cancelAnimationFrame(c.raf);
    };
  }, []);

  const alCursor = useCallback((visible) => {
    const c = estadoCursor.current;
    if (visible && !c.visible) { c.x = c.tx; c.y = c.ty; }
    c.visible = visible;
    cursor.current.classList.toggle('is-visible', visible);
  }, []);

  const alCerrar = useCallback((id) => {
    setAbierto(null);
    // Devuelve el foco a la fila de origen; si quedó oculta por un filtro, al filtro activo
    requestAnimationFrame(() => {
      const fila = document.querySelector(`[data-fila-proyecto][data-id="${id}"]:not([hidden]) [data-ver-caso]`);
      (fila || document.querySelector('.filtros [aria-pressed="true"]'))?.focus();
    });
  }, []);

  return (
    <section id="proyectos" className="seccion proyectos" data-seccion="proyectos" aria-labelledby="proyectos-titulo">
      <div className="contenedor">
        <header className="grid12 cabecera">
          <Etiqueta numero="04">Proyectos</Etiqueta>
          <Titular id="proyectos-titulo" lineas={[<>Trabajo <em>real</em>,</>, 'en producción.']} />
          <p className="lead aparecer">Sistemas que hoy usan empresas para operar. El código es privado; el resultado se puede ver.</p>
          <div className="filtros aparecer" role="group" aria-label="Filtrar proyectos">
            {filtros.map((f) => (
              <button key={f} className="link" type="button" aria-pressed={filtro === f} onClick={() => setFiltro(f)}>{f}</button>
            ))}
          </div>
        </header>

        {visibles.length === 0 && (
          <p className="vacio body muted">No hay proyectos en esta categoría todavía. Prueba con «Todos».</p>
        )}

        <div className="lista-proyectos">
          {proyectos.map((p) => {
            const visible = visibles.includes(p);
            const lado = visibles.indexOf(p) % 2 === 0 ? 'der' : 'izq';
            return (
              <FilaProyecto key={p.id} proyecto={p} lado={lado} oculto={!visible} onAbrir={setAbierto} onCursor={alCursor} />
            );
          })}
        </div>
      </div>

      <div className="cursor-etiqueta" ref={cursor} aria-hidden="true">Ver</div>

      {abierto && (
          <DetalleProyecto key={abierto} idInicial={abierto} onCerrado={alCerrar} />
      )}
    </section>
  );
}
