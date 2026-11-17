import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import {
  SiBackblaze, SiExpress, SiJsonwebtokens, SiMysql, SiNextdotjs, SiNodedotjs,
  SiPostgresql, SiPrisma, SiReact, SiTailwindcss,
} from 'react-icons/si';
import { Confirmar, Tags } from './Basicos';
import { proyectos } from '../data/proyectos';
import { pausarLenis } from '../hooks/useLenis';
import { useTaller } from '../three/store';

gsap.registerPlugin(Flip);

const ICONOS = {
  React: SiReact, 'React 19': SiReact, 'Node.js': SiNodedotjs, Express: SiExpress, MySQL: SiMysql,
  Prisma: SiPrisma, Tailwind: SiTailwindcss, 'Tailwind CSS': SiTailwindcss, 'Next.js': SiNextdotjs,
  PostgreSQL: SiPostgresql, JWT: SiJsonwebtokens, 'Backblaze B2': SiBackblaze,
};

const reducido = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const enPantalla = (el) => {
  if (!el) return false;
  const r = el.getBoundingClientRect();
  return r.width > 0 && r.bottom > 0 && r.top < window.innerHeight;
};
const imagenDeFila = (id) => document.querySelector(`[data-fila-proyecto][data-id="${id}"]:not([hidden]) [data-principal] img`);

/**
 * Detalle de proyecto (§7.4): vista a pantalla completa con scroll propio.
 * La captura principal viaja desde la fila hasta la cabecera (FLIP, 700 ms).
 * Atrapa el foco (<dialog> modal), se cierra con Escape y devuelve el foco a la fila.
 */
