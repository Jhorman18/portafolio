import { useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Boton from '../components/Boton';
import Titular from '../components/Titular';
import { CV, inicio } from '../data/contenido';
import InterfazEnsamble from '../components/InterfazEnsamble';
import FondoPlano from '../components/FondoPlano';
import { useReducedMotion } from '../hooks/useReducedMotion';
import foto from '../assets/FotoPerfil.jpeg';
import { useMediaQuery } from '../hooks/useMediaQuery';

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/** 7.1 Inicio — "El ensamble". Hero fijo: el objeto se despieza con el scroll (scrub). */
export default function Inicio() {
  const pista = useRef(null);
  const texto = useRef(null);
  const escritorio = useMediaQuery('(min-width: 834px)');
  const reducido = useReducedMotion();
  const conScrub = escritorio && !reducido;
  useGSAP(() => {
    if (!conScrub) {

      return;
    }
    const el = texto.current;
    ScrollTrigger.create({
      trigger: pista.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;

        // Un protagonista a la vez: el texto se retira mientras el objeto se despieza
        const t = clamp((p - 0.7) / 0.3);
        el.style.opacity = String(1 - t);
        el.style.transform = `translateY(${-24 * t}px)`;
        el.style.visibility = t >= 1 ? 'hidden' : '';
      },
    });
    return () => {
      el.style.opacity = '';
      el.style.transform = '';
      el.style.visibility = '';
    };
  }, { dependencies: [conScrub], revertOnUpdate: true });

  return (
    <section id="inicio" className="hero" data-seccion="inicio" aria-labelledby="hero-titulo">
      <div className="hero-pista" ref={pista} data-hero-pista>
        <div className="hero-escenario">
          <FondoPlano />
          <div className="vista vista-hero" data-vista="hero" aria-hidden="true">
            <InterfazEnsamble />
          </div>
          <div className="contenedor grid12 hero-grid">
            <div className="hero-texto" ref={texto}>
              <div className="hero-meta label aparecer" data-hero>
                <img className="foto" src={foto} width="40" height="40" alt="Foto de Jhorman Cortes" />
                <span className="quien">{inicio.quien}</span>
                <span className="ok">{inicio.disponible}</span>
              </div>
              <Titular
                as="h1"
                className="display"
                id="hero-titulo"
                data-hero
                lineas={[
                  'Construyo software',
                  <>que <em>se sostiene</em>.</>,
                ]}
              />
              <p className="lead aparecer" data-hero data-retraso="0.2">{inicio.lead}</p>
              <div className="hero-ctas aparecer" data-hero data-retraso="0.28">
                <Boton as="a" href="#proyectos">Ver trabajo</Boton>
                <a className="link" href={CV} download>Descargar CV</a>
              </div>
            </div>
          </div>
          <div className="hero-pie contenedor label">
            <a className="desplazate" href="#sobre-mi">
              <span>Desplázate</span>
              <i aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
