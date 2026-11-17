import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Titular from './Titular';
import { Confirmar, Pantalla, Tags } from './Basicos';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * Fila de proyecto (§7.4): texto (4 col) · aire para el avatar (2 col) · pantalla montada (6 col).
 * La pantalla entra en perspectiva y se endereza con el scroll (scrub); en hover hace tilt.
 */
export default function FilaProyecto({ proyecto, lado, oculto, onAbrir, onCursor }) {
  const fila = useRef(null);
  const reducido = useReducedMotion();
  const principal = proyecto.capturas[proyecto.principal];
  const secundarias = proyecto.capturas.filter((_, k) => k !== proyecto.principal);

  useGSAP(() => {
    if (reducido) return undefined;
    const montaje = fila.current.querySelector('.montaje');
    const escena = montaje.querySelector('.escena');
    const tilt = montaje.querySelector('.inclinacion');
    const signo = lado === 'izq' ? -1 : 1;
    const mm = gsap.matchMedia();

    mm.add({ movil: '(max-width: 1023px)', escritorio: '(min-width: 1024px)' }, (ctx) => {
      const { movil } = ctx.conditions;
      gsap.fromTo(
        escena,
        { rotateY: signo * (movil ? 8 : 18), rotateX: movil ? 3 : 6, z: movil ? -40 : -120, scale: 0.94 },
        {
          rotateY: 0, rotateX: 0, z: 0, scale: 1, ease: 'none',
          scrollTrigger: { trigger: montaje, start: 'center 105%', end: 'center 52%', scrub: true },
        },
      );
      // Capturas secundarias: parallax más lento, escalonadas en profundidad
      montaje.querySelectorAll('.sec').forEach((sec, i) => {
        gsap.fromTo(sec, { y: 36 + i * 28 }, {
          y: -(24 + i * 20), ease: 'none',
          scrollTrigger: { trigger: montaje, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });
    });

    // Tilt siguiendo el mouse (máx ±6°)
    const rx = gsap.quickTo(tilt, 'rotateX', { duration: 0.4, ease: 'power3.out' });
    const ry = gsap.quickTo(tilt, 'rotateY', { duration: 0.4, ease: 'power3.out' });
    const mover = (e) => {
      if (e.pointerType !== 'mouse') return;
      const r = montaje.getBoundingClientRect();
      ry((((e.clientX - r.left) / r.width) * 2 - 1) * 6);
      rx(-(((e.clientY - r.top) / r.height) * 2 - 1) * 6);
    };
    const salir = () => { rx(0); ry(0); };
    montaje.addEventListener('pointermove', mover);
    montaje.addEventListener('pointerleave', salir);
    return () => {
      mm.revert();
      montaje.removeEventListener('pointermove', mover);
      montaje.removeEventListener('pointerleave', salir);
    };
  }, { dependencies: [reducido, lado], revertOnUpdate: true });

  return (
    <article
      className="proyecto grid12"
      ref={fila}
      data-id={proyecto.id}
      data-lado={lado}
      data-fila-proyecto
      hidden={oculto}
      aria-labelledby={`pr-${proyecto.id}`}
    >
      <div className="proyecto-texto">
        <p className="meta label aparecer">
          <span>{proyecto.n}</span>
          {proyecto.anio && <><span aria-hidden="true">·</span><span>{proyecto.anio}</span></>}
        </p>
        <Titular
          as="h3"
          className="h2 titulo-negocio"
          id={`pr-${proyecto.id}`}
          lineas={[<>{proyecto.titular[0]} <em>{proyecto.titular[1]}</em></>]}
        />
        <p className="h3 producto aparecer">{proyecto.nombre}</p>
        <p className="body contexto aparecer">{proyecto.contexto}</p>
        <Tags items={proyecto.stack} className="aparecer" aria-label="Tecnologías" />
        <p className="estado label aparecer">
          <span className="k">Estado</span>
          <span className={proyecto.estadoOk ? 'ok' : ''}>{proyecto.estado}</span>
        </p>
        <button className="link ver-caso aparecer" type="button" data-ver-caso onClick={() => onAbrir(proyecto.id)}>
          Ver caso →
        </button>
      </div>

      <div className="zona-avatar" data-zona="proyecto" aria-hidden="true" />

      <div className="proyecto-media">
        <button
          className="montaje"
          type="button"
          aria-label={`Ver caso: ${proyecto.nombre}`}
          onClick={() => onAbrir(proyecto.id)}
          onPointerEnter={(e) => e.pointerType === 'mouse' && onCursor(true)}
          onPointerLeave={() => onCursor(false)}
        >
          <span className="escena">
            <span className="inclinacion">
              {secundarias[1] && <Pantalla captura={secundarias[1]} className="sec sec-2" decorativa aria-hidden="true" />}
              {secundarias[0] && <Pantalla captura={secundarias[0]} className="sec sec-1" decorativa aria-hidden="true" />}
              <Pantalla captura={principal} className="principal" data-principal />
            </span>
          </span>
        </button>
      </div>
    </article>
  );
}
