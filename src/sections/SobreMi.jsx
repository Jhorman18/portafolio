import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Titular from '../components/Titular';
import { Confirmar, Etiqueta } from '../components/Basicos';
import { sobreMi } from '../data/contenido';
import { useReducedMotion } from '../hooks/useReducedMotion';
import foto from '../assets/FotoPerfil.jpeg';

/** 7.2 Sobre mí — "Detrás del código". Zona del avatar: columnas 1–4. */
export default function SobreMi() {
  const pasos = useRef(null);
  const reducido = useReducedMotion();

  // El hilo que une los cuatro pasos se dibuja con el scroll (scrub)
  useGSAP(() => {
    if (reducido) return;
    const hilo = pasos.current.querySelector('.hilo');
    const vertical = window.matchMedia('(max-width: 639px)').matches;
    gsap.fromTo(
      hilo,
      vertical ? { scaleY: 0 } : { scaleX: 0 },
      {
        scaleX: 1, scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: pasos.current, start: 'top 85%', end: vertical ? 'bottom 60%' : 'top 45%', scrub: true },
      },
    );
  }, { dependencies: [reducido], revertOnUpdate: true });

  return (
    <section id="sobre-mi" className="seccion sobre-mi" data-seccion="sobre-mi" aria-labelledby="sobre-titulo">
      <div className="contenedor grid12 sobre-grid">
        <div className="zona-avatar" data-zona="sobre-mi" aria-hidden="true" />

        <header className="sobre-cab">
          <Etiqueta numero="02">Sobre mí</Etiqueta>
          <Titular id="sobre-titulo" lineas={[<>Detrás del <em>código</em>.</>]} />
        </header>

        <div className="sobre-bio">
          <p className="lead aparecer">{sobreMi.lead}</p>
          <p className="body aparecer">{sobreMi.body}</p>
          <p className="body aparecer">{sobreMi.personal}</p>
        </div>

        <figure className="sobre-foto aparecer">
          <img src={foto} width="280" height="350" alt="Jhorman Cortes" loading="lazy" decoding="async" data-foto />
        </figure>

        <div className="pasos-bloque">
          <h3 className="label muted aparecer">Cómo trabajo</h3>
          <ol className="pasos" ref={pasos}>
            <li className="hilo" aria-hidden="true" />
            {sobreMi.pasos.map((p) => (
              <li className="paso aparecer" key={p.n}>
                <span className="num label">{p.n}</span>
                <h4 className="h3">{p.titulo}</h4>
                <p>{p.texto}</p>
              </li>
            ))}
          </ol>
        </div>

        <dl className="datos-rapidos aparecer">
          {sobreMi.datos.map((d) => (
            <div key={d.k}>
              <dt className="label">{d.k}</dt>
              <dd>
                {d.v} {d.confirmar && <Confirmar>{d.confirmar}</Confirmar>}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
