import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let instancia = null;

/** Detiene o reanuda el scroll suave (p. ej. con el detalle de proyecto abierto). */
export function pausarLenis(pausa) {
  if (!instancia) return;
  if (pausa) instancia.stop();
  else instancia.start();
}

/** Scroll suave solo en desktop (lerp 0.1), sincronizado con ScrollTrigger (§9). */
export function useLenis(activo) {
  useEffect(() => {
    if (!activo) return undefined;
    const lenis = new Lenis({ lerp: 0.1, anchors: true });
    instancia = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tic = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tic);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tic);
      lenis.destroy();
      instancia = null;
    };
  }, [activo]);
}
