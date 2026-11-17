import { useEffect, useRef, useState } from 'react';
import { useTaller } from '../three/store';
import { useReducedMotion } from '../hooks/useReducedMotion';

// Posición de reposo de la mano en cada sección, en fracción del viewport [x, y].
const paradas = { inicio:[.78,.82], 'sobre-mi':[.18,.64], servicios:[.86,.6], proyectos:[.5,.72], contacto:[.87,.82], footer:[.78,.35] };

// Suavizado independiente de los FPS: misma sensación a 60, 120 o 144 Hz.
const amortiguar = (velocidad, dt) => 1 - Math.exp(-velocidad * dt);
const VELOCIDAD_MAXIMA = 1800; // px por segundo

export default function GuiaManita() {
 const ref = useRef(null);
 const [oculta, setOculta] = useState(false);
 const detalle = useTaller((s) => s.detalleAbierto);
 const reducido = useReducedMotion();

 useEffect(() => {
  if (oculta || detalle) return;
  const el = ref.current;
  let raf = 0, corriendo = false, previo = performance.now();
  let ultimoScroll = scrollY, ultimoTiempo = previo, velocidad = 0, actividad = -1e9;
  let x = innerWidth * .78, y = innerHeight * .82;
  let apartar = 0, apartarObjetivo = 0, ultimaRevision = 0;
  let dedoPrevio = -1, scrolleandoPrevio = null;
  let secciones = [];

  // Las posiciones de las secciones se miden una vez y solo se vuelven a medir si cambia
  // el tamaño de la página (imágenes que cargan, acordeones, filtros, resize).
  const medirSecciones = () => {
   secciones = [...document.querySelectorAll('[data-seccion]')].map((s) => ({ id: s.dataset.seccion, top: s.getBoundingClientRect().top + scrollY }));
  };

  const frame = (ahora) => {
   const dt = Math.min(.05, (ahora - previo) / 1000);
   previo = ahora;
   if (!secciones.length) medirSecciones();
   if (!secciones.length) { corriendo = false; return; }

   // --- lecturas (antes de cualquier escritura, para no forzar layouts) ---
   const punto = scrollY + innerHeight * .45;
   let index = 0;
   for (let i = 0; i < secciones.length; i++) if (secciones[i].top <= punto) index = i;
   const actual = secciones[index], siguiente = secciones[Math.min(index + 1, secciones.length - 1)];
   const aTop = actual.top;
   const bTop = siguiente === actual ? aTop + innerHeight : siguiente.top;
   const progreso = Math.max(0, Math.min(1, (punto - aTop) / Math.max(1, bTop - aTop)));
   const t = Math.max(0, Math.min(1, (progreso - .35) / .65));
   const ease = t * t * (3 - 2 * t);
   const a = paradas[actual.id] || [.5, .7], b = paradas[siguiente.id] || a;
   let tx = (a[0] + (b[0] - a[0]) * ease) * innerWidth;
   let ty = (a[1] + (b[1] - a[1]) * ease) * innerHeight;
   if (actual.id === 'proyectos' && innerWidth >= 834) {
    const filas = document.querySelectorAll('[data-fila-proyecto]:not([hidden])');
    for (const fila of filas) {
     const q = fila.getBoundingClientRect();
     if (q.top < innerHeight * .65 && q.bottom > innerHeight * .35) {
      const zona = fila.querySelector('.zona-avatar')?.getBoundingClientRect();
      if (zona && zona.width) { tx = zona.left + zona.width / 2; ty = innerHeight * .7; }
      break;
     }
    }
   }
   if (innerWidth < 834) { tx = (.18 + (.64 * Math.abs(Math.sin((index + ease) * 1.3)))) * innerWidth; ty = innerHeight * .7; }

   // La mano se aparta si su recorrido cruza un campo o un botón (revisión cada 150 ms).
   if (ahora - ultimaRevision > 150) {
    ultimaRevision = ahora;
    const debajo = document.elementFromPoint(x, y);
    apartarObjetivo = debajo?.closest('input,textarea,button,a') ? 70 : 0;
   }

   // --- cálculo ---
   const activo = ahora - actividad < 220;
   const ritmo = activo ? Math.sin(ahora * .018) * Math.min(1, Math.abs(velocidad)) : 0;
   const salto = reducido ? 0 : Math.sin(t * Math.PI) * 90;
   if (reducido) { x = tx; y = ty; }
   else {
    // Suave al llegar y con velocidad máxima: en los cruces largos se ve viajar, no teletransportarse.
    const k = amortiguar(7, dt);
    let mx = (tx - x) * k, my = (ty - y) * k;
    const paso = Math.hypot(mx, my), maximo = VELOCIDAD_MAXIMA * dt;
    if (paso > maximo) { mx *= maximo / paso; my *= maximo / paso; }
    x += mx; y += my;
   }
   apartar += (apartarObjetivo - apartar) * (reducido ? 1 : amortiguar(10, dt));
   const giro = reducido ? 0 : (b[0] - a[0]) * ease * 28 + ritmo * 12;
   const balanceo = reducido ? 0 : ritmo * 20;
   const escala = activo && !reducido ? 1.08 : 1;

   // --- escrituras ---
   el.style.transform = `translate3d(${(x - 32 + apartar).toFixed(1)}px,${(y - 32 - salto + balanceo).toFixed(1)}px,0) rotate(${giro.toFixed(2)}deg) scale(${escala})`;
   const dedo = activo && !reducido ? Math.round(Math.abs(ritmo) * 12) : 0;
   if (dedo !== dedoPrevio) { el.style.setProperty('--dedo', `${dedo}deg`); dedoPrevio = dedo; }
   const scrolleando = activo && !reducido;
   if (scrolleando !== scrolleandoPrevio) { el.classList.toggle('esta-scrolleando', scrolleando); scrolleandoPrevio = scrolleando; }

   // Si ya llegó y no hay scroll, el bucle se duerme hasta el próximo scroll o resize.
   const quieta = !activo && Math.abs(tx - x) < .3 && Math.abs(ty - y) < .3 && Math.abs(apartarObjetivo - apartar) < .3;
   if (quieta) { corriendo = false; return; }
   raf = requestAnimationFrame(frame);
  };

  const despertar = () => {
   if (corriendo) return;
   corriendo = true;
   previo = performance.now();
   raf = requestAnimationFrame(frame);
  };
  const alScroll = () => {
   const ahora = performance.now();
   velocidad = Math.max(-2, Math.min(2, (scrollY - ultimoScroll) / Math.max(16, ahora - ultimoTiempo)));
   ultimoScroll = scrollY; ultimoTiempo = ahora; actividad = ahora;
   despertar();
  };
  const alCambiarTamano = () => { medirSecciones(); ultimaRevision = 0; despertar(); };

  medirSecciones();
  const observador = new ResizeObserver(alCambiarTamano);
  observador.observe(document.body);
  window.addEventListener('scroll', alScroll, { passive: true });
  window.addEventListener('resize', alCambiarTamano);
  despertar();
  return () => {
   cancelAnimationFrame(raf);
   observador.disconnect();
   window.removeEventListener('scroll', alScroll);
   window.removeEventListener('resize', alCambiarTamano);
  };
 }, [oculta, detalle, reducido]);

 return <>
 {!oculta && !detalle && <div ref={ref} className="mano-viajera" aria-hidden="true">
  <svg viewBox="0 0 72 88" fill="none"><g stroke="var(--text)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path fill="var(--bg)" d="M23 75 12 53c-4-8 4-13 9-6l5 7V15c0-9 12-9 12 0v27c0-9 12-9 12-1v5c2-7 11-5 11 2v5c4-4 10-1 9 6l-6 20c-1 4-5 6-9 6H34c-5 0-8-4-11-10Z"/><path className="mano-dedo" d="M26 40V15c0-9 12-9 12 0v27"/><path d="M38 43v16m12-13v15m11-8v11M28 73c8-3 16-3 24 0"/><path stroke="var(--accent)" strokeWidth="4" d="M32 83h24"/></g></svg>
  <span className="mano-gesto" />
 </div>}
 <button className="guia-control" onClick={() => setOculta(!oculta)}>{oculta ? 'Mostrar mano' : 'Ocultar mano'}</button>
 </>;
}