export default function DetalleProyecto({ idInicial, onCerrado }) {
  const dlg = useRef(null);
  const scroller = useRef(null);
  const imgRef = useRef(null);
  const btnCerrar = useRef(null);
  const tituloRef = useRef(null);
  const animando = useRef(false);
  const [indice, setIndice] = useState(() => proyectos.findIndex((p) => p.id === idInicial));
  const [gal, setGal] = useState(() => proyectos.find((p) => p.id === idInicial).principal);
  const set = useTaller((s) => s.set);
  const p = proyectos[indice];
  const captura = p.capturas[gal];
  const n = p.capturas.length;

  // Apertura
  useLayoutEffect(() => {
    const d = dlg.current;
    d.showModal();
    pausarLenis(true);
    document.documentElement.classList.add('detalle-abierto');
    set({ detalleAbierto: true });
    const origen = imagenDeFila(idInicial);
    const destino = imgRef.current;
    const usarFlip = !reducido() && window.innerWidth >= 834 && enPantalla(origen);
    requestAnimationFrame(() => {
      d.classList.add('is-abierto');
      btnCerrar.current?.focus({ preventScroll: true });
      if (usarFlip) {
        animando.current = true;
        origen.style.opacity = '0';
        gsap.from(destino, {
          ...Flip.fit(destino, origen, { scale: true, getVars: true }),
          duration: 0.7,
          ease: 'cubic-bezier(0.65, 0, 0.35, 1)',
          onComplete: () => {
            origen.style.opacity = '';
            gsap.set(destino, { clearProps: 'transform' });
            d.classList.add('is-contenido');
            animando.current = false;
          },
        });
      } else {
        if (!reducido()) gsap.from(destino.parentElement, { opacity: 0, y: 24, duration: 0.45, ease: 'expo.out', clearProps: 'all' });
        d.classList.add('is-contenido');
      }
    });
    return () => {
      pausarLenis(false);
      document.documentElement.classList.remove('detalle-abierto');
      set({ detalleAbierto: false });
    };
  }, [idInicial, set]);

  const cerrar = useCallback(() => {
    const d = dlg.current;
    if (!d || animando.current) return;
    animando.current = true;
    const actual = proyectos[indice];
    const destino = imagenDeFila(actual.id);
    const desde = imgRef.current;
    const usarFlip = !reducido() && window.innerWidth >= 834 && enPantalla(destino) && gal === actual.principal && enPantalla(desde);
    d.classList.remove('is-contenido');
    const fin = () => {
      if (destino) destino.style.opacity = '';
      if (d.open) d.close();
      animando.current = false;
      onCerrado(actual.id);
    };
    if (usarFlip) {
      destino.style.opacity = '0';
      d.classList.remove('is-abierto');
      gsap.to(desde, {
        ...Flip.fit(desde, destino, { scale: true, getVars: true }),
        duration: 0.7,
        ease: 'cubic-bezier(0.65, 0, 0.35, 1)',
        onComplete: fin,
      });
    } else {
      d.classList.remove('is-abierto');
      window.setTimeout(fin, reducido() ? 150 : 400);
    }
  }, [indice, gal, onCerrado]);

  const irGaleria = useCallback((k) => setGal((k + n) % n), [n]);

  const irProyecto = (delta) => {
    const d = dlg.current;
    d.classList.remove('is-contenido');
    window.setTimeout(() => {
      const sig = (indice + delta + proyectos.length) % proyectos.length;
      setIndice(sig);
      setGal(proyectos[sig].principal);
      scroller.current.scrollTop = 0;
      requestAnimationFrame(() => {
        d.classList.add('is-contenido');
        tituloRef.current?.focus({ preventScroll: true });
      });
    }, reducido() ? 0 : 250);
  };

  // Teclado: ←/→ recorren la galería
  useEffect(() => {
    const d = dlg.current;
    const tecla = (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); irGaleria(gal - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); irGaleria(gal + 1); }
    };
    d.addEventListener('keydown', tecla);
    return () => d.removeEventListener('keydown', tecla);
  }, [gal, irGaleria]);

  const dominio = p.enVivo ? new URL(p.enVivo).hostname.replace('www.', '') : '';

  return (
    <dialog
      className="detalle"
      ref={dlg}
      aria-labelledby="detalle-titulo"
      onCancel={(e) => { e.preventDefault(); cerrar(); }}
    >
      <div className="detalle-fondo" aria-hidden="true" />
      <button className="btn-texto detalle-cerrar" type="button" ref={btnCerrar} onClick={cerrar}>Cerrar</button>
      <div className="detalle-scroll" ref={scroller} data-lenis-prevent>
        <article className="contenedor detalle-cuerpo">
          <header className="det-cab det-in">
            <p className="label muted">{p.n} — Caso</p>
            <h2 className="h1" id="detalle-titulo" tabIndex={-1} ref={tituloRef}>{p.nombre}</h2>
            <p className="lead sub">{p.tipo}. {p.titular[0]} {p.titular[1]}.</p>
            <dl className="det-meta label">
              {p.anio && <div><dt>Año</dt><dd>{p.anio}</dd></div>}
              <div><dt>Estado</dt><dd className={p.estadoOk ? 'ok' : ''}>{p.estado}</dd></div>
              <div><dt>Stack</dt><dd>{p.stack.join(' · ')}</dd></div>
              {p.enVivo && (
                <div><dt>En vivo</dt><dd><a className="link" href={p.enVivo} target="_blank" rel="noopener noreferrer">{dominio} ↗</a></dd></div>
              )}
            </dl>
          </header>

          <section className="det-galeria" aria-label="Galería de capturas">
            <div className="pantalla grande">
              <span className="barra" aria-hidden="true"><i /><i /><i /></span>
              <img ref={imgRef} src={captura.src} width={captura.w} height={captura.h} alt={captura.alt} />
            </div>
            <div className="controles det-in">
              <p className="contador label" aria-live="polite">{gal + 1} / {n}</p>
              <div className="miniaturas" role="group" aria-label="Capturas del proyecto">
                {p.capturas.map((k, i) => (
                  <button key={k.src} type="button" aria-label={`Captura ${i + 1}: ${k.alt}`} aria-current={i === gal ? 'true' : undefined} onClick={() => irGaleria(i)}>
                    <img src={k.src} width={k.w} height={k.h} alt="" loading="lazy" decoding="async" />
                  </button>
                ))}
              </div>
              <div className="flechas">
                <button type="button" aria-label="Captura anterior" onClick={() => irGaleria(gal - 1)}><ArrowLeft size={20} strokeWidth={1.5} aria-hidden="true" /></button>
                <button type="button" aria-label="Captura siguiente" onClick={() => irGaleria(gal + 1)}><ArrowRight size={20} strokeWidth={1.5} aria-hidden="true" /></button>
              </div>
            </div>
          </section>

          <section className="det-psr det-in" aria-label="Para clientes">
            <div><h3 className="h3">El problema</h3><p className="body">{p.problema}</p></div>
            <div><h3 className="h3">La solución</h3><p className="body">{p.solucion}</p></div>
            {(p.resultado || p.enVivo) && <div>
              <h3 className="h3">El resultado</h3>
              <p className="body">
                {p.resultado}
                {p.enVivo && <>{p.resultado ? ' · ' : ''}En vivo: <a className="link" href={p.enVivo} target="_blank" rel="noopener noreferrer">{dominio} ↗</a></>}
              </p>
            </div>}
          </section>

          <section className="det-arq det-in" aria-labelledby="det-arq-t">
            <div className="cab">
              <p className="label muted">Para equipos técnicos</p>
              <h3 className="h3" id="det-arq-t">Arquitectura y <em>decisiones</em></h3>
            </div>
            <ol className="body">{p.arquitectura.map((a) => <li key={a}><span>{a}</span></li>)}</ol>
            <div className="stack-det">
              <p className="label muted">Stack</p>
              <ul className="stack-iconos">
                {p.stack.map((t) => {
                  const Icono = ICONOS[t];
                  return <li key={t}>{Icono && <Icono aria-hidden="true" />}{t}</li>;
                })}
              </ul>
              <Tags items={p.categorias} aria-label="Categorías" />
            </div>
          </section>

          <nav className="det-nav det-in" aria-label="Otros proyectos">
            <button className="link" type="button" onClick={() => irProyecto(-1)}>← Proyecto anterior</button>
            <button className="link" type="button" onClick={() => irProyecto(1)}>Siguiente proyecto →</button>
          </nav>
        </article>
      </div>
    </dialog>
  );
}
