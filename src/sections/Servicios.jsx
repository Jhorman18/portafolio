import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Titular from '../components/Titular';
import FilaServicio from '../components/FilaServicio';
import { Confirmar, Etiqueta, Tags } from '../components/Basicos';
import { metricas, servicios, stack } from '../data/contenido';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useTaller } from '../three/store';

/** 7.3 Servicios — "Lo que construyo". Zona del avatar: columnas 10–12. */
export default function Servicios() {
  const [abierta, setAbierta] = useState(null);
  const refMetricas = useRef(null);
  const reducido = useReducedMotion();
  const set = useTaller((s) => s.set);

  // Solo una fila abierta a la vez; el avatar se entera por el store
  const alternar = (i) => {
    const siguiente = abierta === i ? null : i;
    setAbierta(siguiente);
    set({ filaServicio: siguiente });
  };

  // Métricas: conteo 0 → valor en 1,2 s, una sola vez
  useGSAP(() => {
    const nums = refMetricas.current.querySelectorAll('[data-contar]');
    if (reducido) return;
    nums.forEach((el) => {
      const fin = Number(el.dataset.contar);
      const obj = { v: 0 };
      gsap.to(obj, {
        v: fin, duration: 1.2, ease: 'power2.out',
        onStart: () => { el.textContent = '0'; },
        onUpdate: () => { el.textContent = String(Math.round(obj.v)); },
        scrollTrigger: { trigger: refMetricas.current, start: 'top 80%', once: true },
      });
    });
  }, { dependencies: [reducido], revertOnUpdate: true });

  return (
    <section id="servicios" className="seccion servicios" data-seccion="servicios" aria-labelledby="servicios-titulo">
      <div className="contenedor">
        <div className="servicios-cuerpo">
          <div className="zona-avatar" data-zona="servicios" aria-hidden="true" />
          <header className="grid12 cabecera">
            <Etiqueta numero="03">Servicios</Etiqueta>
            <Titular id="servicios-titulo" lineas={[<>Lo que <em>construyo</em>.</>]} />
            <p className="lead aparecer">De la interfaz a la base de datos. Me encargo de todo el sistema, no solo de una parte.</p>
          </header>

          <ol className="lista-servicios" data-lista-servicios>
            {servicios.map((s, i) => (
              <FilaServicio key={s.n} servicio={s} indice={i} abierta={abierta === i} onAlternar={alternar} />
            ))}
          </ol>
        </div>

        <div className="grid12 stack-bloque">
          <h3 className="label muted stack-titulo aparecer">Stack</h3>
          <dl className="stack">
            {stack.map((g) => (
              <div className="aparecer" key={g.cat}>
                <dt className="label">{g.cat}</dt>
                <dd><Tags items={g.tec} /></dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="metricas grid12" ref={refMetricas}>
          {metricas.map((m) => (
            <div className="metrica aparecer" key={m.etiqueta}>
              <span className="num"><span data-contar={m.valor}>{m.valor}</span>{m.sufijo}</span>
              <span className="lbl label">
                {m.etiqueta} {m.confirmar && <Confirmar>{m.confirmar}</Confirmar>}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
